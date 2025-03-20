import { HTMLProps } from "react";
import styles from "./DualTextImg.module.css";

const DualTextImg: React.FC<
  HTMLProps<HTMLDivElement> & {
    imgLink: string;
    heading: string;
    desc: string;
    isReversed?: boolean;
  }
> = ({ imgLink, heading, desc, isReversed, ...props }) => {
  return (
    <div
      {...props}
      className={`${styles["dual-text-img-container"]} ${
        isReversed && styles.reversed
      } ${props.className}`}
    >
      <img src={imgLink} alt={imgLink} />
      <div className={styles["dual-text-img-text-container-first"]}>
        <h4>{heading}</h4>
        <p>{desc}</p>
      </div>
      <div className={styles["dual-text-img-text-container-second"]}>
        <h4>{heading}</h4>
        <p>{desc} </p>
      </div>
    </div>
  );
};

export default DualTextImg;
