import Bubble from "../../Bubble/Bubble";
import styles from "./PdfCard.module.css";

const PdfCard: React.FC<{ imgLink: string }> = ({ imgLink }) => {
  return (
    <div className={styles["pdf-card"]}>
      <img className={styles["pdf-thumbnail"]} src={imgLink} />
      <div className={styles["pdf-card-details-container"]}>
        <h4>Author: Aaron Stalin</h4>
        <Bubble
          title="Technology"
          style={{ width: "80%", padding: "0.3rem" }}
        />
      </div>
    </div>
  );
};

export default PdfCard;
