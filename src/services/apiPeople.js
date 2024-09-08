import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiURL = import.meta.env.VITE_APP_API_URL;

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
}

export async function getPerson(id) {
    try {
      const response = await axios.get(`${apiURL}person/${id}`, {
        headers: options.headers,
        params: {
          api_key: apiKey,
          language: "en-US",
          append_to_response: "combined_credits,reviews,recommendations,videos,similar,movie_credits,tv_credits?",
        },
      });
      return { data: response.data, error: null };
    } catch (err) {
      console.log(err.message);
      return { data: null, error: err.response };
    }
  }