import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const AdaptivePixelRatio = () => {
  const current = useThree((state) => state.performance.current);
  const setPixelRatio = useThree((state) => state.setDpr);
  useEffect(() => {
    setPixelRatio(window.devicePixelRatio * current);
  }, [current]);
  return null;
};

export default AdaptivePixelRatio;
