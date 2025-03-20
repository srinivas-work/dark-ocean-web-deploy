import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import UnderWaterBg from "./UnderWaterBg";
import UnderWaterParticles from "./UnderWaterParticles";
import UnderwaterBase from "./UnderwaterBase/UnderwaterBase";

const UnderwaterScene = () => {
  //console.log("UnderwaterScene mounted outside"); // Logs only once

  //const scroll = useScroll();
  const underWaterGroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);
  //const opacityRef = useRef(1); // Replaces useState for opacity

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useFrame(() => {
    //const scrollOffset = scroll.offset;
    //Conditional visibility
    // const targetOpacity = scrollOffset >= 0.15 ? 1 : 0;
    // opacityRef.current = MathUtils.lerp(opacityRef.current, targetOpacity, 0.1); // Smooth transition
    // if (groupRef.current) {
    //   groupRef.current.visible = opacityRef.current > 0.05; // Hide when near 0
    //   groupRef.current.children.forEach((child) => {
    //     if (child instanceof Mesh) {
    //       (child.material as MeshStandardMaterial).opacity = opacityRef.current;
    //     }
    //   });
    // }
  });

  if (!isMounted) return null;

  return (
    <group ref={underWaterGroupRef}>
      <UnderWaterBg />
      {/* <CustomSpotLight /> */}
      <group ref={groupRef}>
        <UnderWaterParticles />
        {/* <Fishes position={[5, -2, 0]} /> */}
        <UnderwaterBase />
      </group>
    </group>
  );
};

export default UnderwaterScene;
