import { useState } from "react";
import JobCard from "../../../../UI/Cards/JobCard/JobCard";
import {
  jobCategoryList,
  jobsList,
  placeList,
} from "../../../../utils/data/dataHolder";
import styles from "./OpenJobPositions.module.css";

const OpenJobPositions: React.FC = () => {
  const [chosenCategory, setChosenCategory] = useState<string>("All");
  const [chosenLocation, setChosenLocation] = useState<string>("All Location");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [jobTitle, setJobTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleReset = () => {
    setJobTitle("");
    setChosenCategory("All");
    setChosenLocation("All Location");
  };

  const filteredJobs = jobsList.filter(
    (jobItem) =>
      (chosenCategory === "All" || jobItem.category === chosenCategory) &&
      (chosenLocation === "All Location" ||
        jobItem.location === chosenLocation) &&
      jobItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Open Job Positions</h2>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={handleInputChange}
        />

        <select
          value={chosenCategory}
          onChange={(e) => setChosenCategory(e.target.value)}
        >
          {jobCategoryList.map((jobCategoryItem, index) => (
            <option key={index} value={jobCategoryItem}>
              {jobCategoryItem}
              {jobCategoryItem === "All" && " Categories"}
            </option>
          ))}
        </select>

        <select
          value={chosenLocation}
          onChange={(e) => setChosenLocation(e.target.value)}
        >
          <option value={"All Location"}>All Location</option>
          {placeList.map((placeItem, index) => (
            <option
              key={index}
              value={
                placeItem.shortAddress
                  ? placeItem.shortAddress
                  : placeItem.address
              }
            >
              {placeItem.shortAddress
                ? placeItem.shortAddress
                : placeItem.address}
            </option>
          ))}
        </select>

        <button className={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Example Job Listing Card */}
      <div className={styles["job-card-list"]}>
        {filteredJobs.length === 0 ? (
          <p className={styles["search-error-message"]}>
            Oops! We couldn't find any matching jobs.
          </p>
        ) : (
          filteredJobs.map((jobItem, index) => (
            <JobCard jobItem={jobItem} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default OpenJobPositions;
