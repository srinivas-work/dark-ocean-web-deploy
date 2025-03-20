    #define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>



//...................................Caustics
#define TAU 6.28318530718
#define MAX_ITER 5

uniform float uTime;
uniform vec2 uResolution;
uniform float uMixIntensity;

varying vec2 vUv;

vec3 caustic(vec2 uv) {
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    float time = uTime * 0.5 + 23.0;
    
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.005;
    
    for (int n = 0; n < MAX_ITER; n++) {
        float t = time * (1.0 - (3.5 / float(n+1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, 1.4);
    vec3 color = vec3(pow(abs(c), 8.0));
    color = clamp(color + vec3(0.0, 0.35, 0.5), 0.0, 1.0); //default vec3(0.0, 0.35, 0.5)
    color = mix(color, vec3(0.0, 0.0,0.0), 0.3); //default vec3(1.0,1.0,1.0)
    
    return color + vec3(0.0, 0.08627, 0.30588);
}

float causticX(float x, float power, float gtime) {
    float p = mod(x * TAU, TAU) - 250.0;
    float time = gtime * 0.5 + 23.0;
    float i = p;
    float c = 1.0;
    float inten = 0.005;
    
    for (int n = 0; n < MAX_ITER / 2; n++) {
        float t = time * (1.0 - (3.5 / float(n+1)));
        i = p + cos(t - i) + sin(t + i);
        c += 1.0 / length(p / (sin(i + t) / inten));
    }
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, power);
    
    return c;
}

float GodRays(vec2 uv) {
    float light = 0.0;
    
    light += pow(causticX((uv.x + 0.08 * uv.y) / 1.7 + 0.5, 1.8, uTime * 0.65), 10.0) * 0.05;
    light -= pow((1.0 - uv.y) * 0.3, 2.0) * 0.2;
    light += pow(causticX(sin(uv.x), 0.3, uTime * 0.7), 9.0) * 0.4;
    light += pow(causticX(cos(uv.x * 2.3), 0.3, uTime * 1.3), 4.0) * 0.1;
    
    light -= pow((1.0 - uv.y) * 0.3, 3.0);
    light = clamp(light, 0.0, 1.0);
    
    return light;
}

vec3 overlay(vec3 A, vec3 B) {
    return mix(
        2.0 * A * B,
        1.0 - 2.0 * (1.0 - A) * (1.0 - B),
        step(0.5, B) // Step determines which formula to use
    );
}

vec3 softLight(vec3 A, vec3 B) {
    return mix(
        2.0 * A * B + A * A * (1.0 - 2.0 * B),
        2.0 * A * (1.0 - B) + sqrt(A) * (2.0 * B - 1.0),
        step(0.5, B) // Step determines which formula to use
    );
}

vec3 screenEffect(vec3 color1, vec3 color2, float blendFactor)
{
    // Linearly interpolate between the two colors based on the blend factor
    return mix(color1, color2, blendFactor);
}

void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>


    // //Adding caustics
     vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    // Calculate caustics
    vec3 causticColor = caustic(uv * 2.0 - 1.0);
    
    // Calculate god rays
    float godRays = GodRays(uv * 2.0 - 1.0);
    
    // Combine caustics and god rays
    vec3 causticsGodRaysColor = causticColor + godRays;

	vec4 finalCausticsColor = vec4(causticsGodRaysColor,0.3);

	  // Animate the UV coordinates
  	// vec2 uv = vUv * 2.0; // Scale the texture
  	// uv.x += sin(uTime) * 0.1; // Animate horizontally
  	// uv.y += cos(uTime) * 0.1; // Animate vertically

  	// // Sample the caustic texture
  	// vec3 causticColor = texture2D(uCausticTexture, uv).rgb;

  	// // Add some brightness and contrast
  	// causticColor = causticColor * 2.0; // Brighten the effect
    
    
    //gl_FragColor = vec4(mix(outgoingLight,finalCausticsColor,uMixIntensity),1.0);
	//gl_FragColor = vec4(screenEffect(outgoingLight,causticColor,0.2),1.0);
	gl_FragColor = vec4(screenEffect(outgoingLight, causticsGodRaysColor,uMixIntensity),1.0);
	//gl_FragColor = vec4(outgoingLight,1.0);

}