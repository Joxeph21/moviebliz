import { createContext, useContext, useReducer, useEffect } from "react";

const UserAuthContext = createContext();

const getInitialState = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return {
    user: storedUser || {
      name: "",
      email: "",
      password: "",
      isAuthenticated: false,
      errorMessage: "",
      profileImage: "profile1.jpg",
    },
  };
};

function reducer(state, action) {
  switch (action.type) {
    case "REGISTER": {
      const { name, email, password } = action.payload;
      return {
        ...state,
        user: {
          name,
          email,
          password,
          isAuthenticated: true,
          errorMessage: "",
          profileImage: "profile1.jpg",
        },
      };
    }
    case "LOGIN": {
      const { username: name, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem(name));

      if (storedUser && storedUser.password === password) {
        return {
          ...state,
          user: { ...storedUser, isAuthenticated: true, errorMessage: "" },
        };
      } else {
        return {
          ...state,
          user: { ...state.user, errorMessage: "Invalid username or password" },
        };
      }
    }
    case "LOGOUT":
      return {
        ...state,
        user: {
          name: "",
          email: "",
          password: "",
          isAuthenticated: false,
          errorMessage: "",
          profileImage: "profile1.jpg",
        },
      };
    case "UPDATE_PROFILE_PICTURE":
      return {
        ...state,
        user: {
          ...state.user,
          profileImage: action.payload,
        },
      };
    case "UPDATE_USER_DETAILS":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    if (state.user.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  function Register(userDetails) {
    const { username: name, email, password } = userDetails;
    const userPayload = {
      name,
      email,
      password,
      isAuthenticated: true,
      profileImage: "profile1.jpg",
    };

    const existingUser = localStorage.getItem(name);
    if (existingUser) {
      alert("Username already exists");
      return;
    }

    localStorage.setItem(name, JSON.stringify(userPayload));
    dispatch({ type: "REGISTER", payload: userPayload });
  }

  function Login(userDetails) {
    dispatch({ type: "LOGIN", payload: userDetails });
  }

  function Logout() {
    if (state.user.name) {
      localStorage.removeItem(state.user.name);
      localStorage.removeItem("user");
    }

    dispatch({ type: "LOGOUT" });
  }

  function updateProfilePic(newImage) {
    dispatch({ type: "UPDATE_PROFILE_PICTURE", payload: newImage });
  }

  function updateUserDetails(updatedDetails) {
    dispatch({ type: "UPDATE_USER_DETAILS", payload: updatedDetails });
  }
  return (
    <UserAuthContext.Provider
      value={{
        user: state.user,
        Register,
        Login,
        Logout,
        updateProfilePic,
        updateUserDetails,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("Auth Context was used outside the Provider");
  return context;
}

export { AuthProvider, useAuth, UserAuthContext };
