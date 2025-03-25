import { MeshProps, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, ShaderMaterial } from "three";

// Vertex Shader (basic pass-through)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader (adapted for React Three Fiber)
const fragmentShader = /*glsl*/ `
varying vec2 vUv;

uniform float uTime;

uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;


void main() {
    // Normalize coordinates to [0, 1]
    vec2 uv = vUv;

    // Center the coordinates
    uv -= 0.5;

    // Adjust for aspect ratio
    //uv.x *= uResolution.x / uResolution.y;
    uv.x = uv.x/0.5;

    // Move the waves downward by adjusting uv.y
    uv.y += 0.5; // Adjust this value to move the waves down

    // Calculate the distance from the center
    float dist = length(uv);

    // Define the colors for the circles
    // vec3 color1 = vec3(0.0, 0.39, 0.62); // #01639f  
    // vec3 color2 = vec3(0.34, 0.64, 0.81); // #57a4cf
    // vec3 color3 = vec3(0.68, 0.90, 1.0); // #ade5ff

    // vec3 color1 = vec3(139.0 / 255.0, 0.0, 0.0);       // #8b0000 (Dark Red)
    // vec3 color2 = vec3(220.0 / 255.0, 20.0 / 255.0, 60.0 / 255.0);  // #dc143c (Crimson)
    // vec3 color3 = vec3(255.0 / 255.0, 99.0 / 255.0, 71.0 / 255.0);  // #ff6347 (Tomato)

    // Define the animation parameters
    float time = uTime;
    float speed = 1.0;
    float scale1 = mod(time * speed, 6.0) / 6.0 * 8.0;
    float scale2 = mod((time - 2.0) * speed, 6.0) / 6.0 * 8.0;
    float scale3 = mod((time - 4.0) * speed, 6.0) / 6.0 * 8.0;

    // Calculate the opacity based on the scale
    float opacity1 = 1.0 - smoothstep(0.0, 0.05, abs(dist - scale1 * 0.1)); //0.05 is responsible for thickness of the lines
    float opacity2 = 1.0 - smoothstep(0.0, 0.05, abs(dist - scale2 * 0.1));
    float opacity3 = 1.0 - smoothstep(0.0, 0.05, abs(dist - scale3 * 0.1));

    // Mix the colors based on the opacity
    // vec3 finalColor = mix(vec3(0.0), color1, opacity1);
    // finalColor = mix(finalColor, color2, opacity2);
    // finalColor = mix(finalColor, color3, opacity3);

    vec3 finalColor = color1+opacity1;
    finalColor = finalColor+color2*opacity2;
    finalColor = finalColor+color3*opacity3;

    // Apply the mask gradient
    float mask = smoothstep(0.58, 1.0, uv.y + 0.5);
    finalColor *= mask;

    // Set alpha to 0.0 where there are no circles
    float alpha = max(opacity1, max(opacity2, opacity3)) * mask;

    // Output the final color with transparency
    gl_FragColor = vec4(finalColor, alpha);
}
`;

const ConcentricCirclesPlane: React.FC<
  MeshProps & { underWater?: boolean }
> = ({ underWater, ...props }) => {
  const materialRef = useRef<ShaderMaterial>(null);

  // Update uniforms every frame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value =
        state.clock.getElapsedTime() * 2;
    }
  });

  const uniforms = useMemo(
    () => ({
      color1: {
        value: new Color(underWater ? "#01639f" : "#8b0000"),
      },
      color2: {
        value: new Color(underWater ? "#57a4cf" : "#dc143c"),
      },
      color3: {
        value: new Color(underWater ? "#ade5ff" : "#ff6347"),
      },
      uTime: { value: 0 },
    }),
    []
  );

  return (
    <mesh scale={props.scale ? props.scale : 0.5} {...props}>
      <planeGeometry args={[3.5, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
};

export default ConcentricCirclesPlane;
