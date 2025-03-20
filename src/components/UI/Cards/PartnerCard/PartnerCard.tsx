import { HTMLProps } from "react";
import { PartnerDataItemType } from "../../../utils/types/customDataTypes";
import styles from "./PartnerCard.module.css";

const PartnerCard: React.FC<
  HTMLProps<HTMLDivElement> & { partner: PartnerDataItemType }
> = ({ partner, ...props }) => {
  return (
    <div {...props} className={`${styles.partnerCard} ${props.className}`}>
      <img
        src={partner.logo}
        alt={partner.name}
        className={styles.partnerImage}
      />
      <div className={styles["partner-card-description"]}>
        <div className={styles["partner-card-description-title-container"]}>
          <p>
            <b>Company Name</b>
          </p>
          <p>Type of Partnership</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          praesentium soluta ipsum eligendi, magnam inventore Obcaecati
          praesentium soluta
        </p>
      </div>
    </div>
  );
};

export default PartnerCard;
