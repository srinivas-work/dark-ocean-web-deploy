import { HTMLProps } from "react";
import styles from "./TimelineCard.module.css";
import { TimelineItemType } from "../../../utils/types/customDataTypes";

const TimelineCard: React.FC<
  HTMLProps<HTMLDivElement> & {
    timelineDataItem: TimelineItemType;
    showImg?: boolean;
    imgLink?: string;
  }
> = ({ showImg, timelineDataItem, imgLink, ...props }) => {
  return (
    <div
      {...props}
      className={`${styles["timeline-card"]} ${props.className}`}
      style={{
        ...props.style, // Spread the received style prop
        ...(showImg && {
          backgroundImage: `url(${imgLink})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }),
      }}
    >
      <div className={styles["timeline-card-details"]}>
        <p>{timelineDataItem.year}</p>
        <h2>{timelineDataItem.heading}</h2>
        <p>{timelineDataItem.desc}</p>
      </div>
    </div>
  );
};

export default TimelineCard;
