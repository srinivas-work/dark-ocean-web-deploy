import { ButtonHTMLAttributes } from "react";
import styles from "./CloseButton.module.css";

const CloseButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button className={`${styles["close-btn"]} ${props.className}`} {...props}>
      <img src="icons/cross.svg" alt="close" />
    </button>
  );
};

export default CloseButton;
