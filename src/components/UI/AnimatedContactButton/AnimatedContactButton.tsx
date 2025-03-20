import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./AnimatedContactButton.module.css";
import { useContactOverlayStore } from "../../../../store/useOverlay";

const AnimatedContactButton = () => {
  const { toggle } = useContactOverlayStore();

  return (
    <div className={styles["animated-contact-btn-container"]} onClick={toggle}>
      <div className={styles["fluid-container"]}>
        <img src="/icons/message_bubble.svg" alt="contact-us" />
        <div className={styles.fluid}></div>
      </div>
    </div>
  );

  return (
    <DotLottieReact
      className={styles["animated-contact-btn"]}
      src="/animation/contact_button.json"
      loop
      autoplay
      onClick={toggle}
    />
  );
};

export default AnimatedContactButton;
