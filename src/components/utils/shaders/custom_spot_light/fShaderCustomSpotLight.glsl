uniform vec2 uResolution;
uniform float uFallDistance;
uniform float uOpacity;
float sqr(float x) { return x*x; }

void main()
{
    vec2 uv = gl_FragCoord.xy/uResolution.yy;
    // cool night, warm day
    gl_FragColor = vec4(.8, .75, .70, uOpacity);
    
    // put the streetlight just out of view
    vec2 lightPos = vec2(1.0, 1.1);
    float falloff = smoothstep(uFallDistance, .0, sqr(distance(uv, lightPos)));
    float focus = pow(dot(normalize(uv - lightPos), vec2(0,-1)),3.); //default 9.
    float light = mix(0.02, 1., focus * falloff);
    gl_FragColor *= light;
}