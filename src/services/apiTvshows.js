import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiURL = import.meta.env.VITE_APP_API_URL;

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

export async function fetchTv({ filter = "popular", page = 1 }) {
  try {
    const response = await axios.get(`${apiURL}tv/${filter}`, {
      params: {
        api_key: apiKey,
        page,
      },
    });

    return {
      data: {
        response: response.data.results,
        nextPage: page + 1,
        totalPages: response.data.total_pages,
      },
      error: null,
    };
  } catch (err) {
    console.error(err.message);
    return { data: null, error: err };
  }
}

export async function getTv(id) {
  try {
    const response = await axios.get(`${apiURL}tv/${id}`, {
      headers: options.headers,
      params: {
        api_key: apiKey,
        language: "en-US",
        append_to_response:
          "content_ratings,credits,reviews,recommendations,videos,similar",
      },
    });
    return { data: response?.data, error: null };
  } catch (err) {
    console.log(err.message);
    return { data: null, error: err.message };
  }
}

export async function getTrendingTv() {
  try {
    const response = await axios.get(`${apiURL}trending/tv/week`, {
      headers: options.headers,
      params: {
        api_key: apiKey,
        language: "en-us",
      },
    });

    return response?.data?.results;
  } catch (err) {
    console.log(err?.message);
  }
}

export async function discoverTv() {
  try {
    const response = await axios.get(`${apiURL}discover/tv`, {
      headers: options.headers,
      params: {
        api_key: apiKey,
        language: "en-us",
        with_watch_providers: 8,
        watch_region: "US",
      },
    });

    return { data: response?.data?.results, error: null };
  } catch (err) {
    console.log(err.message);
    return { data: null, error: err };
  }
}
