import { useSelector, useDispatch } from "react-redux";
import { MyThunkDispatch, OurStore } from "rdx/store";

import {
  fetchCountries,
  fetchRegions,
  fetchDistricts,
  fetchSubDistricts,
  fetchVillages,
  fetchUniversities,
  fetchProfessions,
  fetchDegrees,
} from "rdx/slices/common";
import { fetchMe } from "rdx/slices/account";
import { fetchUser, fetchPersonality, fetchInstitution } from "rdx/slices/view";
import {
  fetchPosts,
  fetchRecentVillages,
  fetchRecentUsers,
} from "rdx/slices/feedPage";
import {
  fetchVillage,
  fetchVillageUsers,
  fetchVillageGraduates,
  fetchVillageStories,
  fetchVillagePersonalities,
  fetchVillageInstitutions,
  fetchVillageVideos,
} from "rdx/slices/villagePage";
import { 
  getGraduatesByCondition,
  getTotalGraduates
} from "rdx/slices/graduatePage";

const useFetchData = () => {
  const dispatch: MyThunkDispatch = useDispatch();

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

  const fetchCountriesData = async () => {
    await dispatch(fetchCountries());
  };
  const fetchRegionsData = async (params) => {
    await dispatch(fetchRegions(params));
  };
  const fetchDistrictsData = async (params) => {
    await dispatch(fetchDistricts(params));
  };
  const fetchSubDistrictsData = async (params) => {
    await dispatch(fetchSubDistricts(params));
  };
  const fetchVillagesData = async (params) => {
    await dispatch(fetchVillages(params));
  };
  const fetchUniversitiesData = async () => {
    await dispatch(fetchUniversities());
  };
  const fetchProfessionsData = async () => {
    await dispatch(fetchProfessions());
  };
  const fetchDegreesData = async () => {
    await dispatch(fetchDegrees());
  };

  const fetchCommonData = () => {
    fetchCountriesData();
    fetchUniversitiesData();
    fetchProfessionsData();
    fetchDegreesData();
  };

  const fetchMeData = async () => {
    await dispatch(fetchMe());
  };

  const fetchUserData = async (params) => {
    await dispatch(fetchUser(params));
  };

  const fetchPersonalityData = async (params) => {
    await dispatch(fetchPersonality(params));
  }

  const fetchInstitutionData = async (params) => {
    await dispatch(fetchInstitution(params));
  }

  const fetchFeedPageData = async () => {
    await dispatch(fetchPosts());
    await dispatch(fetchRecentVillages());
    await dispatch(fetchRecentUsers());
  };

  const fetchVillageData = async (params) => {
    await dispatch(fetchVillage(params));
  }
  const fetchVillageUsersData = async (params) => {
    await dispatch(fetchVillageUsers(params));
  };
  const fetchVillageGraduatesData = async (params) => {
    await dispatch(fetchVillageGraduates(params));
  };
  const fetchVillageStoriesData = async (params) => {
    await dispatch(fetchVillageStories(params));
  };
  const fetchVillagePersonalitiesData = async (params) => {
    await dispatch(fetchVillagePersonalities(params));
  };
  const fetchVillageInstitutionsData = async (params) => {
    await dispatch(fetchVillageInstitutions(params));
  };
  const fetchVillageVideosData = async (params) => {
    await dispatch(fetchVillageVideos(params));
  };

  const fetchVillagePageData = (params) => {
    fetchVillageUsersData(params);
    fetchVillageGraduatesData(params);
    fetchVillageStoriesData(params);
    fetchVillagePersonalitiesData(params);
    fetchVillageInstitutionsData(params);
    fetchVillageVideosData(params);
  };

  const getGraduatesByConditionData = async (params) => {
    await dispatch(getGraduatesByCondition(params));
  }

  const getTotalGraduatesData = async () => {
    await dispatch(getTotalGraduates());
  }

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
    fetchCountriesData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    fetchCommonData,
    fetchMeData,
    fetchUserData,
    fetchPersonalityData,
    fetchInstitutionData,
    fetchFeedPageData,
    fetchVillageData,
    fetchVillagePageData,
    // fetchVillageUsersData,
    // fetchVillageGraduatesData,
    // fetchVillageStoriesData,
    // fetchVillagePersonalitiesData,
    // fetchVillageInstitutionsData,
    // fetchVillageVideosData,
    getGraduatesByConditionData,
    getTotalGraduatesData
  };
};

export default useFetchData;
