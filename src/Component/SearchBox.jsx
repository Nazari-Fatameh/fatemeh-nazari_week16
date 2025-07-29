import { useState } from "react";
import styles from "./SearchBox.module.css";
function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.containerSearchBox}>
      <input
        id="searchInput"
        type="text"
        value={query}
        onChange={handleChange}
      />
      <label htmlFor="searchInput" className={styles.searchInputLable}>:جستجو در مخاطبین</label>
    </div>
  );
}

export default SearchBox;
