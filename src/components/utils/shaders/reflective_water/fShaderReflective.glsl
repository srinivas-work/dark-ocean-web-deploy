uniform sampler2D mirrorSampler;
uniform float alpha;
uniform float time;
uniform float size;
uniform float distortionScale;
uniform sampler2D normalSampler;
uniform vec3 sunColor;
uniform vec3 sunDirection;
uniform vec3 eye;
uniform vec3 waterColor;
uniform float underwaterBlueIntensity;

varying vec4 mirrorCoord;
varying vec4 worldPosition;

varying vec2 vUv;


//Update

varying float vElevation;
const vec3 uDepthColor = vec3(0.7,0.7,0.7);
const vec3 uSurfaceColor = vec3(0.9,0.9,0.9);
const float uColorOffset = 0.08;
const float uColorMultiplier = 5.0;


vec4 getNoise( vec2 uv ) {

float amplifiedTime = time * 3.0;

vec2 uv0 = ( uv / 103.0 ) + vec2(amplifiedTime / 17.0, amplifiedTime / 29.0);
vec2 uv1 = uv / 107.0-vec2( amplifiedTime / -19.0, amplifiedTime / 31.0 );
vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( amplifiedTime / 101.0, amplifiedTime / 97.0 );
vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( amplifiedTime / 109.0, amplifiedTime / -113.0 );
vec4 noise = texture2D( normalSampler, uv0 ) +
texture2D( normalSampler, uv1 ) +
texture2D( normalSampler, uv2 ) +
texture2D( normalSampler, uv3 );
return noise * 0.5 - 1.0;
}

void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
    vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
    float direction = max( 0.0, dot( eyeDirection, reflection ) );
    specularColor += pow( direction, shiny ) * sunColor * spec;
    diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
}

#include <common>
#include <packing>
#include <bsdfs>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>


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

void main() {

#include <logdepthbuf_fragment>
vec4 noise = getNoise( worldPosition.xz * size );
vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

vec3 diffuseLight = vec3(0.0);
vec3 specularLight = vec3(-0.3);

vec3 worldToEye = eye-worldPosition.xyz;
vec3 eyeDirection = normalize( worldToEye );
sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

float distance = length(worldToEye);

vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
float rf0 = 0.3;
float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
vec3 outgoingLight = albedo;

//Adding color depth to the water
float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

//outgoingLight *=vElevation * 2.0 + 0.8;

outgoingLight *=color;

vec4 textureColor = texture2D(normalSampler, vUv);

//outgoingLight *= textureColor.rgb;

vec4 skyBlue = vec4(vec3(0.5098, 0.6941, 0.8706),1.0);
vec4 sunsetYellow = vec4(vec3(0.9020, 0.7843, 0.6118),1.0);
vec4 underwaterBlue = vec4(vec3(0.0, 0.086, 0.306),1.0);

vec4 finalColor = vec4( outgoingLight, alpha ) * skyBlue * sunsetYellow ;
gl_FragColor = mix(finalColor, underwaterBlue, underwaterBlueIntensity);

#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>	
}