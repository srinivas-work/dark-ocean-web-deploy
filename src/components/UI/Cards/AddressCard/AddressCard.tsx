import { PlaceItemType } from "../../../utils/types/customDataTypes";
import styles from "./AddressCard.module.css";

const AddressCard: React.FC<{
  placeItem: PlaceItemType;
}> = ({ placeItem }) => {
  return (
    <div className={styles["address-card"]}>
      <p className={styles["address-card-place-name"]}>{placeItem.place}</p>
      <div className={styles["address-details-container"]}>
        <img
          className={styles["address-details-phone-icon"]}
          src="/icons/phone-icon.svg"
        />
        <div>
          <p>{placeItem.phone} (Phone)</p>
          {placeItem.fax && <p>{placeItem.fax} (Fax)</p>}
        </div>
      </div>
      <div className={styles["address-details-container"]}>
        <img src="/icons/map-icon.svg" />
        <p>{placeItem.address}</p>
      </div>
    </div>
  );
};

export default AddressCard;
