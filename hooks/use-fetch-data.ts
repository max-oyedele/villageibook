import { useSelector } from "react-redux";
import { OurStore } from "rdx/store";

const useFetchData = () => {
  const {
    jwt,
    me: signupMe,
    status: authStatus,
    error: authError,
  } = useSelector((state: OurStore) => state.authReducer);
  const {
    me,
    step,
    status: accountStatus,
    error: accountError,
  } = useSelector((state: OurStore) => state.accountReducer);

  const {
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    degrees
  } = useSelector((state: OurStore) => state.commonReducer);

  const { status: feedPageStatus, postStatus, posts, recentVillages, recentUsers } = useSelector((state: OurStore) => state.feedPageReducer);
  const {
    status: villagePageStatus,
    village,
    villageUsers,    
    villageStories,
    villagePersonalities,
    villageInstitutions,
    villageVideos,
    villagePhotos,
  } = useSelector((state: OurStore) => state.villagePageReducer);
  const { status: graduatePageStatus, graduateStats } = useSelector((state: OurStore) => state.graduatePageReducer)

  const { status: viewPageStatus, user, userError, story, storyError, personality, personalityError, institution, institutionError } = useSelector((state: OurStore) => state.viewPageReducer);

  const {
    session
  } = useSelector((state: OurStore) => state.checkoutSessionReducer);
  
  return {
    jwt,
    signupMe,
    authStatus,
    authError,
    me,
    step,
    accountStatus,
    accountError,
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    degrees,
    feedPageStatus,
    postStatus,
    posts,
    recentVillages,
    recentUsers,
    viewPageStatus,
    user,
    userError,
    story,
    storyError,
    personality,
    personalityError,
    institution,
    institutionError,
    villagePageStatus,
    village,
    villageUsers,    
    villageStories,
    villagePersonalities,
    villageInstitutions,
    villageVideos,    
    villagePhotos,
    graduatePageStatus,
    graduateStats,
    session
  };
};

export default useFetchData;
