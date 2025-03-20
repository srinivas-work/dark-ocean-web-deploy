import { useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import { Mesh, MeshBasicMaterial } from "three";

const OilRig = () => {
  const texture = useTexture("/textures/ocean/oil_rig.png");
  const oilRigRef = useRef<Mesh | null>(null);
  const oilShaderRef = useRef<MeshBasicMaterial>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!oilRigRef.current || !oilShaderRef.current) return;

    const scrollOffset = scroll.offset;

    const targetPosition = scrollOffset >= 0.33 ? -1 : -1.81;

    gsap.to(oilRigRef.current.position, {
      y: targetPosition,
      duration: 0.1,
      ease: "power2.out",
    });

    oilShaderRef.current.visible = scrollOffset < 0.58;
  });
  return (
    <mesh ref={oilRigRef} position={[14.2, -1.81, -8.5]} scale={2.1}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={oilShaderRef} map={texture} transparent />
    </mesh>
  );
};

export default OilRig;
