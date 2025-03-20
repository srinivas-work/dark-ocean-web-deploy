import { useScroll, useTexture } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, ShaderMaterial } from "three";

const vertexShader = `
varying vec2 vUv;

void main(){
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uLightOpacity;
  uniform sampler2D uLightTexture;
  uniform vec3 uLightColor;

  void main() {
    float mask = texture2D(uLightTexture,vUv).b;
    float alpha = texture2D(uLightTexture,vUv).a;
    
    gl_FragColor = vec4(uLightColor+mask,alpha*uLightOpacity);
  }
`;

const CustomSpotLight: React.FC<
  MeshProps & { lightColor?: string; lightOpacity?: number }
> = ({ lightOpacity = 0.85, lightColor = "white", ...props }) => {
  const lightTexture = useTexture("/img/spotLightRed.png");
  const spotlightShaderRef = useRef<ShaderMaterial>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (spotlightShaderRef.current) {
      const scrollOffset = scroll.offset;

      const targetPoint = scrollOffset >= 0.1;

      // const targetOpacity = targetPoint ? 0.8 : 0.01;

      //......
      // spotlightShaderRef.current.uniforms.uLightOpacity.value = lerp(
      //   spotlightShaderRef.current.uniforms.uLightOpacity.value,
      //   targetOpacity,
      //   0.1 // Adjust smoothing factor (closer to 1 = faster)
      // );
      // const currentOpacity =
      //   spotlightShaderRef.current.uniforms.uLightOpacity.value;

      // // Smooth transition
      // spotlightShaderRef.current.uniforms.uLightOpacity.value = MathUtils.lerp(
      //   currentOpacity,
      //   targetOpacity,
      //   0.1 // Adjust this value for faster/slower interpolation
      // );
      //.....

      spotlightShaderRef.current.visible = targetPoint;
    }
  });

  return (
    <mesh position={props.position ? [0, 0, 0] : props.position} {...props}>
      <planeGeometry args={[3, 3]} />
      {/* <coneGeometry args={[1.5, 3, 32, 16, true]} /> */}
      <shaderMaterial
        ref={spotlightShaderRef}
        uniforms={{
          uLightTexture: { value: lightTexture },
          uLightOpacity: { value: lightOpacity },
          uLightColor: { value: new Color(lightColor) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={2}
      />
      {/* <meshBasicMaterial color={"white"} /> */}
    </mesh>
  );
};

export default CustomSpotLight;
