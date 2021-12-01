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

import {fetchPosts, fetchArticles, fetchInstitutions, fetchPersonalities, fetchVideos, fetchUsers} from "rdx/slices/admin";

const useAdminFetchData = () => {
  const dispatch: MyThunkDispatch = useDispatch();

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

  const { posts, articles, personalities, institutions, videos, users, error } = useSelector(
    (state: OurStore) => state.adminReducer
  );


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
    fetchVillagesData(null);
    fetchUniversitiesData();
    fetchProfessionsData();
  };

  const fetchMeData = async () => {
    await dispatch(fetchMe());
  };

  
  const fetchPostsData = async () => {
    await dispatch(fetchPosts());
  };
  const fetchArticlesData = async () => {
    await dispatch(fetchArticles());
  }
  const fetchPersonalitiesData = async () => {
    await dispatch(fetchPersonalities());
  }
  const fetchInstitutionsData = async () => {
    await dispatch(fetchInstitutions());
  };
  const fetchVideosData = async () => {
    await dispatch(fetchVideos());
  };
  const fetchUsersData = async () => {
    await dispatch(fetchUsers());
  };

  return {
    me,
    meStep,
    meStatus,
    meError,    
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    posts,
    articles,
    personalities,
    institutions,
    videos,
    users,    
    error,
    fetchCountriesData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    fetchCommonData,
    fetchMeData,    
    fetchPostsData,
    fetchArticlesData,
    fetchPersonalitiesData,
    fetchInstitutionsData,
    fetchVideosData,
    fetchUsersData    
  };
};

export default useAdminFetchData;
