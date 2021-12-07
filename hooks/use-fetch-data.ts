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
} from "rdx/slices/location";
import { fetchMe, fetchUser } from "rdx/slices/user";
import {
  fetchFeedPosts,
  fetchRecentVillages,
  fetchRecentUsers,
} from "rdx/slices/feedPage";
import {
  fetchVillage,
  fetchVillageUsers,
  fetchVillageGraduates,
  fetchVillageArticles,
  fetchVillagePersonalities,
  fetchVillageInstitutions,
  fetchVillageVideos,
} from "rdx/slices/villagePage";
import { fetchGraduates } from "rdx/slices/graduatePage";
import { getGraduatesByLocation } from "rdx/slices/stats";

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
    meStep,
    status: meStatus,
    meError,
    postStatus,
    postError,
    user,
    userError,
  } = useSelector((state: OurStore) => state.userReducer);

  const {
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
  } = useSelector((state: OurStore) => state.locationReducer);

  const { posts, recentVillages, recentUsers } = useSelector(
    (state: OurStore) => state.feedPageReducer
  );

  const {
    village,
    villageUsers,
    villageGraduates,
    villageArticles,
    villagePersonalities,
    villageInstitutions,
    villageVideos,
  } = useSelector((state: OurStore) => state.villagePageReducer);

  const { totalGraduates } = useSelector(
    (state: OurStore) => state.graduatePageReducer
  );
  const { graduatesByLocation } = useSelector((state: OurStore) => state.statsReducer)

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

  const fetchCommonData = () => {
    fetchCountriesData();
    //expect other locations    
    fetchUniversitiesData();
    fetchProfessionsData();
  };

  const fetchMeData = async () => {
    await dispatch(fetchMe());
  };

  const fetchUserData = async (params) => {
    await dispatch(fetchUser(params));
  };

  const fetchFeedPageData = async () => {
    await dispatch(fetchFeedPosts());
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
  const fetchVillageArticlesData = async (params) => {
    await dispatch(fetchVillageArticles(params));
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
    fetchVillageData(params);
    fetchVillageUsersData(params);
    fetchVillageGraduatesData(params);
    fetchVillageArticlesData(params);
    fetchVillagePersonalitiesData(params);
    fetchVillageInstitutionsData(params);
    fetchVillageVideosData(params);
  };

  const fetchGraduatePageData = async (params) => {
    await dispatch(fetchGraduates(params));
  };

  const getGraduatesByLocationData = async (params) => {
    await dispatch(getGraduatesByLocation(params));
  }

  return {
    jwt,
    signupMe,
    authStatus,
    authError,
    me,
    meStep,
    meStatus,
    meError,
    postStatus,
    postError,
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    posts,
    recentVillages,
    recentUsers,
    totalGraduates,
    graduatesByLocation,
    user,
    userError,
    village,
    villageUsers,
    villageGraduates,
    villageArticles,
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
    fetchFeedPageData,
    fetchVillageData,
    fetchVillageUsersData,
    fetchVillageGraduatesData,
    fetchVillageArticlesData,
    fetchVillagePersonalitiesData,
    fetchVillageInstitutionsData,
    fetchVillageVideosData,
    fetchVillagePageData,
    fetchGraduatePageData,
    getGraduatesByLocationData
  };
};

export default useFetchData;
