import { useEffect, useRef } from "react";
import { useHomepageScrollOffset } from "../../../../store/useHomepageScroll";
import styles from "./ScrollDownText.module.css";
import gsap from "gsap";

const ScrollDownText = () => {
  const scrollOffset = useHomepageScrollOffset();
  const textRef = useRef<HTMLParagraphElement>(null);

  const targetOpacityLimit = 0.02;

  useEffect(() => {
    if (textRef.current) {
      // Calculate opacity based on scrollOffset
      const opacity = Math.max(1 - scrollOffset / targetOpacityLimit, 0); // Decreases from 1 to 0 as scrollOffset approaches 0.02

      gsap.to(textRef.current, {
        opacity,
        visibility: scrollOffset > targetOpacityLimit ? "hidden" : "visible",
        duration: 0.3, // Smooth transition
        ease: "power2.out",
      });
    }
  }, [scrollOffset]);
  return (
    <div className={styles["scroll-down-text-container"]}>
      <p ref={textRef} className={styles["scroll-down-text"]}>
        Scroll Down To Explore
      </p>
    </div>
  );
};

export default ScrollDownText;
