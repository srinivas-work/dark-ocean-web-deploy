varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
    vec2 flippedUv = vec2(vUv.x, 1.0 - vUv.y);
    vec4 texel = texture2D(uTexture,flippedUv);

    texel.rgb = pow(texel.rgb, vec3(0.5)); //Fixing the color conversion

    // Output final color
    gl_FragColor = texel;
}