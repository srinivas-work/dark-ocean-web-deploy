import styles from "./SocialMediaIconSet.module.css";

const SocialMediaIconSet: React.FC<{ invert?: boolean }> = ({ invert }) => {
  return (
    <div
      className={styles["social-media-icon-set"]}
      style={invert ? { filter: "invert(100%)" } : {}}
    >
      <div className={styles["social-media-icon-container"]}>
        <img src="/icons/social_media/linked-in.svg" alt="LinkedIn" />
      </div>
      <div className={styles["social-media-icon-container"]}>
        <img src="/icons/social_media/x.svg" alt="X" />
      </div>
      <div className={styles["social-media-icon-container"]}>
        <img src="/icons/social_media/ig.svg" alt="Instagram" />
      </div>
    </div>
  );
};

export default SocialMediaIconSet;
