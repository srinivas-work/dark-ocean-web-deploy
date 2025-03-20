import { motion } from "framer-motion";
import { useRef } from "react";
import styles from "./BlinkingSpaceDot.module.css";
import { useHomepageScrollOffset } from "../../../../store/useHomepageScroll";

const BlinkingSpaceDot = () => {
  const scrollOffset = useHomepageScrollOffset();
  const concentricCircleRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={concentricCircleRef}
      animate={{
        opacity: scrollOffset >= 0.18 && scrollOffset <= 0.25 ? 1 : 0,
        // translateX: scrollOffset >= 0.31 ? "-2rem" : 0,
        // translateY: scrollOffset >= 0.31 ? "-20rem" : 0,
        //y: (scrollOffset - 0.047) * 300,
      }}
      transition={{
        duration: 0.1,
        ease: "easeInOut",
      }}
      className={styles["concentric-circles-container"]}
    >
      {/* <div className={styles["blinking-boat-img-container"]}>
        <img
          className={styles["blinking-boat-img"]}
          src="/img/dark_ocean_boat.png"
        />
      </div> */}
      <div className={`${styles.circle} ${styles.one}`}></div>
      <div className={`${styles.circle} ${styles.two}`}></div>
      <div className={`${styles.circle} ${styles.three}`}></div>
    </motion.div>
  );
};

export default BlinkingSpaceDot;
