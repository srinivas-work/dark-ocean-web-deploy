import { useState } from "react";
import PressCard from "../../components/UI/Cards/PressCard/PressCard";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import styles from "./PressReleasePage.module.css";
import {
  categoryList,
  pressReleaseList,
} from "../../components/utils/data/dataHolder";

const PressReleasePage = () => {
  const [chosenCategory, setChosenCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPressReleases = pressReleaseList.filter(
    (pressItem) =>
      (chosenCategory === "All" || pressItem.category === chosenCategory) &&
      pressItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles["press-release-page"]}>
      <div className={styles["press-release-category-bar"]}>
        <ul className={styles["press-release-page-categories"]}>
          {categoryList.map((categoryItem, index) => (
            <li
              key={index}
              onClick={() => setChosenCategory(categoryItem)}
              style={{
                color:
                  chosenCategory === categoryItem
                    ? "var(--primary-blue)"
                    : "#6279a3",
              }}
            >
              {categoryItem}
            </li>
          ))}
        </ul>
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <div
        className={styles["press-release-page-cards-holder"]}
        style={
          filteredPressReleases.length === 0
            ? { display: "flex", justifyContent: "center" }
            : {}
        }
      >
        {filteredPressReleases.length === 0 ? (
          <p className={styles["search-error-message"]}>
            Oops! We couldn't find any matching press releases.
          </p>
        ) : (
          filteredPressReleases.map((pressItem, index) => (
            <PressCard pressCardItem={pressItem} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default PressReleasePage;
