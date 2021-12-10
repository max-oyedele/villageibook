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
  const fetchStoriesData = async () => {
    await dispatch(fetchStories());
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
