import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCareerOverlayStore } from "../../../../../store/useOverlay";
import CloseButton from "../../../UI/CloseButton/CloseButton";
import styles from "./CareerOverlay.module.css";
import OpenJobPositions from "./OpenJobPositions/OpenJobPositions";

const CareerOverlay = () => {
  const { isOpen, toggle } = useCareerOverlayStore();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden"; // Disable scrolling
  //     //document.body.style.maxHeight = "100vh";
  //   } else {
  //     document.body.style.overflow = "unset"; // Restore scrolling
  //     // document.body.style.maxHeight = "unset";
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset"; // Cleanup when unmounting
  //     //document.body.style.maxHeight = "unset";
  //   };
  // }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      window.scrollTo(
        0,
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--scroll-y"
          )
        )
      );
    }
  }, [isOpen]);

  return (
    <motion.div
      className={styles.careerContainer}
      initial={{ y: "-100%", opacity: 0 }} // Start off-screen (right side)
      animate={isOpen ? { y: "0%", opacity: 1 } : { y: "-100%", opacity: 0 }} // Animate to view or hide
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 150, // Makes the spring snappier
        damping: 30, // Reduces excessive bouncing
        mass: 1.8, // Controls weight feel
      }}
    >
      <div className={styles.infoSection}>
        <div>
          <div className={styles["info-heading-container"]}>
            <h2 className={styles.heading}>
              Charting the Future: Careers in Darkocean
            </h2>
          </div>
          <p className={styles.description}>
            <i>
              Explore exciting career opportunities in Darkocean. Be a part of
              cutting-edge ocean exploration!
            </i>
          </p>
        </div>

        <OpenJobPositions />
      </div>

      <CloseButton onClick={toggle} />
    </motion.div>
  );
};

export default CareerOverlay;
