import { useNavigate } from "react-router-dom";
import { PressItemType } from "../../../utils/types/customDataTypes";
import styles from "./PressCard.module.css";
import { useBlogItem } from "../../../../../store/useBlogItem";

const PressCard: React.FC<{ pressCardItem: PressItemType }> = ({
  pressCardItem,
}) => {
  const navigate = useNavigate();
  const { setChosenBlogItem } = useBlogItem();
  // const imgClickHandler = () => {
  //   window.open(
  //     "http://16.24.79.183/news/darkocean-has-taken-delivery-of-two-heavy-work-class-triton-xls-rovs/",
  //     "_blank"
  //   );
  // };

  const imgClickHandler = () => {
    setChosenBlogItem(pressCardItem);
    navigate(`/press-release/${pressCardItem.title}`);
  };

  return (
    <div className={styles["press-card"]}>
      <img
        className={styles["press-card-img"]}
        src={pressCardItem.imgLink}
        onClick={imgClickHandler}
      />
      <div className={styles["press-card-timeline-details"]}>
        <p>{pressCardItem.postDate} ago</p>
        <span />
        <p>{pressCardItem.category}</p>
        <span />
        <p>Dark Ocean</p>
      </div>
      <p className={styles["press-card-title"]}>{pressCardItem.title}</p>
    </div>
  );
};

export default PressCard;
