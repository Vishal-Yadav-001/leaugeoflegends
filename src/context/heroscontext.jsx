import { createContext, useState } from "react";

const HerosContext = createContext();

const HerosProvider = ({ children }) => {
  const [favoriteHero, setFavoriteHero] = useState([]);
  const [isHeroPresent, setIsHeroPresent] = useState([]);
  /**
   * Add selected hero users watch list
   * @param {*} - value
   */
  const addHero = (value) => {
    setFavoriteHero((prev) => {
      if (prev && prev.includes(value)) {
        return [...prev];
      } else {
        setIsHeroPresent((prev)=> [...prev,value?.id])
        return [...prev, value];
      }
    });
  };
  /**
   * Check if hero is already present in user's watchlist
   * @param {number} id - id of the selected hero
   * @returns {boolean} true if hero already exist else false
   */
  const checkIsHeroPresent = (id) => {
    return isHeroPresent?.includes(id) ? true : false;
  };
  /**
   * Removes selected hero from user's watchlist
   * @param {number} id 
   */
  const handleRemoveRecord = (id)=>{
    setFavoriteHero((prev)=> prev.filter(data=> data.id !== id));
    setIsHeroPresent((prev)=> prev.filter(data=> data !== id));
   }
  return (
    <HerosContext.Provider
      value={{
        favoriteHero,
        setFavoriteHero,
        addHero,
        checkIsHeroPresent,
        isHeroPresent,
        setIsHeroPresent,
        handleRemoveRecord
      }}
    >
      {children}
    </HerosContext.Provider>
  );
};

export { HerosContext, HerosProvider };
