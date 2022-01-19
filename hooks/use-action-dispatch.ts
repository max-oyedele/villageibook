import { useDispatch } from "react-redux";

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
import { reset as authResetFunc, login, signup } from "rdx/slices/auth";
import { checkoutSession } from "rdx/slices/checkout";
import {
  reset as accountResetFunc,
  resetUpdate as updateResetFunc,
  fetchMe,
  submitStepOne,
  submitStepTwo,
  submitPremiumUser
} from "rdx/slices/account";
import {
  reset as viewResetFunc,
  fetchUser,
  fetchPersonality,
  fetchInstitution,
} from "rdx/slices/viewPage";

import {
  reset as postResetFunc,
  resetPosts as postsResetFunc,
  fetchPosts,
  fetchRecentVillages,
  fetchRecentUsers,
  submitPost
} from "rdx/slices/feedPage";
import {
  fetchVillage,
  fetchVillageUsers,
  fetchVillageStories,
  fetchVillagePersonalities,
  fetchVillageInstitutions,
  fetchVillageVideos,
  fetchVillagePhotos,
} from "rdx/slices/villagePage";
import {
  fetchGraduateStats
} from "rdx/slices/graduatePage";

const useActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();
     
  const authReset = async () => {
    await dispatch(authResetFunc());
  };

  const accountReset = async () => {
    await dispatch(accountResetFunc());
  };

  const updateReset = async () => {
    await dispatch(updateResetFunc());
  }

  const doLogin = async (params) => {
    await dispatch(login(params));
  };

  const doSignup = async (params) => {
    await dispatch(signup(params));
  };

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
  };

  const fetchInstitutionData = async (params) => {
    await dispatch(fetchInstitution(params));
  };

  const fetchPostsData = async (params) => {
    await dispatch(fetchPosts(params));
  }
  const fetchFeedPageData = async (params) => {
    fetchPostsData(params);
    await dispatch(fetchRecentVillages());
    await dispatch(fetchRecentUsers());
  };

  const fetchVillageData = async (params) => {
    await dispatch(fetchVillage(params));
  };
  const fetchVillageUsersData = async (params) => {
    await dispatch(fetchVillageUsers(params));
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
  const fetchVillagePhotosData = async (params) => {
    await dispatch(fetchVillagePhotos(params));
  };

  const fetchVillagePageData = (params) => {
    fetchVillageUsersData(params);
    fetchVillageStoriesData(params);
    fetchVillagePersonalitiesData(params);
    fetchVillageInstitutionsData(params);
    fetchVillageVideosData(params);
    fetchVillagePhotosData(params);
  };

  const fetchGraduateStatsData = async (params) => {
    await dispatch(fetchGraduateStats(params))
  }

  const submitPostData = async (params) => {
    await dispatch(submitPost(params));
  };

  const submitStepOneData = async (params) => {
    await dispatch(submitStepOne(params));
  };

  const submitStepTwoData = async (params) => {
    await dispatch(submitStepTwo(params));
  };

  const submitPremiumUserData = async (params) => {
    await dispatch(submitPremiumUser(params));
  };

  const resetPost = async () => {
    await dispatch(postResetFunc());
  };

  const resetPosts = async () => {
    await dispatch(postsResetFunc());
  };

  const fetchCheckoutSession = async (params) => {
    await dispatch(checkoutSession(params));
  };

  return {
    authReset,
    accountReset,
    updateReset,
    doLogin,
    doSignup,
    submitPostData,
    submitStepOneData,
    submitStepTwoData,
    submitPremiumUserData,
    resetPost,
    resetPosts,
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
    fetchPostsData,
    fetchFeedPageData,
    fetchVillageData,
    fetchVillagePageData,
    fetchCheckoutSession,
    // fetchVillageUsersData,
    // fetchVillageStoriesData,
    // fetchVillagePersonalitiesData,
    // fetchVillageInstitutionsData,
    // fetchVillageVideosData,    
    fetchGraduateStatsData,
  };
};

export default useActionDispatch;
