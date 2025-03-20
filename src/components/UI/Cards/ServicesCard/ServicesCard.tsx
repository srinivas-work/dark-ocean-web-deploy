import styles from "./ServicesCard.module.css";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ServiceItemType } from "../../../utils/types/customDataTypes";

const ServicesCard: React.FC<
  React.HTMLProps<HTMLDivElement> & {
    index: number;
    range: number[];
    targetScale: number;
    parentScrollProgress: MotionValue<number>;
    cardItem: ServiceItemType;
  }
> = ({ index, range, targetScale, parentScrollProgress, cardItem }) => {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  //We're animating from the bottom of the screen till
  //the item appear to the top of the screen
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start end", "start start"],
  });

  //Here we're transforming the value from 2 to 1 when it's actually 0 to 1
  const imgScale = useTransform(scrollYProgress, [0, 1], [5, 1]);
  const scale = useTransform(parentScrollProgress, range, [1, targetScale]);

  return (
    <div className={styles["services-card-container"]} ref={cardContainerRef}>
      <motion.div
        className={styles["services-card"]}
        style={{
          scale,
          backgroundColor: cardItem.backgroundColor,
          top: `calc(-12% + ${index * 20}px)`,
        }}
      >
        <div className={styles["services-card-content"]}>
          <div className={styles["services-card-description"]}>
            <h2 style={{ color: "inherit" }}>{cardItem.title}</h2>
            <p style={{ color: "inherit" }}>{cardItem.description}</p>
            {/* <button>Check Our Work</button> */}
          </div>
          <div className={styles["services-card-img-container"]}>
            <motion.div
              style={{ scale: imgScale }}
              className={styles["services-card-img-container-inner"]}
            >
              <img
                className={styles["services-card-img"]}
                src={cardItem.imgLink}
                alt="Image"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesCard;
