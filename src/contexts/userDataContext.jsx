import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./userAuthContext";

const userDataContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    // Watchlist actions
    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchlistArray: [...state.watchlistArray, action.payload],
      };

    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlistArray: state.watchlistArray.filter(
          (item) => item?.id !== action.payload,
        ),
      };

    case "CLEAR_WATCHLIST":
      return {
        ...state,
        watchlistArray: [],
      };

    // Lists actions
    case "ADD_TO_LIST":
      return {
        ...state,
        listsArray: [...state.listsArray, action.payload],
      };

    case "REMOVE_FROM_LIST":
      return {
        ...state,
        listsArray: state.listsArray.filter(
          (item) => item?.id !== action.payload,
        ),
      };

    case "CLEAR_LIST":
      return {
        ...state,
        listsArray: [],
      };

    // Favorites actions
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favoritesArray: [...state.favoritesArray, action.payload],
      };

    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favoritesArray: state.favoritesArray.filter(
          (item) => item?.id !== action.payload,
        ),
      };

    case "CLEAR_FAVORITES":
      return {
        ...state,
        favoritesArray: [],
      };

    // Reviews actions
    case "ADD_REVIEW":
      return {
        ...state,
        reviewsArray: [...state.reviewsArray, action.payload],
      };

    case "REMOVE_REVIEW":
      return {
        ...state,
        reviewsArray: state.reviewsArray.filter(
          (review) => review?.id !== action.payload,
        ),
      };

    case "CLEAR_REVIEWS":
      return {
        ...state,
        reviewsArray: [],
      };

    case "EDIT_REVIEW":
      return {
        ...state,
        reviewsArray: state.reviewsArray.map((review) =>
          review?.id === action.payload.id
            ? { ...review, ...action.payload.updatedData }
            : review,
        ),
      };

    // Favorite Genres actions
    case "ADD_FAVORITE_GENRE":
      return {
        ...state,
        favoriteGenresArray: [...state.favoriteGenresArray, action.payload],
      };

    case "REMOVE_FAVORITE_GENRE":
      return {
        ...state,
        favoriteGenresArray: state.favoriteGenresArray.filter(
          (genre) => genre !== action.payload,
        ),
      };

    case "CLEAR_FAVORITE_GENRES":
      return {
        ...state,
        favoriteGenresArray: [],
      };

    default:
      throw new Error("Unknown Action");
  }
}

function UserDataProvider({ children }) {
  const { user: username } = useAuth();
  const user = username?.name || "GUEST";

  const savedUserData = JSON.parse(localStorage.getItem(user)) || {};

  const [state, dispatch] = useReducer(reducer, {
    watchlistArray: savedUserData.watchlist || [],
    listsArray: savedUserData.lists || [],
    favoritesArray: savedUserData.favorites || [],
    reviewsArray: savedUserData.reviews || [],
    favoriteGenresArray: savedUserData.favoriteGenres || [],  
  });

  const {
    watchlistArray,
    listsArray,
    favoritesArray,
    reviewsArray,
    favoriteGenresArray,
  } = state;

  useEffect(() => {
    const userSession = {
      watchlist: watchlistArray,
      lists: listsArray,
      favorites: favoritesArray,
      reviews: reviewsArray,
      favoriteGenres: favoriteGenresArray,  
    };

    localStorage.setItem(user, JSON.stringify(userSession));
  }, [user, watchlistArray, listsArray, favoritesArray, reviewsArray, favoriteGenresArray]);

  // Watchlist functions
  function Add_To_Watchlist(movie) {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  }

  function Remove_From_Watchlist(id) {
    dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: id });
  }

  function Clear_Watchlist() {
    dispatch({ type: "CLEAR_WATCHLIST" });
  }

  // List functions
  function Add_To_list(movie) {
    dispatch({ type: "ADD_TO_LIST", payload: movie });
  }

  function Remove_From_list(id) {
    dispatch({ type: "REMOVE_FROM_LIST", payload: id });
  }

  function ClearList() {
    dispatch({ type: "CLEAR_LIST" });
  }

  // Favorites functions
  function Add_To_favorites(movie) {
    dispatch({ type: "ADD_TO_FAVORITES", payload: movie });
  }

  function Remove_From_favorites(id) {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: id });
  }

  function ClearFavorites() {
    dispatch({ type: "CLEAR_FAVORITES" });
  }

  // Reviews functions
  function Add_Review(review) {
    dispatch({ type: "ADD_REVIEW", payload: review });
  }

  function Remove_Review(id) {
    dispatch({ type: "REMOVE_REVIEW", payload: id });
  }

  function Clear_Reviews() {
    dispatch({ type: "CLEAR_REVIEWS" });
  }

  function Edit_Review(id, updatedData) {
    dispatch({ type: "EDIT_REVIEW", payload: { id, updatedData } });
  }

  // Favorite Genres functions
  function Add_Favorite_Genre(genre) {
    dispatch({ type: "ADD_FAVORITE_GENRE", payload: genre });
  }

  function Remove_Favorite_Genre(genre) {
    dispatch({ type: "REMOVE_FAVORITE_GENRE", payload: genre });
  }

  function Clear_Favorite_Genres() {
    dispatch({ type: "CLEAR_FAVORITE_GENRES" });
  }

  return (
    <userDataContext.Provider
      value={{
        watchlistArray,
        listsArray,
        favoritesArray,
        reviewsArray,
        favoriteGenresArray,  
        Add_To_Watchlist,
        Remove_From_Watchlist,
        Clear_Watchlist,
        Add_To_list,
        Remove_From_list,
        ClearList,
        Add_To_favorites,
        Remove_From_favorites,
        ClearFavorites,
        Remove_Review,
        Clear_Reviews,
        Add_Review,
        Edit_Review,
        Add_Favorite_Genre,
        Remove_Favorite_Genre,
        Clear_Favorite_Genres,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

function useUserData() {
  const context = useContext(userDataContext);
  if (!context) throw new Error("Context used outside of the provider");
  return context;
}

export { useUserData, UserDataProvider };
