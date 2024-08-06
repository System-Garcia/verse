import { useState } from 'react';
import Image from 'next/image';
import styles from './searchGooglebookInput.module.css';

interface Props {
  onSearch: (bookCovers: string[]) => void; // Passes the array of book cover URLs to the parent component for updating the display.
}

const SearchGoogleBookInput: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Manages the current search term entered by the user.
  const [searchCategory, setSearchCategory] = useState('name'); // Tracks the selected category for the search (e.g., name, genres, authors).

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Updates the search term as the user types in the input field.
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value); // Updates the search category based on the user's selection.
  };

  const handleSearch = async () => {
    if (!searchTerm) return; // Prevents unnecessary API calls if the search term is empty.

    let query = searchTerm;
    if (searchCategory === 'authors') {
      query = `inauthor:${searchTerm}`; // Adjusts query for author search.
    } else if (searchCategory === 'genres') {
      query = `subject:${searchTerm}`; // Adjusts query for genre search.
    }

    // Include the API key in the request URL
    const response = await fetch(`/api/books/searchbooks?q=${searchTerm}&category=${searchCategory}`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      onSearch([]); // Handles the case where no books are found by sending an empty array to the parent component.
      return;
    }

    const bookCovers = data.items
      .map((item: any) => item.volumeInfo.imageLinks?.thumbnail)
      .filter(Boolean); // Extracts and filters book cover URLs from the API response.

    onSearch(bookCovers); // Sends the array of book cover URLs to the parent component for updating the display.
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // Triggers the search action when the user presses the 'Enter' key.
    }
  };

  // Renders the search input, select dropdown, and search button with appropriate styles and behavior.
  return (
    <div className={styles['search-container']}>
      <div className={styles['select-container']}>
        <select
          className={styles['search-select']}
          aria-label="Search category"
          value={searchCategory}
          onChange={handleCategoryChange}
        >
          <option value="name">Bookname</option>
          <option value="genres">Genres</option>
          <option value="authors">Authors</option>
        </select>
        <div className={styles['triangle-container']} />
      </div>

      <span className={styles['search-divider']}>|</span>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className={styles['search-input']}
        aria-label="Search books"
      />

      <button
        className={styles['search-button']}
        onClick={handleSearch}
        aria-label="Search button"
      >
        <Image
          src="/images/icons/search-icon.svg"
          alt="Search"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export default SearchGoogleBookInput;