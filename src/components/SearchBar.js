import { useState, useEffect } from "react";


function SearchBar({ keyword, onSearch }) {
  const [text, setText] = useState(keyword);

  
  useEffect(() => {
    setText(keyword);
  }, [keyword]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(text.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tìm tên sản phẩm..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn">Tìm</button>
    </form>
  );
}

export default SearchBar;
