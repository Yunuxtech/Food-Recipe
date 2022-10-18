import React, { useContext, useState } from "react";
import { useGlobalContext } from "../context";
const Search = () => {
  const [text, setText] = useState("");
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (text) {
      setSearchTerm(text);
    //   setText("");
    }
  };
  const handleRandomMeal = ()=>{
    setSearchTerm("")
    setText("")
    fetchRandomMeal()
  }
  return (
    <header className="search-container ">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type favourite meal"
          className="form-input"
          onChange={handleChange}
          value={text}
        />
        <button type="submit" className="btn">
          search
        </button>
        <button
          type="button"
          className="btn btn-hipster"
          onClick={handleRandomMeal}
        >
          suprise me!
        </button>
      </form>
    </header>
  );
};

export default Search;
