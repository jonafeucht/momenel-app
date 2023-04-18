import { supabase } from "../lib/supabase";

export const createUserSlice = (set, get) => ({
  userId: null,
  username: "farhanverse",
  profile_url:
    "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  loading: false,
  hasErrors: false,

  SetUserId: async (userId) => {
    try {
      set(() => ({
        userId: userId,
      }));
    } catch (err) {
      supabase.auth.signOut();
    }
  },
  SetUserData: async (username, profile_url, preview_url) => {
    set(() => ({ loading: true }));
    try {
      set(() => ({
        username: username,
        profile_url: profile_url,
        preview_url: preview_url,
        loading: false,
        hasErrors: false,
      }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
});
