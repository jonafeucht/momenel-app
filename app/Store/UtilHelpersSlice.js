import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

export const createUtilHelperSlice = (set, get) => ({
  handleTip: async (postId, postType, amount) => {
    try {
      console.log("tipping post", postId, postType, amount);
      // todo: const response = await axios.post(`/api/posts/${postId}/tip`, {
      return true;
    } catch (err) {
      console.error(err);
    }
  },
  handleCreatePost: async ({ posts, caption, parts }) => {
    try {
      // supabase.auth.getSession().then(({ data: { session } }) => {
      //   console.log("session: ", session.access_token);
      // });

      // console.log("posts: ", posts);
      let formData = new FormData();
      let dimensions = [];
      formData.append("userId", get().username);
      formData.append("caption", caption);
      // formData.append("parts", parts);
      formData.append("parts", JSON.stringify(parts));

      posts.map((post) => {
        // console.log("post: ", post);
        dimensions.push({
          width: post.width,
          height: post.height,
        });
        formData.append("content", {
          uri: post.uri,
          type: post.type,
          name: post.fileName,
        });
      });
      formData.append("dimensions", JSON.stringify(dimensions));
      let res = false;
      await fetch("http://192.168.0.14:8000/posts/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `lkasjflajsdf`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          } else return response.json();
        })
        .then((response) => {
          // console.log("response: ", response.status);
          // console.log("response: ", response);
          res = true;
        })
        .catch((err) => {
          Alert.alert("Error", "Something went wrong");
          res = false;
        });

      return res;
    } catch (err) {
      return false;
    }
  },
  handleReport: async (id, contentId, contentType, comments) => {
    try {
      console.log("slice: report post");
      console.log("id: ", id);
      console.log("comments: ", comments);
      console.log("contentId: ", contentId);
      console.log("contentType ", contentType);
      //todo send req to report post
      //todo if error then show alert

      return true;
    } catch (err) {}
  },
});
