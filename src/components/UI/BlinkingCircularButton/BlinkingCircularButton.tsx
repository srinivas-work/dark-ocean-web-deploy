import { ButtonHTMLAttributes, useState } from "react";
import styles from "./BlinkingCircularButton.module.css";

const BlinkingCircularButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStartHandler = () => {
    setIsHovered(true);
  };
  const hoverEndHandler = () => {
    setIsHovered(false);
  };

  return (
    <button
      {...props}
      className={`${styles["blinking-circular-button"]} ${props.className}`}
      onMouseEnter={hoverStartHandler}
      onMouseLeave={hoverEndHandler}
    >
      <img src="/icons/services/geotechnical_solutions.svg" />
      <p
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "all 0.5s ease-in-out",
        }}
      >
        Hydrography
      </p>
    </button>
  );
};

export default BlinkingCircularButton;
