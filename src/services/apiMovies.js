import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiURL = import.meta.env.VITE_APP_API_URL;

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

export async function fetchMovies({ filter = "popular", page = 1 }) {
  try {
    const response = await axios.get(`${apiURL}movie/${filter}`, {
      headers: options.headers,
      params: {
        page,
        api_key: apiKey,
        language: "en-US",
      },
    });
    return { data: response?.data?.results, error: null };
  } catch (err) {
    console.log(err.message);
    return { data: null, error: err.message };
  }
}

export async function getMovie(id) {
  try {
    const response = await axios.get(`${apiURL}movie/${id}`, {
      headers: options.headers,
      params: {
        api_key: apiKey,
        language: "en-US",
        append_to_response: "release_dates,credits,reviews,recommendations,videos,similar",
      },
    });
    return { data: response.data, error: null };
  } catch (err) {
    console.log(err.message);
    return { data: null, error: err.message };
  }
}

export async function getTrendingMovies() {
  try {
    const response = await axios.get(`${apiURL}trending/movie/week`, {
      headers: options.headers,
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });

    const movies = response.data.results;

    const moviesWithOfficialTrailer = await Promise.all(
      movies.map(async (movie) => {
        const videoResponse = await axios.get(
          `${apiURL}movie/${movie.id}/videos`,
          {
            headers: options.headers,
            params: {
              api_key: apiKey,
              language: "en-US",
            },
          },
        );

        const officialTrailer = videoResponse.data.results.find((video) =>
          video.name.toLowerCase().includes("official trailer"),
        );

        return {
          ...movie,
          officialTrailer,
        };
      }),
    );

    return { data: moviesWithOfficialTrailer, error: null };
  } catch (err) {
    console.error("Error fetching trending movies:", err.message);
    return { data: null, error: err };
  }
}

export async function discoverMovies() {
  try {
    const response = await axios.get(`${apiURL}discover/movie`, {
      headers: options.headers,
      params: {
        api_key: apiKey,
        language: "en-us",
        with_watch_providers: 8,
        watch_region: "US",
      },
    });

    return { data: response.data.results, error: null };
  } catch (err) {
    console.log(err.message);
    return { data: null, error: err.message };
  }
}
