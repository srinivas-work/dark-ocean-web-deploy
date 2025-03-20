import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import useIsPhoneScreen from "../../../utils/hooks/useIsPhoneScreen";
import CustomSpotLight from "./CustomSpotLight";
import EarthMaterial from "./EarthMaterial";
import Satellite from "./Satellite";

const Earth = () => {
  const satelliteRef = useRef<THREE.Mesh>(null);
  const satelliteGroupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);

  const isPhoneScreen = useIsPhoneScreen();

  const scroll = useScroll();

  const defaultSatelliteGroupPos = useMemo(() => {
    if (isPhoneScreen) {
      return [-4.5, 1, -4];
    }
    return [-7, 1, -4];
  }, [isPhoneScreen]);

  useFrame(() => {
    const scrollOffset = scroll.offset;

    if (!satelliteGroupRef.current || !earthRef.current) return;
    //Hiding satellite to avoid the jumping effect
    satelliteGroupRef.current.visible =
      scrollOffset <= 0.03 || scrollOffset >= 0.147;

    //const targetPoint = scrollOffset >= 0.235 && scrollOffset <= 0.3;
    const targetPoint = scrollOffset >= 0.127;

    const targetPosition = targetPoint
      ? [11.5, 6.4, -4]
      : defaultSatelliteGroupPos;
    const targetRotation = targetPoint
      ? [-0.8, 0.63, 1.5]
      : [-Math.PI / 1.5, -Math.PI / 2, 2];

    gsap.to(satelliteGroupRef.current.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 1.3,
      ease: "power2.out",
    });
    gsap.to(satelliteGroupRef.current.rotation, {
      x: targetRotation[0],
      y: targetRotation[1],
      z: targetRotation[2],
      duration: 1.3,
      ease: "power2.out",
    });

    //Rotating earth
    const targetEarthRotation = scrollOffset >= 0.1 ? -0.6 : 0;

    gsap.to(earthRef.current.rotation, {
      x: targetEarthRotation,
      duration: 1.3,
      ease: "power2.out",
    });
  });

  return (
    <group position={isPhoneScreen ? [0.45, 0, 0] : [0, 0, 0]} scale={0.9}>
      <mesh ref={earthRef} rotation={[0, 0, 0]}>
        <sphereGeometry args={[2, 35, 35]} />
        <EarthMaterial sunDirection={new THREE.Vector3(-2, 0.5, 1.5)} />
      </mesh>
      <group
        ref={satelliteGroupRef}
        //position={[defaultSatelliteGroupPos]}
        rotation={[-Math.PI / 1.5, -Math.PI / 2, 2]}
      >
        <Satellite ref={satelliteRef} scale={0.16} />
        <CustomSpotLight
          position={[-0.4, 0.3, -1.9]}
          rotation={[1.4, 0, 0]}
          scale={[1, 0.78, 1]}
        />
      </group>
    </group>
  );
};

export default Earth;
