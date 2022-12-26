export const createPostsSlice = (set) => ({
  posts: [
    {
      postId: Math.random(19).toString(),
      userName: "quotes",
      name: "Quotes",
      type: "text",
      repost: {
        isRepost: true,
        repostedBy: "farhan",
        repostedAt: "2022-11-04T13:54:55+00:00",
      },
      posts: [],
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: false,
    },
    {
      postId: Math.random(19).toString(),
      userName: "quotes",
      name: "Quotes",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          height: 600,
          width: 1200,
          type: "photo",
          url: "https://images.unsplash.com/photo-1671762672531-98470ef359e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
        },
      ],
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      userName: "quotes",
      name: "Quotes",
      type: "text",
      repost: {
        isRepost: true,
        repostedBy: "farhan",
        repostedAt: "2022-11-04T13:54:55+00:00",
      },
      posts: [],
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new er who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: false,
    },
    {
      postId: Math.random(19).toString(),
      userName: "quotes",
      name: "Quotes",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          height: 1200,
          width: 1200,
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
        },
      ],
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      userName: "quotes",
      name: "Quotes",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          height: 800,
          width: 1600,
          type: "photo",
          url: "https://images.unsplash.com/photo-1672002759660-93f177240b60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
        },
      ],
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      userName: "quotes",
      name: "Quotes",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          height: 1600,
          width: 500,
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-pink-and-blue-ink-1192-large.mp4",
        },
      ],
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      userName: "quotes",
      name: "Quotes",
      type: "text",
      repost: {
        isRepost: true,
        repostedBy: "farhan",
        repostedAt: "2022-11-04T13:54:55+00:00",
      },
      posts: [],
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: false,
    },
    // {
    //   postId: "991293kjdafA",
    //   userName: "quotes",
    //   name: "Quotes",
    //   isReposted: false,
    //   repost: {
    //     isRepost: false,
    //   },
    //   profile_url:
    //     "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "poasdstwqe123",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/14758717/pexels-photo-14758717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //   ],
    //   caption: "In love with the fog. #fog @farhan https://www.momenel.com/",
    //   createdAt: Date.now(),
    //   likes: 300,
    //   comments: 12,
    //   reposts: 5,
    //   lastEdit: null,
    //   isLiked: false,
    //   isSaved: true,
    //   isDonateable: true,
    // },
    // {
    //   postId: "qws123ad09weq",
    //   userName: "farhan",
    //   name: "farhan haider",
    //   isReposted: false,
    //   repost: {
    //     isRepost: false,
    //   },
    //   profile_url:
    //     "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "poasdstwqe123",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: "poasdst123",
    //       type: "photo",
    //       url: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    //     },
    //   ],
    //   caption:
    //     "Some of my recent photos.\nWhat do you think? @farhan\nComment below ☺️\n#photo",
    //   createdAt: Date.now(),
    //   likes: 300,
    //   comments: 12,
    //   reposts: 5,
    //   lastEdit: null,
    //   isLiked: false,
    //   isSaved: true,
    //   isDonateable: false,
    // },
    // {
    //   postId: "asd2324211112311",
    //   userName: "betzy",
    //   repost: {
    //     isRepost: false,
    //   },
    //   name: "Betzabeth's diary",
    //   profile_url:
    //     "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     // {
    //     //   id: "81cvx27893",
    //     //   type: "video",
    //     //   url: "https://res.cloudinary.com/dflked2ws/video/upload/v1670687293/jet_fcsz3o.mov",
    //     // },
    //     {
    //       id: "post1435qwe2348",
    //       type: "photo",
    //       url: "https://images.unsplash.com/photo-1667922096074-d4299278f37a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    //     },
    //     {
    //       id: "post1qwe122320048",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/7582107/pexels-photo-7582107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //   ],
    //   caption: "🤯 🤯 🤯 🤯 🤯",
    //   createdAt: Date.now() - 100000,
    //   likes: 999941,
    //   comments: 10100,
    //   reposts: 0,
    //   isReposted: false,
    //   lastEdit: null,
    //   isSaved: false,
    //   isLiked: true,
    //   isDonateable: true,
    // },
    // {
    //   postId: "001823",
    //   userName: "memes_19",
    //   repost: {
    //     isRepost: true,
    //     repostedBy: "farhanverse",
    //     repostedAt: "2022-11-04T13:54:55+00:00",
    //   },
    //   profile_url:
    //     "https://images.pexels.com/photos/160472/doll-boy-cheeky-toys-160472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "81cvx27893",
    //       type: "video",
    //       url: "https://res.cloudinary.com/dflked2ws/video/upload/v1670687245/funny_code_dgceit.mp4",
    //     },
    //   ],
    //   caption: "Coding 1 month vs 1 year 😹 \n #coding #meme @farhan",
    //   createdAt: Date.now() - 515000,
    //   likes: 999941,
    //   comments: 10100,
    //   reposts: 0,
    //   isReposted: false,
    //   lastEdit: null,
    //   isSaved: false,
    //   isLiked: true,
    // },
    // {
    //   postId: "7713ars",
    //   userName: "Marvel",
    //   repost: {
    //     isRepost: false,
    //   },
    //   name: "Marvel",
    //   profile_url:
    //     "https://i.pinimg.com/originals/b5/de/08/b5de08b9050e254b008dcc13d28ac42e.jpg",
    //   posts: [
    //     // {
    //     //   id: "81cvx27893",
    //     //   type: "video",
    //     //   url: "https://res.cloudinary.com/dflked2ws/video/upload/v1670686630/avengers_k2uzpz.mp4",
    //     // },
    //     {
    //       id: "post1435qwe2348",
    //       type: "photo",
    //       url: "https://images.unsplash.com/photo-1667922096074-d4299278f37a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    //     },
    //     {
    //       id: "post1qwe122320048",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/7582107/pexels-photo-7582107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //   ],
    //   caption: "",
    //   createdAt: Date.now() - 400000,
    //   likes: 999941,
    //   comments: 10100,
    //   reposts: 0,
    //   isReposted: false,
    //   lastEdit: null,
    //   isSaved: false,
    //   isLiked: true,
    //   isDonateable: true,
    // },

    // {
    //   postId: "asd2211112311",
    //   userName: "ialls",
    //   repost: {
    //     isRepost: false,
    //   },
    //   name: "farhan haider",
    //   profile_url:
    //     "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "8127893",
    //       type: "video",
    //       url: "https://assets.mixkit.co/videos/preview/mixkit-view-of-the-horizon-in-the-sea-while-a-sailboat-4477-large.mp4",
    //     },
    //     // {
    //     //   id: "812781293",
    //     //   type: "video",
    //     //   url: "https://res.cloudinary.com/momenalsite/video/upload/v1668275080/test/mixkit-man-from-behind-playing-online-on-a-pc-43533_kc4x15.mp4",
    //     // },
    //     {
    //       id: "post1qwe2348",
    //       type: "photo",
    //       url: "https://images.unsplash.com/photo-1667922096074-d4299278f37a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    //     },
    //     {
    //       id: "post1qwe2320048",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/7582107/pexels-photo-7582107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //   ],
    //   caption: "",
    //   createdAt: "2022-11-02T14:48:51+00:00",
    //   likes: 999941,
    //   comments: 10100,
    //   reposts: 0,
    //   isReposted: false,
    //   lastEdit: null,
    //   isSaved: false,
    //   isLiked: true,
    //   isDonateable: false,
    // },
    // {
    //   postId: "asd2211",
    //   userName: "farhanverse",
    //   repost: {
    //     isRepost: false,
    //   },
    //   name: "farhan haider",
    //   profile_url:
    //     "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "post121112348",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/9454915/pexels-photo-9454915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //     {
    //       id: "812781293",
    //       type: "video",
    //       url: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    //     },
    //     {
    //       id: "post1234",
    //       type: "photo",
    //       url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    //     },
    //     {
    //       id: "post12234",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/10643964/pexels-photo-10643964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //   ],
    //   caption: "",
    //   createdAt: "2022-11-02T14:48:51+00:00",
    //   likes: 999941,
    //   comments: 10100,
    //   reposts: 0,
    //   isReposted: false,
    //   lastEdit: null,
    //   isSaved: false,
    //   isLiked: false,
    //   isDonateable: true,
    // },
    // {
    //   postId: "qw09weq",
    //   isReposted: true, //is reposted by the user themselves?
    //   likedByUser: true,
    //   repost: {
    //     isRepost: true,
    //     repostedBy: "Betzi",
    //     repostedAt: "2022-11-04T13:54:55+00:00",
    //   },
    //   userName: "another123llt45",
    //   name: "kal jack",
    //   profile_url:
    //     "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "poasdst123",
    //       type: "photo",
    //       url: "https://images.pexels.com/photos/3394168/pexels-photo-3394168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //   ],
    //   caption:
    //     "No #matter #love where you are in the world, we are all in this together. Let's change this world by being the change. #privacy @elon",
    //   createdAt: "2022-11-04T13:54:55+00:00",
    //   likes: 999899,
    //   comments: 999899,
    //   lastEdit: null,
    //   isLiked: true,
    //   isSaved: true,
    //   reposts: 999899,
    //   isDonateable: true,
    // },

    // {
    //   postId: "31234jjak",
    //   userName: "farhanverse",
    //   name: "Farhan Haider",
    //   isReposted: false,
    //   repost: {
    //     isRepost: false,
    //   },
    //   profile_url:
    //     "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "post123",
    //       type: "video",
    //       url: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-neon-light-1238-large.mp4",
    //     },
    //     // {
    //     //    id: "post123",
    //     //   type: "video",
    //     //   url: "https://",
    //     // },
    //   ],
    //   caption: "hi there @farhan #freedom",
    //   createdAt: "2022-11-04T13:54:55+00:00",
    //   likes: 300,
    //   comments: 12,
    //   reposts: 5,
    //   lastEdit: null,
    //   isLiked: false,
    //   isSaved: true,
    // },

    // {
    //   postId: "djlkdsajf",
    //   userName: "betzyy199",
    //   name: "Betzabeth",
    //   isReposted: false,
    //   repost: {
    //     isRepost: false,
    //   },
    //   profile_url:
    //     "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   posts: [
    //     {
    //       id: "post12348",
    //       type: "video",
    //       url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
    //     },
    //     {
    //       id: "post1234",
    //       type: "photo",
    //       url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    //     },
    //   ],
    //   caption: "hi there @farhan #freedom",
    //   hashtags: ["freedom"],
    //   mentions: ["farhan"],
    //   createdAt: "2022-11-02T14:48:51+00:00",
    //   likes: 300,
    //   comments: 12,
    //   reposts: 5,
    //   isLiked: false,
    //   lastEdit: null,
    //   isSaved: false,
    //   isDonateable: true,
    // },
  ],
  handleLike: async (index) => {
    try {
      console.log("like? ", index);
      // repost: {
      //   isRepost: false,
      // },
      set((state) => {
        const newPosts = [...state.posts];
        // console.log("repost", newPosts[index].isReposted);
        newPosts[index].isLiked = !newPosts[index].isLiked;
        return { posts: newPosts };
      });
    } catch (err) {}
  },
  handleRepost: async (index) => {
    try {
      console.log("repost", index);
      // repost: {
      //   isRepost: false,
      // },
      set((state) => {
        const newPosts = [...state.posts];
        // console.log("repost", newPosts[index].isReposted);
        newPosts[index].isReposted = !newPosts[index].isReposted;
        return { posts: newPosts };
      });
    } catch (err) {}
  },
  SavePost: async (index) => {
    try {
      console.log("slice: save post");
      //todo send req to save post
      set((state) => {
        const newPosts = [...state.posts];
        newPosts[index].isSaved = !newPosts[index].isSaved;

        return { posts: newPosts };
      });
    } catch (err) {}
  },
  fetchMorePosts: async () => {
    try {
      console.log("called more post");
      const newst = [
        {
          postId: Math.random(32).toString(),
          userName: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 1900,
              width: 800,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-matrushka-32647-large.mp4",
            },
            {
              id: Math.random(20).toString(),
              height: 1233,
              width: 1233,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-girl-with-hallowween-mask-dancing-close-to-the-lens-42216-large.mp4",
            },
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            },
          ],
          caption: "hi there @farhan #freedom",
          hashtags: ["freedom"],
          mentions: ["farhan"],
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 300,
          comments: 12,
          reposts: 5,
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          userName: "quotes",
          name: "Quotes",
          type: "text",
          repost: {
            isRepost: true,
            repostedBy: "farhan",
            repostedAt: "2022-11-04T13:54:55+00:00",
          },
          posts: [],
          profile_url:
            "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          caption:
            "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new er who watched in amazement.",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          isReposted: true, // if the user himself has reposted the post
          isSaved: true,
          isDonateable: false,
        },

        {
          postId: Math.random(19).toString(),
          userName: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
        {
          postId: Math.random(32).toString(),
          userName: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
            },
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            },
          ],
          caption: "hi there @farhan #freedom",
          hashtags: ["freedom"],
          mentions: ["farhan"],
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 300,
          comments: 12,
          reposts: 5,
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          userName: "quotes",
          name: "Quotes",
          type: "text",
          repost: {
            isRepost: true,
            repostedBy: "farhan",
            repostedAt: "2022-11-04T13:54:55+00:00",
          },
          posts: [],
          profile_url:
            "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          caption:
            "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone very time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new er who watched in amazement.",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          isReposted: true, // if the user himself has reposted the post
          isSaved: true,
          isDonateable: false,
        },
        {
          postId: Math.random(19).toString(),
          userName: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
        {
          postId: Math.random(32).toString(),
          userName: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
            },
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            },
          ],
          caption: "hi there @farhan #freedom",
          hashtags: ["freedom"],
          mentions: ["farhan"],
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 300,
          comments: 12,
          reposts: 5,
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          userName: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
        {
          postId: Math.random(32).toString(),
          userName: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
            },
            {
              id: Math.random(20).toString(),
              type: "photo",
              url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            },
          ],
          caption: "hi there @farhan #freedom",
          hashtags: ["freedom"],
          mentions: ["farhan"],
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 300,
          comments: 12,
          reposts: 5,
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          userName: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
      ];

      set((state) => ({
        posts: [...state.posts, ...newst],
      }));
    } catch (err) {}
  },
});
