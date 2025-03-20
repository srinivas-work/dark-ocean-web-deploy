import { Clone, useAnimations, useGLTF } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Birds: React.FC<MeshProps & { position: THREE.Vector3 }> = ({
  position,
  ...props
}) => {
  const cloneRef = useRef<any>(null);
  const { scene, animations } = useGLTF("/models/birds.glb");
  const { actions } = useAnimations(animations, cloneRef);

  //   useGSAP(() => {
  //     if (meshRef.current) {
  //       gsap.to(meshRef.current?.position, {
  //         y: meshRef.current?.position.y + 0.5,
  //         duration: 1.5,
  //         repeat: -1,
  //         yoyo: true,
  //       });
  //     }
  //   });

  useEffect(() => {
    // Check if animation exists
    if (actions && actions["Scene"]) {
      const action = actions["Scene"];
      action.reset().play(); // Reset and play the animation
      action.setLoop(THREE.LoopRepeat, THREE.LoopPingPong); // Set loop type (optional)

      return () => {
        // Cleanup: Stop animation when the component unmounts
        scene.clear();
        action.stop();
      };
    }
  }, []);

  //A helper function to reset all positions
  function resetPosition(x: boolean, y: boolean, z: boolean) {
    if (cloneRef.current) {
      if (x) {
        cloneRef.current.position.x = position.x;
      }
      if (y) {
        cloneRef.current.position.y = position.y;
      }
      if (z) {
        cloneRef.current.position.z = position.z;
      }
    }
  }

  useFrame(() => {
    if (cloneRef.current) {
      if (Math.abs(position.x) === 20) {
        const xDisplacement = position.x < 0 ? 0.05 : -0.05;
        cloneRef.current.position.x += xDisplacement;
        cloneRef.current.position.z -= 0.01;

        // Resetting position if they go out of bounds
        if (Math.abs(cloneRef.current.position.x) > 50) {
          resetPosition(true, false, true);
        }
      } else if (position.y === 8 || position.y === 0) {
        cloneRef.current.position.z -= 0.05;

        // Resetting position if they go out of bounds
        if (cloneRef.current.position.z < -60) {
          resetPosition(false, false, true);
        }
      } else {
        cloneRef.current.position.x += 0.05;
        cloneRef.current.position.y -= 0.01;
        cloneRef.current.position.z -= 0.05;

        if (cloneRef.current.position.z < -60) {
          resetPosition(true, true, true);
        }
      }
    }
  });

  return (
    <Clone
      object={scene}
      //@ts-ignore
      ref={cloneRef}
      {...props}
      position={position}
    />
    // <mesh ref={meshRef} {...props} rotation={[0, -Math.PI / 4, 0]}>
    //   <primitive object={scene} />
    // </mesh>
  );
};

export default Birds;
