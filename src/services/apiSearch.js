import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiURL = import.meta.env.VITE_APP_API_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

// export async function searchMoviesandTv({ query, page = 1 }) {
//   try {
//     const movie = await axios.get(`${apiURL}search/movie`, {
//       headers: options.headers,
//       method: options.method,
//       params: {
//         query,
//         page,
//         api_key: apiKey,
//         language: "en-US",
//       },
//     });

//     const tv = await axios.get(`${apiURL}search/tv`, {
//       headers: options.headers,
//       method: options.method,
//       params: {
//         query,
//         page,
//         api_key: apiKey,
//         language: "en-US",
//       },
//     });

//     // Combine the results
//     const combinedData = {
//       ...movie.data,
//       ...tv.data,
//       results: [...tv.data.results, ...movie.data.results],
//     };

//     return { data: combinedData, error: null };
//   } catch (err) {
//     console.error(err.message);
//     return { data: null, error: err };
//   }
// }
export async function searchMoviesandTv({ query, page = 1 }) {
  try {
    const movie = await axios.get(`${apiURL}search/multi`, {
      headers: options.headers,
      method: options.method,
      params: {
        query,
        page,
        api_key: apiKey,
        language: "en-US",
      },
    });

    return { data: movie.data, error: null };
  } catch (err) {
    console.error(err.message);
    return { data: null, error: err };
  }
}
