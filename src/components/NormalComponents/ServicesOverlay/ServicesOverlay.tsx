import { motion } from "framer-motion";
import { useServiceOverlayStore } from "../../../../store/useOverlay";
import DualTextImg from "../../UI/DualTextImg/DualTextImg";
import styles from "./ServicesOverlay.module.css";
import FlipBookViewer from "../FlipBookViewer/FlipBookViewer";
import CloseButton from "../../UI/CloseButton/CloseButton";
import AnimatedText from "../../UI/AnimatedText/AnimatedText";
import useIsPhoneScreen from "../../utils/hooks/useIsPhoneScreen";
import { useEffect } from "react";

const ServicesOverlay = () => {
  const { isOpen, toggle } = useServiceOverlayStore();
  const isPhoneScreen = useIsPhoneScreen();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "unset"; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = "unset"; // Cleanup when unmounting
    };
  }, [isOpen]);

  return (
    <motion.div
      className={styles["service-overlay-container"]}
      initial={{ y: "-150%", opacity: 0 }} // Start off-screen (right side)
      animate={isOpen ? { y: "0%", opacity: 1 } : { y: "-150%", opacity: 0 }} // Animate to view or hide
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 150, // Makes the spring snappier
        damping: 30, // Reduces excessive bouncing
        mass: 1.8, // Controls weight feel
      }}
    >
      <div className={styles["service-heading-container"]}>
        <AnimatedText
          el={"h1"}
          text={"Hydrography"}
          style={{ marginRight: "auto" }}
        />
        {isPhoneScreen && <FlipBookViewer />}
      </div>
      {/* <img src="/img/services/DO_Pattern.svg" /> */}
      <div className={styles["accordion-description"]}>
        <DualTextImg
          heading="Site Assessment"
          desc="SKY Contracting performs comprehensive environmental site assessments to keep your project running smoothly and on time.
Our extensive sampling and laboratory analysis will examine the soil, groundwater, air and building materials to ensure compliance with local, state and federal
environmental regulations."
          imgLink="https://images.ctfassets.net/1ekbmu4c7re7/6srcgQX2VTMPJ57DmYlbyH/592f6a0b5b39f9a53406a34412ad928b/sky_services_preconstruction1.jpg"
        />
        {!isPhoneScreen && <FlipBookViewer />}
        {/* <BlinkingCircularButton
          style={{
            position: "static",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          onClick={toggle}
        /> */}
        <DualTextImg
          heading="Site Assessment"
          desc="SKY Contracting performs comprehensive environmental site assessments to keep your project running smoothly and on time.
Our extensive sampling and laboratory analysis will examine the soil, groundwater, air and building materials to ensure compliance with local, state and federal
environmental regulations."
          imgLink="https://images.ctfassets.net/1ekbmu4c7re7/6srcgQX2VTMPJ57DmYlbyH/592f6a0b5b39f9a53406a34412ad928b/sky_services_preconstruction1.jpg"
          isReversed
        />
        {/* <FlipBookViewer /> */}
      </div>
      <CloseButton onClick={toggle} />
    </motion.div>
  );
};

export default ServicesOverlay;
