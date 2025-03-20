import { useKTX2, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import fShaderBg from "../../utils/shaders/background/fShaderBg.glsl";
import vShaderBg from "../../utils/shaders/background/vShaderBg.glsl";

const OceanBackground = () => {
  const oceanBackgroundRef = useRef<Mesh>(null);

  //const skyTexture = useTexture("/textures/ocean/sunset_sky.jpg");

  const skyTexture = useKTX2("/textures/ocean/sunset_sky.ktx2");
  const scroll = useScroll();

  // skyTexture.generateMipmaps = true;
  // skyTexture.minFilter = LinearMipmapLinearFilter;

  const bgShaderUniforms = useMemo(
    () => ({
      uTexture: { value: skyTexture },
    }),
    []
  );

  useFrame(() => {
    const scrollOffset = scroll.offset;

    if (oceanBackgroundRef.current) {
      const speedFactor = scrollOffset > 0.33 ? 12 : 1;

      oceanBackgroundRef.current.position.y =
        5.4 + scrollOffset * (5.85 - 5.4) * speedFactor;
    }
  });

  return (
    <mesh
      ref={oceanBackgroundRef}
      position={[0, 5.4, -12.8]}
      scale={[3.5, 0.885, 1.77]}
      //rotation={[0, 0, Math.PI]}
    >
      <planeGeometry args={[20, 20, 1, 1]} />
      <shaderMaterial
        vertexShader={vShaderBg}
        fragmentShader={fShaderBg}
        uniforms={bgShaderUniforms}
        transparent
      />
      {/* <meshBasicMaterial map={skyTexture} /> */}
    </mesh>
  );
};

export default OceanBackground;
