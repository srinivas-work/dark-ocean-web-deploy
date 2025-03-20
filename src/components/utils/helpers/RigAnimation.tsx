import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const RigAnimation = () => {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 0.15,
        Math.sin(state.pointer.y) * 0.15,
        state.camera.position.z,
      ],
      0.3,
      delta
    );
  });
  return null;
};

export default RigAnimation;
