varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uOpacity; // Controls fade and blur
uniform float uStarFade;
uniform vec2 uResolution;
const float maxBlur = 150.0; // Maximum blur intensity
uniform float uTime;

//Star Data
#define iterations 17
#define formuparam 0.53

#define volsteps 20
#define stepsize 0.1

#define zoom   0.35 //default 0.800
#define tile   0.850
#define speed  0.010 

#define brightness 0.0009 //default 0.0015
#define darkmatter 0.300 //default 0.300
#define distfading 0.930 //default 0.730
#define saturation 0.550 //default 0.850

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
    vec4 textureColor = texture2D(uTexture, vUv);

    // Compute the screen center dynamically
    vec2 center = uResolution * 0.5;
    
    // Compute distance from the center
    float dist = distance(vUv * uResolution, center);

    //Here we are blurring and adding a slight light effect as well
    float baseBlur = smoothstep(maxBlur, 0.0, dist * uOpacity);
    float blurFactor = abs(baseBlur) * (1.0 - uOpacity) + baseBlur * (0.5 - uOpacity);

    // Ensure blur starts from no blur and grows outward
    float finalAlpha = mix(1.0, 0.0, blurFactor) * uOpacity;
    
    vec4 finalColor = vec4(mix(textureColor.rgb, vec3(0.15), blurFactor),textureColor.a);
	//vec4 finalColor = textureColor;
    //finalColor.a = finalAlpha; // Ensure proper alpha blending



    //****************************************Adding Animated Stars
    vec2 uv = vUv;
	uv.y*=uResolution.y/uResolution.x;
	vec3 dir=vec3(uv*zoom,1.);
	float time=uTime*speed+.25;

	vec3 from=vec3(1.,.5,0.5);
	from+=vec3(time*0.35,time*0.35,-1.0);
	
	//volumetric rendering
	float s=0.1,fade=uStarFade;
	vec3 v=vec3(0.);
	for (int r=0; r<volsteps; r++) {
		vec3 p=from+s*dir*.5; //default 0.5
		p = abs(vec3(tile)-mod(p,vec3(tile*0.5))); // tiling fold default 2.0
		float pa,a=pa=0.;
		for (int i=0; i<iterations; i++) { 
			p=abs(p)/dot(p,p)-formuparam; // the magic formula
			a+=abs(length(p)-pa); // absolute sum of average change
			pa=length(p);
		}
		float dm=max(0.,darkmatter-a*a*.001); //dark matter
		a*=a*a; // add contrast
		if (r>6) fade*=1.-dm; // dark matter, don't render near
		//v+=vec3(dm,dm*.5,0.);
		v+=fade;
		v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
		fade*=distfading; // distance fading
		s+=stepsize;
	}
	v=mix(vec3(length(v)),v,saturation); //color adjust
    
	//vec4 finalStarColor = vec4(v*.001,uOpacity);
	vec4 finalStarColor = vec4(v*.0005,uOpacity);	
	


    // gl_FragColor = finalColor + (finalStarColor*vec4(0.137, 0.211, 0.341,1.0));
	gl_FragColor = finalColor +vec4(0.0,0.0,0.0,1.0);
	//gl_FragColor = finalColor;
}


