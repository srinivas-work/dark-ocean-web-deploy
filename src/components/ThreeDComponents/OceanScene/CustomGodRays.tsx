import { SpotLight } from "@react-three/drei";

const CustomGodRays = () => {
  return (
    <SpotLight
      penumbra={1}
      distance={20}
      angle={0.6}
      attenuation={20}
      anglePower={16}
      intensity={20}
      color="#D1A169"
      position={[0, 0, -2]}
      radiusTop={1}
      radiusBottom={4}
    />
  );
};

export default CustomGodRays;
