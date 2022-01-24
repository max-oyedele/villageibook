import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import {
  fetchPosts,
  fetchStories,
  fetchInstitutions,
  fetchPersonalities,
  fetchVideos,
  fetchPhotos,
  fetchUsers,
  fetchPmusers,
  submitStory,
  submitPersonality,
  submitInstitution,
  submitVideo,
  deleteObj,
} from "rdx/slices/admin";
import { init as resetFunc } from 'rdx/slices/admin';

const useAdminActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const {
    delStatus,
  } = useSelector(
    (state: OurStore) => state.adminReducer
  );
     
  const fetchPostsData = async () => {
    await dispatch(fetchPosts());
  };
  const fetchStoriesData = async (params) => {
    await dispatch(fetchStories(params));
  };
  const fetchPersonalitiesData = async (params) => {
    await dispatch(fetchPersonalities(params));
  };
  const fetchInstitutionsData = async (params) => {
    await dispatch(fetchInstitutions(params));
  };
  const fetchVideosData = async (params) => {
    await dispatch(fetchVideos(params));
  };
  const fetchPhotosData = async (params) => {
    await dispatch(fetchPhotos(params));
  };
  const fetchUsersData = async () => {
    await dispatch(fetchUsers());
  };
  const fetchPmusersData = async () => {
    await dispatch(fetchPmusers());
  };

  const submitStoryData = async (params) => {
    await dispatch(submitStory(params));
  };
  const submitPersonalityData = async (params) => {
    await dispatch(submitPersonality(params));
  }
  const submitInstitutionData = async (params) => {
    await dispatch(submitInstitution(params));
  };
  const submitVideoData = async (params) => {
    await dispatch(submitVideo(params));
  };
  const deleteData = async (params) => {
    await dispatch(deleteObj(params));
  };

  const resetState = async() => {
    await dispatch(resetFunc());
  }

  return {
    delStatus,
    fetchPostsData,
    fetchStoriesData,
    fetchPersonalitiesData,
    fetchInstitutionsData,
    fetchVideosData,
    fetchPhotosData,
    fetchUsersData,
    fetchPmusersData,
    submitStoryData,
    submitPersonalityData,
    submitInstitutionData,
    submitVideoData,
    deleteData,   
    resetState 
  };
};

export default useAdminActionDispatch;
