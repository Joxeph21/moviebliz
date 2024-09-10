import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Tvshows from "./pages/Tvshows";
import Movies from "./pages/Movies";
import Watchlist from "./pages/Watchlist";
import PageNotFound from "./pages/PageNotFound";
import Search from "./pages/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MovieInfo from "./pages/MovieInfo";
import TvShowInfo from "./pages/TvShowInfo";
import Signup from "./pages/Signup";
import { UserDataProvider } from "./contexts/userDataContext";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material";
import People from "./pages/People";
import Accounts from "./pages/Accounts";
import Favorites from "./pages/Favorites";
import Lists from "./pages/Lists";
import UserLayout from "./components/UserLayout";
import { AuthProvider } from "./contexts/userAuthContext";
import Browse from "./pages/Browse";
import { useLayoutEffect } from "react";
import Videos from "./pages/Videos";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#0c0c0c", // Tooltip background color
          color: "#fff", // Tooltip text color
        },
        arrow: {
          color: "#0c0c0c", // Arrow color (must match background color)
        },
      },
    },
  },
  palette: {
    green: {
      main: "#3EE22E",
      light: "#4bf23c",
      dark: "#1e8b14",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserDataProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Wrapper>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/create-account" element={<Signup />} />
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tv-shows" element={<Tvshows />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movie" element={<Navigate to="/movies" />} />
                    <Route path="/movie/:id" element={<MovieInfo />} />
                    <Route path="/movie/:id/videos" element={<Videos />} />
                    <Route path="/browse/:section" element={<Browse />} />
                    <Route path="/tv/:id" element={<TvShowInfo />} />
                    <Route path="/tv/:id/videos" element={<Videos />} />
                    <Route path="/tv" element={<Navigate to="/tv-shows" />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="/people/:id" element={<People />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/user" element={<UserLayout />}>
                      <Route path="" element={<Accounts />} />
                      <Route path="lists" element={<Lists />} />

                      <Route path="favorites" element={<Favorites />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Wrapper>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
            <Analytics />

            <ToastContainer />
          </ThemeProvider>
        </UserDataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
