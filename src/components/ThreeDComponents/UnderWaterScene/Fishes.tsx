import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Fishes: React.FC<GroupProps> = ({ ...props }) => {
  const fishesRef = useRef<THREE.Group>(null);
  const { scene: fishes, animations } = useGLTF(
    "/models/underwater/fishes.glb"
  );
  const { actions } = useAnimations(animations, fishesRef);
  const scroll = useScroll();

  const visibilityOffset = 0.3;

  useEffect(() => {
    // Check if animation exists
    if (actions && actions["C4D Animation Take"]) {
      const action = actions["C4D Animation Take"];
      action.reset().play(); // Reset and play the animation
      action.setLoop(THREE.LoopRepeat, THREE.LoopPingPong); // Set loop type (optional)

      return () => {
        // Cleanup: Stop animation when the component unmounts
        fishes.clear();
        action.stop();
      };
    }
  }, []);

  useFrame(() => {
    fishes.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshPhysicalMaterial;
        material.transparent = true;

        const scrollOffset = scroll.offset;

        // If scrollOffset is below 0.65, keep opacity at 0.7
        if (scrollOffset < visibilityOffset) {
          material.opacity = 0.7;
        } else {
          const opacity = Math.max(
            1 - (scrollOffset - visibilityOffset) * 4,
            0
          );
          material.opacity = opacity;
        }
      }
    });
    //console.log(scrollOffset);
  });

  // useFrame((_, delta) => {
  //   if (fishesRef.current) {
  //     const targetX = scrollOffset > 0.85 ? 10 : 3;
  //     easing.damp3(
  //       fishesRef.current.position,
  //       [targetX, fishesRef.current.position.y, fishesRef.current.position.z],
  //       0.3,
  //       delta
  //     );
  //   }
  // });
  return (
    <group
      ref={fishesRef}
      scale={props.scale ? props.scale : 0.015}
      position={props.position ? props.position : [3, -5.5, 1.2]}
      {...props}
    >
      <primitive object={fishes} />
    </group>
  );
};

export default Fishes;
