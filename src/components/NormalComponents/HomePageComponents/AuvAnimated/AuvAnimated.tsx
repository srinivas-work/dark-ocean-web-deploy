import gsap from "gsap";
import styles from "./AuvAnimated.module.css";
import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useHomepageScrollOffset } from "../../../../../store/useHomepageScroll";
import useIsPhoneScreen from "../../../utils/hooks/useIsPhoneScreen";

const AuvAnimated = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollOffset = useHomepageScrollOffset();
  const isPhoneScreen = useIsPhoneScreen();

  let targetPoint = 0.4;

  let xSpeedFactor = 20500;
  let ySpeedFactor = 500;

  useEffect(() => {
    if (!containerRef.current) return;

    if (isPhoneScreen) {
      targetPoint = 0.38;
      xSpeedFactor = 8500;
      ySpeedFactor = 1000;
    }

    // Check if scrollOffset is in range to start animation
    if (scrollOffset >= targetPoint) {
      gsap.to(containerRef.current, {
        opacity: 0.75, // Make visible
        x: (scrollOffset - targetPoint) * xSpeedFactor, // Move right with scroll
        y: (scrollOffset - targetPoint) * ySpeedFactor,
        scale: isPhoneScreen ? 2 : 1,
        duration: 0.6,
        ease: "power1.out",
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 0, // Hide when out of range
        x: "-35rem", // Reset position
        scale: isPhoneScreen ? 2 : 1,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  }, [isPhoneScreen, scrollOffset]);

  return (
    <div ref={containerRef} className={styles["auv-animated-container-parent"]}>
      <DotLottieReact src="/animation/auv_animated_rev.json" loop autoplay />
    </div>
  );
};

export default AuvAnimated;
