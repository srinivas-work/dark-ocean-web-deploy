import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import fShaderCustomSpotLight from "../../utils/shaders/custom_spot_light/fShaderCustomSpotLight.glsl";
import vShaderCustomSpotLight from "../../utils/shaders/custom_spot_light/vShaderCustomSpotLight.glsl";

const UnderwaterSpotLight = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightShaderRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const scroll = useScroll();
  const uniforms = useMemo(
    () => ({
      uOpacity: { value: 0 },
      uFallDistance: {
        value: 0.3,
      },
      uResolution: {
        value: new THREE.Vector3(window.innerWidth, window.innerHeight),
      },
    }),
    []
  );

  const minOffset = 0.29; // Start of the scroll range
  const maxOffset = 0.6; // End of the scroll range
  const maxOpacity = 0.3; // Maximum opacity value

  useFrame(() => {
    if (!lightShaderRef.current) return;

    const scrollOffset = scroll.offset;

    // Map range [minOffset, maxOffset] to [0, 2.3] for fall distance
    let fallDistance = 0;
    if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
      fallDistance =
        ((scrollOffset - minOffset) / (maxOffset - minOffset)) * 2.3;
    }

    // Smoothly animate opacity based on the same condition
    let opacity = 0;
    if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
      // Map opacity to [0, maxOpacity] within the range
      opacity =
        ((scrollOffset - minOffset) / (maxOffset - minOffset)) * maxOpacity;
    } else if (scrollOffset < minOffset) {
      // Smoothly transition to 0 when below minOffset
      opacity = Math.max(0, (scrollOffset / minOffset) * maxOpacity);
    } else if (scrollOffset > maxOffset) {
      // Smoothly transition to 0 when above maxOffset
      opacity = Math.max(
        0,
        (1 - (scrollOffset - maxOffset) / (1 - maxOffset)) * maxOpacity
      );
    }

    // Update uniforms
    lightShaderRef.current.uniforms.uFallDistance.value = fallDistance;
    lightShaderRef.current.uniforms.uOpacity.value = opacity;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width * 20, viewport.height * 20]} />
      <shaderMaterial
        ref={lightShaderRef}
        uniforms={uniforms}
        vertexShader={vShaderCustomSpotLight}
        fragmentShader={fShaderCustomSpotLight}
        transparent
      />
    </mesh>
  );
};

export default UnderwaterSpotLight;
