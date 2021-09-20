import { useState, useEffect } from "react";

import { posts } from "data/browse";
import { articles, personalities, institutions, videos } from "data/village";

const UseVillageData = (villageName) => {
  const [vPosts, setVPosts] = useState([]);
  const [vArticles, setVArticles] = useState([]);
  const [vPersonalities, setVPersonalities] = useState([]);
  const [vInstitutions, setVInstitutions] = useState([]);
  const [vVideos, setVVideos] = useState([]);

  useEffect(() => {
    setVPosts(posts.filter((item) => item.village === villageName));
    setVArticles(articles.filter((item) => item.village === villageName));
    setVPersonalities(
      personalities.filter((item) => item.village === villageName)
    );
    setVInstitutions(
      institutions.filter((item) => item.village === villageName)
    );
    setVVideos(videos.filter((item) => item.village === villageName));
  }, []);

  return {
    villageData: {
      posts: vPosts,
      articles: vArticles,
      personalities: vPersonalities,
      institutions: vInstitutions,
      videos: vVideos,
    },
  };
};

export default UseVillageData;
