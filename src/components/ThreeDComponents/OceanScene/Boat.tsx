import { useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import ConcentricCirclesPlane from "../../UI/ConcentricCirclesPlane/ConcentricCirclesPlane";
import useIsPhoneScreen from "../../utils/hooks/useIsPhoneScreen";

//useGLTF.preload("/models/ocean/boat_dark_ocean.glb");

const Boat: React.FC<GroupProps> = ({ ...props }) => {
  const { scene: boat } = useGLTF("/models/ocean/boat_dark_ocean.glb");
  const boatRef = useRef<THREE.Group>(null);
  const isPhoneScreen = useIsPhoneScreen();

  useFrame((state) => {
    if (boatRef.current) {
      const time = state.clock.getElapsedTime(); // Time passed

      //Apply slight rotation to simulate rocking motion
      boatRef.current.rotation.x = -Math.sin(time) * 0.07; // Rocking on X-axis
      boatRef.current.rotation.y = Math.sin(time) * 0.01; // Rocking on X-axis
      boatRef.current.rotation.z = Math.cos(time) * 0.025; // Rocking on Z-axis
    }
  });

  return (
    <group
      ref={boatRef}
      position={isPhoneScreen ? [-0.22, -0.3, -1.5] : [0, 0, 0]}
    >
      <ConcentricCirclesPlane position={[1.14, 0.24, 1]} scale={0.15} />
      <ConcentricCirclesPlane
        underWater
        position={[0.3, -2.5, 0]}
        scale={1.5}
        rotation={[0, 0, Math.PI]}
      />
      <group
        scale={props.scale ? props.scale : 0.018}
        //scale={0.05}
        // position={[1.0, -0.62, 5]}
        position={props.position ? props.position : [-1.7, -0.39, 2.53]}
        rotation={props.rotation ? props.rotation : [0.02, 0, 0]}
        {...props}
      >
        <primitive object={boat} />
      </group>

      <pointLight position={[165, 10, 10]} intensity={4} color={"orange"} />
    </group>
  );
};

export default Boat;
