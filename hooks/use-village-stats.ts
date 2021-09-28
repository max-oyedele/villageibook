import { useState, useEffect } from "react";

import { articles, users, institutions, personalities, videos } from "data/village";

const UseVillageStats = (villageName) => {
  const [nUsers, setNUsers] = useState(0);
  const [nArticles, setNArticles] = useState(0);
  const [nInstitutions, setNInstitutions] = useState(0);
  const [nPersonalities, setNPersonalities] = useState(0);
  const [nVideos, setNVideos] = useState(0);

  useEffect(() => {
    setNUsers(
      users.filter((item) => item.village === villageName).length
    );
    setNArticles(
      articles.filter((item) => item.village === villageName).length
    );
    setNInstitutions(
      institutions.filter((item) => item.village === villageName).length
    );
    setNPersonalities(
      personalities.filter((item) => item.village === villageName).length
    );
    setNVideos(videos.filter((item) => item.village === villageName).length);
  }, [villageName]);

  return {
    villageStats: {
      users: nUsers,
      articles: nArticles,
      institutions: nInstitutions,
      personalities: nPersonalities,
      videos: nVideos,
    }
  };
};

export default UseVillageStats;
