varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uOpacity; // Controls fade and blur
uniform float uStarFade;


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


void main()
{
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
	gl_FragColor = vec4(v*.0005 * vec3(0.137, 0.211, 0.341),uOpacity);	
	
}

// varying vec2 vUv;

// uniform vec2 uResolution;
// uniform float uTime;

// //Star Data
// #define iterations 17
// #define formuparam 0.53

// #define volsteps 20
// #define stepsize 0.1

// #define zoom   0.800
// #define tile   0.850
// #define speed  0.010 

// #define brightness 0.0015 //default 0.0015
// #define darkmatter 0.300
// #define distfading 0.730
// #define saturation 0.850 //default 0.850


// void main()
// {
//     vec2 uv = vUv;
// 	uv.y*=uResolution.y/uResolution.x;
// 	vec3 dir=vec3(uv*zoom,1.);
// 	float time=uTime*speed+.25;

// 	vec3 from=vec3(1.,.5,0.5);
// 	from+=vec3(time*0.35,time*0.35,-1.0);
	
// 	//volumetric rendering
// 	float s=0.1,fade=1.2;
// 	vec3 v=vec3(0.);
// 	for (int r=0; r<volsteps; r++) {
// 		vec3 p=from+s*dir*.5;
// 		p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
// 		float pa,a=pa=0.;
// 		for (int i=0; i<iterations; i++) { 
// 			p=abs(p)/dot(p,p)-formuparam; // the magic formula
// 			a+=abs(length(p)-pa); // absolute sum of average change
// 			pa=length(p);
// 		}
// 		float dm=max(0.,darkmatter-a*a*.001); //dark matter
// 		a*=a*a; // add contrast
// 		if (r>6) fade*=1.-dm; // dark matter, don't render near
// 		//v+=vec3(dm,dm*.5,0.);
// 		v+=fade;
// 		v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
// 		fade*=distfading; // distance fading
// 		s+=stepsize;
// 	}
// 	v=mix(vec3(length(v)),v,saturation); //color adjust
    
// 	gl_FragColor = vec4(v*.005,1.)  ;	
	
// }