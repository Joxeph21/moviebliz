import supabase from "./supabase";

//User Watchlist
export async function getWatchlist() {
  let { data, error } = await supabase.from("watchlist").select("*");

  if (error) {
    throw new Error("Watchlist could not be loaded");
  }
  return data;
}

export async function addtoWatchlistAPI(movie) {
  const { id, title, release_date, movie_data, poster_path } = movie;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data, error } = await supabase
    .from("watchlist")
    .insert([
      {
        user_id: userId,
        id,
        title: title,
        poster_path,
        release_date: release_date,
        movie_data: movie_data,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function removefromWatchlistAPI(id) {
  const { error } = await supabase.from("watchlist").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function clearWatchlistAPI() {
  const { error } = await supabase.from("watchlist").delete().neq("id", 0);
  if (error) throw new Error(error.message);
}

//User Favorites
export async function getFavorites() {
  let { data, error } = await supabase.from("favorites").select("*");

  if (error) {
    throw new Error("Favorites could not be loaded");
  }
  return data;
}
export async function addtoFavoritesAPI(movie) {
  const { id, title, release_date, movie_data, poster_path } = movie;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data, error } = await supabase
    .from("favorites")
    .insert([
      {
        user_id: userId,
        id,
        title: title,
        poster_path,
        release_date: release_date,
        movie_data: movie_data,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function removefromFavoritesAPI(id) {
  const { error } = await supabase.from("favorites").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function clearFavoritesAPI() {
  const { error } = await supabase.from("favorites").delete().neq("id", 0);
  if (error) throw new Error(error.message);
}

//User Lists
export async function getLists() {
  let { data, error } = await supabase.from("lists").select("*");

  if (error) {
    throw new Error("Lists could not be loaded");
  }
  return data;
}
export async function addtoListsAPI(movie) {
  const { id, title, release_date, movie_data, poster_path } = movie;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data, error } = await supabase
    .from("lists")
    .insert([
      {
        user_id: userId,
        id,
        title: title,
        poster_path,
        release_date: release_date,
        movie_data: movie_data,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function removefromListAPI(id) {
  const { error } = await supabase.from("lists").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function clearListsAPI() {
  const { error } = await supabase.from("lists").delete().neq("id", 0);
  if (error) throw new Error(error.message);
}
export async function getReviews() {
  let { data, error } = await supabase.from("reviews").select("*");

  if (error) throw new Error("Reviews could not be Loaded");
  return data;
}

export async function addReviewAPI(review) {
  const { starRating, reviewText, movie } = review;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const username = user?.user_metadata?.username;

  if (!userId || !username) {
    throw new Error("User must be logged in");
  }


  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        user_id: userId,
        username,
        starRating,
        reviewText,
        movie,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}
