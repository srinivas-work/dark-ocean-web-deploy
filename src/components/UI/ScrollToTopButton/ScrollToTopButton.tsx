import { ButtonHTMLAttributes } from "react";
import styles from "./ScrollToTopButton.module.css";
import { useResetHomepageScroll } from "../../../../store/useHomepageScroll";

const ScrollToTopButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  const { toggle } = useResetHomepageScroll();

  const btnClickHandler = () => {
    toggle();
  };
  return (
    <button
      {...props}
      className={`${styles["scroll-to-top-btn"]} ${props.className}`}
      onClick={btnClickHandler}
    >
      Hello
    </button>
  );
};

export default ScrollToTopButton;
