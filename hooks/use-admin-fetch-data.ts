import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import {fetchPosts, fetchStories, fetchInstitutions, fetchPersonalities, fetchVideos, fetchUsers} from "rdx/slices/admin";

const useAdminFetchData = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const { posts, stories, personalities, institutions, videos, users, error } = useSelector(
    (state: OurStore) => state.adminReducer
  );
     
  const fetchPostsData = async () => {
    await dispatch(fetchPosts());
  };
  const fetchStoriesData = async (params) => {
    await dispatch(fetchStories(params));
  }
  const fetchPersonalitiesData = async (params) => {
    await dispatch(fetchPersonalities(params));
  }
  const fetchInstitutionsData = async (params) => {
    await dispatch(fetchInstitutions(params));
  };
  const fetchVideosData = async (params) => {
    await dispatch(fetchVideos(params));
  };
  const fetchUsersData = async () => {
    await dispatch(fetchUsers());
  };

  return {    
    posts,
    stories,
    personalities,
    institutions,
    videos,
    users,    
    error,    
    fetchPostsData,
    fetchStoriesData,
    fetchPersonalitiesData,
    fetchInstitutionsData,
    fetchVideosData,
    fetchUsersData    
  };
};

export default useAdminFetchData;
