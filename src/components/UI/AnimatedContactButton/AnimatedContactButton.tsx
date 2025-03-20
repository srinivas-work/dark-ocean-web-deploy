import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./AnimatedContactButton.module.css";
import { useContactOverlayStore } from "../../../../store/useOverlay";

const AnimatedContactButton = () => {
  const { toggle } = useContactOverlayStore();

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
