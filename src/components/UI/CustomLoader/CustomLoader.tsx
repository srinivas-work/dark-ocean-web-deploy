import { motion } from "framer-motion";
import styles from "./CustomLoader.module.css"; // Import the CSS Module
import { useCustomLoaderStore } from "../../../../store/useCustomLoader";

const CustomLoader = () => {
  const { progress } = useCustomLoaderStore();

  return (
    <motion.div
      className={styles.loaderContainer}
      initial={{ y: 0 }}
      animate={progress === 100 ? { y: "-110vh" } : { y: 0 }}
      transition={{ ease: "easeOut", delay: 0.5, duration: 0.8 }}
    >
      <div className={styles.loaderInnerContainer}>
        {/* Circular border */}
        <div className={styles.circularBorder}>
          <div
            className={styles.progressFill}
            style={{
              transform: `rotate(${(progress / 100) * 360}deg)`,
            }}
          />
        </div>
        {/* Progress text */}
        <p className={styles.progressText}>{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
};

export default CustomLoader;
