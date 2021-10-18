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
import { fetchFeedPage } from "rdx/slices/feedPage";
import { fetchVillagePage } from "rdx/slices/villagePage";
import { fetchGraduatePage } from "rdx/slices/graduatePage";

const useFetchData = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const { jwt, me: authMe, status: authStatus, error:authError } = useSelector((state: OurStore) => state.authReducer);
  const { me, meStep, status: meStatus, meError, postError, user, userError } = useSelector(
    (state: OurStore) => state.userReducer
  );

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
    (state: OurStore) => state.feedPageReducer.pageData
  );

  const { users, graduates, articles, personalities, institutions, videos } =
    useSelector((state: OurStore) => state.villagePageReducer.pageData);

  const { totalGraduates } = useSelector(
    (state: OurStore) => state.graduatePageReducer.pageData
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

  const fetchFeedPageData = async () => {
    await dispatch(fetchFeedPage());
  };
  const fetchVillagePageData = async (params) => {
    await dispatch(fetchVillagePage(params));
  };
  const fetchGraduatePageData = async (params) => {
    await dispatch(fetchGraduatePage(params));
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

  const fetchUserData = async (params) => {
    await dispatch(fetchUser(params));
  };

  return {
    jwt,
    authMe,
    authStatus,
    authError,
    me,
    meStep,
    meStatus,
    meError,
    postError,
    countries,
    regions,
    districts,
    subDistricts,
    villages,
    universities,
    professions,
    graduates,
    posts,
    recentVillages,
    recentUsers,
    totalGraduates,
    user,
    userError,
    users,
    articles,
    personalities,
    institutions,
    videos,
    fetchCountriesData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    fetchCommonData,
    fetchMeData,
    fetchFeedPageData,
    fetchVillagePageData,
    fetchGraduatePageData,
    fetchUserData,
  };
};

export default useFetchData;
