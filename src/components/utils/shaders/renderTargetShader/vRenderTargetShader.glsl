varying vec2 vUv;

uniform float uOpacity; // Uniform to control the transition

void main() {
    // Interpolate the z-position between its original value and 0.5 based on uOpacity
    float zPosition = mix(0.0, position.z, uOpacity);

    // Calculate the final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, zPosition, 1.0);

    // Pass the UV coordinates to the fragment shader
    vUv = uv;
}