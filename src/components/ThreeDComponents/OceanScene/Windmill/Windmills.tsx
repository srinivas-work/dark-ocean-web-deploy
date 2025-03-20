import { Euler, Vector3 } from "three";
import useIsPhoneScreen from "../../../utils/hooks/useIsPhoneScreen";
import WindMillInstance from "./WindMillInstance";

const Windmills = () => {
  //console.log("wind-mill");

  const windMillScale = new Vector3(0.017, 0.017, 0.017);

  const windMillRotation = new Euler(4.7, -3.1, -2.5);

  const isPhoneScreen = useIsPhoneScreen();

  // Define positions, rotations, and scales for each windmill instance
  const instancePositions = [
    new Vector3(-11.5, -0.45, -3),
    new Vector3(-9.3, -0.6, -4),
    new Vector3(6.8, -0.4, -3),
    new Vector3(9.8, -0.35, -2),
  ];

  const phoneInstancePositions = [
    new Vector3(-2, -0.1, -3),
    new Vector3(3, -0.3, -4),
  ];

  const instanceRotations = [
    windMillRotation, // Rotation for the first windmill
    windMillRotation, // Rotation for the second windmill
    windMillRotation, // Rotation for the third windmill
    windMillRotation, // Rotation for the fourth windmill
  ];

  const instanceScales = [
    windMillScale,
    windMillScale,
    windMillScale,
    windMillScale,
  ];

  if (isPhoneScreen) {
    return (
      <group position={[0, -0.8, -1.5]} scale={1.2}>
        <WindMillInstance
          instanceCount={phoneInstancePositions.length}
          instancePositions={phoneInstancePositions}
          instanceRotations={instanceRotations}
          instanceScales={instanceScales}
        />
      </group>
    );
  }

  return (
    <group position={[0, -0.8, -1.5]} scale={1.2}>
      <WindMillInstance
        instanceCount={instancePositions.length}
        instancePositions={instancePositions}
        instanceRotations={instanceRotations}
        instanceScales={instanceScales}
      />
    </group>
  );

  // const windMillScale = 0.00015;

  // return (
  //   <group position={[0, -2.2, -1.68]} scale={1.2}>
  //     {/* Left Windmills */}
  //     <WindmillInstance
  //       position={[-11.5, 0, -3]}
  //       rotation={[0, 1, 0]}
  //       scale={windMillScale}
  //     />
  //     <WindmillInstance
  //       position={[-9.3, -0.2, -4]}
  //       rotation={[0, 1, 0]}
  //       scale={windMillScale}
  //     />

  //     {/* Right Windmills */}
  //     <WindmillInstance position={[6.8, 0, -3]} scale={windMillScale} />
  //     {/* <WindmillInstance position={[9.7, -0.2, -4]} scale={windMillScale} /> */}
  //     <WindmillInstance position={[9.8, 0, -2]} scale={windMillScale} />
  //   </group>
  // );
};

export default Windmills;
