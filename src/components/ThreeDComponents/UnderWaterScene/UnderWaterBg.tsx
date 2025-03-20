import { GradientTexture } from "@react-three/drei";
import { underWaterBgGradient } from "../../utils/data/colorInfo";

const UnderWaterBg = () => {
  return (
    <mesh position={[0, 0, -25]} scale={[4, 2, 1]}>
      <planeGeometry args={[100, 60]} />
      <meshBasicMaterial>
        <GradientTexture
          stops={[0, 0.8]} // As many stops as you want
          colors={underWaterBgGradient} // Colors need to match the number of stops
          size={1024} // Size is optional, default = 1024
        />
      </meshBasicMaterial>
    </mesh>
  );
};

export default UnderWaterBg;
