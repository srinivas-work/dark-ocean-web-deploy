import { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <img src="/icons/search-icon.svg" alt="Search" className={styles.icon} />
      <input
        type="text"
        placeholder="Search"
        className={styles.input}
        value={input}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
