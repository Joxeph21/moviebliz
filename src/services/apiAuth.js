import supabase from "./supabase";

export async function signUpUser({ username, email, password }) {
  try {
    const { data: existingUser, error: checkError } = await supabase
      .from("user_profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      throw new Error(`Error checking username: ${checkError.message}`);
    }

    if (existingUser) {
      throw new Error(
        "Username already exists. Please choose a different username.",
      );
    }

    const val = Math.floor(Math.random() * 10) + 1;
    const avatarUrl = `https://vfzdiqevbnahvqigtnvl.supabase.co/storage/v1/object/public/Profile%20Pictures/profile${val}.jpg`;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar: avatarUrl,
        },
      },
    });

    if (authError) throw new Error(authError.message);

    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        user_id: authData.user.id,
        email,
        username,
        avatar: avatarUrl,
      });

    if (profileError) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error(profileError.message);
    }

    return authData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginApp({ identifier, password }) {
  let email;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(identifier)) {
    email = identifier;
  } else {
    const { data: userProfile, error: userProfileError } = await supabase
      .from("user_profiles")
      .select("email")
      .eq("username", identifier)
      .single();

    if (userProfileError || !userProfile) {
      throw new Error("Invalid Username or Password");
    }

    email = userProfile.email;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);

    const user = userData?.user;
    if (!user) return null;

    const { data: profileData, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) {
      throw new Error(profileError.message);
    }

    return {
      ...user,
      profile: profileData,
    };
  } catch (error) {
    console.log(error)
    return error.message;
  }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ username, avatar }) {
  let updateData = {};

  if (username) {
    updateData = { ...updateData, data: { username } };
  }

  const { data: authData, error: authError } =
    await supabase.auth.updateUser(updateData);
  if (authError) throw new Error(authError.message);

  if (avatar) {
    const fileType = avatar.type;
    const fileExtension = fileType.split("/")[1];
    const fileName = `avatar-${authData.user.id}-${Date.now()}.${fileExtension}`;

    const { error: storageError } = await supabase.storage
      .from("Profile Pictures")
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("Profile Pictures")
      .getPublicUrl(fileName);

    if (publicUrlError) throw new Error(publicUrlError.message);

    const avatarUrl = publicUrlData.publicUrl;

    if (!avatarUrl) throw new Error("Failed to get public URL for the avatar.");

    const { error: updateAuthError } = await supabase.auth.updateUser({
      data: {
        avatar: avatarUrl,
      },
    });

    if (updateAuthError) throw new Error(updateAuthError.message);

    const { error: profileError } = await supabase
      .from("user_profiles")
      .update({ username, avatar: avatarUrl })
      .eq("user_id", authData.user.id);

    if (profileError) throw new Error(profileError.message);
  } else {
    const { error: profileError } = await supabase
      .from("user_profiles")
      .update({ username })
      .eq("user_id", authData.user.id);

    if (profileError) throw new Error(profileError.message);
  }

  return authData;
}
