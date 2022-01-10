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

  const { posts, recentVillages, recentUsers } = useSelector((state: OurStore) => state.feedPageReducer);
  const { status: postStatus, error: postError } = useSelector((state: OurStore) => state.postReducer);
  const { user, userError, personality, personalityError, institution, institutionError } = useSelector((state: OurStore) => state.viewReducer);

  const {
    village,
    villageUsers,
    villageGraduates,
    villageStories,
    villagePersonalities,
    villageInstitutions,
    villageVideos,
  } = useSelector((state: OurStore) => state.villagePageReducer);

  const { graduateStatsByCondition, totalGraduateStats } = useSelector((state: OurStore) => state.graduatePageReducer)

  return {
    jwt,
    signupMe,
    authStatus,
    authError,
    me,
    step,
    accountStatus,
    accountError,
    postStatus,
    postError,
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    degrees,
    posts,
    recentVillages,
    recentUsers,
    graduateStatsByCondition,
    totalGraduateStats,
    user,
    userError,
    personality,
    personalityError,
    institution,
    institutionError,
    village,
    villageUsers,
    villageGraduates,
    villageStories,
    villagePersonalities,
    villageInstitutions,
    villageVideos,    
  };
};

export default useFetchData;
