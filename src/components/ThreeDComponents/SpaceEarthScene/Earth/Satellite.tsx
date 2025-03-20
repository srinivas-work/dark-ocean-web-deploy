import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { forwardRef, useEffect } from "react";
import * as THREE from "three";

useGLTF.preload("/models/space/space_satellite.glb");

const Satellite = forwardRef<THREE.Mesh, MeshProps>((props, ref) => {
  const { scene: satellite } = useGLTF("/models/space/space_satellite.glb");

  useEffect(() => {
    satellite.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshPhysicalMaterial;

        if (material) {
          material.metalness = 0.4; // Increase to make it more reflective
          material.roughness = 0.5; // Lower values make specular highlights sharper
          material.reflectivity = 10; // High reflectivity for strong highlights
          material.clearcoat = 1; // Adds a glossy layer for stronger highlights
          material.clearcoatRoughness = 0.1; // Controls clearcoat smoothness

          material.needsUpdate = true; // Ensure material updates
        }
      }
    });
  }, []);

  return (
    <mesh ref={ref} {...props}>
      <ambientLight intensity={4.2} />
      <hemisphereLight args={[0xffffff, 0x1f3c76, 7.0]} />
      {/* <directionalLight position={[-30, 35, -20]} intensity={3.5} /> */}
      <primitive object={satellite} />
    </mesh>
  );
});

export default Satellite;
