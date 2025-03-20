import { motion } from "framer-motion";
import { useCustomLoaderStore } from "../../../../store/useCustomLoader";
import styles from "./CustomLoader.module.css"; // Import the CSS Module

const CustomLoader = () => {
  const { progress } = useCustomLoaderStore();

  return (
    <motion.div
      className={styles.loaderContainer}
      initial={{ y: 0 }}
      animate={progress === 100 ? { y: "-110vh" } : { y: 0 }}
      transition={{ ease: "easeOut", delay: 0.5, duration: 0.8 }}
    >
      <div className={styles["loader-container"]}>
        <div className={styles["wave-fill"]}>
          <div className={styles.water}>
            <span className={styles.wave}></span>
            <span className={styles["deep-water"]}></span>
          </div>
        </div>
        <p className={styles.progressText}>{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
};

export default CustomLoader;
