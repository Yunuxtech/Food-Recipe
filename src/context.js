import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
export const AppContext = React.createContext();

const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const getFavouritesFromLoaclStorage = () => {
  let favourites = localStorage.getItem("favourites");
  if (favourites) {
    favourites = JSON.parse(localStorage.getItem("favourites"));
  } else {
    favourites = [];
  }
  return favourites;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [favourites, setFavourites] = useState(getFavouritesFromLoaclStorage());
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }

      //   console.log(data.meals)
    } catch (error) {
      // console.log(error.response);
    }
    setLoading(false);
  };
  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };
  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    if (favouriteMeal) {
      meal = favourites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    setSelectedMeal(meal);
    setShowModal(true);
    // console.log(idMeal)
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const addToFavourites = (idMeal) => {
    console.log(idMeal);
    const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavourite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavourites = [...favourites, meal];
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };
  const removeFromFavourites = (idMeal) => {
    const updatedFavourites = favourites.filter(
      (meal) => meal.idMeal !== idMeal
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };
  useEffect(() => {
    fetchMeals(allMealUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealUrl}${searchTerm}`);
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addToFavourites,
        removeFromFavourites,
        favourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export default AppProvider;
