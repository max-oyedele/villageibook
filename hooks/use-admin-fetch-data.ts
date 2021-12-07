import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import {fetchPosts, fetchArticles, fetchInstitutions, fetchPersonalities, fetchVideos, fetchUsers} from "rdx/slices/admin";

const useAdminFetchData = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const { posts, articles, personalities, institutions, videos, users, error } = useSelector(
    (state: OurStore) => state.adminReducer
  );
     
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
    posts,
    articles,
    personalities,
    institutions,
    videos,
    users,    
    error,    
    fetchPostsData,
    fetchArticlesData,
    fetchPersonalitiesData,
    fetchInstitutionsData,
    fetchVideosData,
    fetchUsersData    
  };
};

export default useAdminFetchData;
