import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import {
  fetchPosts,
  fetchStories,
  fetchInstitutions,
  fetchPersonalities,
  fetchVideos,
  fetchUsers,
  submitStory,
  submitPersonality,
  submitEditPersonality,
  submitInstitution,
  submitVideo,
  deleteObj,
} from "rdx/slices/admin";
import { init as resetFunc } from 'rdx/slices/admin';

const useAdminActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const { delStatus, addPersonality, editPersonality } = useSelector(
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
  const fetchUsersData = async () => {
    await dispatch(fetchUsers());
  };

  const submitStoryData = async (params) => {
    await dispatch(submitStory(params));
  };
  const submitPersonalityData = async (params) => {
    await dispatch(submitPersonality(params));
  }
  const submitPersonalityEditData = async (params) => {
    await dispatch(submitEditPersonality(params));
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
    addPersonality,
    editPersonality,
    fetchPostsData,
    fetchStoriesData,
    fetchPersonalitiesData,
    fetchInstitutionsData,
    fetchVideosData,
    fetchUsersData,
    submitStoryData,
    submitPersonalityData,
    submitPersonalityEditData,
    submitInstitutionData,
    submitVideoData,
    deleteData,   
    resetState 
  };
};

export default useAdminActionDispatch;
