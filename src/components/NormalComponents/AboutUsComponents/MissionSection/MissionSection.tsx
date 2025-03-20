import { HTMLProps } from "react";
import styles from "./MissionSection.module.css";
import { missionData } from "../../../utils/data/dataHolder";

const MissionSection: React.FC<HTMLProps<HTMLDivElement>> = ({ ...props }) => {
  return (
    <div {...props} className={`${styles.missionContainer} ${props.className}`}>
      <div className={styles.imageSection}>
        <img
          src="/img/about-us/earth-space.jpg"
          alt="Mission"
          className={styles.missionImage}
        />
      </div>
      <div className={styles.textSection}>
        {missionData.map((item) => (
          <div key={item.id} className={styles.missionItem}>
            <span className={styles.missionNumber}>{item.id}.</span>
            <div>
              <h2 className={styles.missionTitle}>{item.title}</h2>
              <p className={styles.missionDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionSection;
