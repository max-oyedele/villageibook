import { useState, useEffect } from "react";

import { posts } from "data/browse";
import { articles, personalities, institutions, videos } from "data/village";

const UseVillageStats = (villageName) => {
  const [nPosts, setNPosts] = useState(0);
  const [nArticles, setNArticles] = useState(0);
  const [nPersonalities, setNPersonalities] = useState(0);
  const [nInstitutions, setNInstitutions] = useState(0);
  const [nVideos, setNVideos] = useState(0);

  useEffect(() => {
    setNPosts(posts.filter((item) => item.village === villageName).length);
    setNArticles(
      articles.filter((item) => item.village === villageName).length
    );
    setNPersonalities(
      personalities.filter((item) => item.village === villageName).length
    );
    setNInstitutions(
      institutions.filter((item) => item.village === villageName).length
    );
    setNVideos(videos.filter((item) => item.village === villageName).length);
  }, []);

  return {
    villageStats: {
      posts: nPosts,
      articles: nArticles,
      personalities: nPersonalities,
      institutions: nInstitutions,
      videos: nVideos,
    }
  };
};

export default UseVillageStats;
