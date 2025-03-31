import useIsPhoneScreen from "../../../utils/hooks/useIsPhoneScreen";
import { JobItemType } from "../../../utils/types/customDataTypes";
import styles from "./JobCard.module.css";

const JobCard: React.FC<{ jobItem: JobItemType }> = ({ jobItem }) => {
  const isPhoneScreen = useIsPhoneScreen();
  const isExpired = true;

  return (
    <div className={styles.jobCard}>
      <div className={styles.jobDetails}>
        <h3>{jobItem.title}</h3>
        <ul className={styles["job-details-list"]}>
          <li>Darkocean</li>
          <li>{jobItem.location}</li>
        </ul>
      </div>
      <div className={styles["job-card-click-section"]}>
        {!isPhoneScreen && isExpired && (
          <span className={styles.expired}>Expired</span>
        )}
        <button
          className={`${styles.applyButton} ${
            isExpired ? styles.expiredButton : ""
          }`}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
