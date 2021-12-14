import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import { 
  submitStory, submitPersonality, submitInstitution, submitVideo,
  deleteObj 
} from "rdx/slices/admin";

const useAdminActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const submitStoryData = async (params) => {
    await dispatch(submitStory(params));
  }
  const submitPersonalityData = async (params) => {
    await dispatch(submitPersonality(params));
  }
  const submitInstitutionData = async (params) => {
    await dispatch(submitInstitution(params));
  }

  const submitVideoData = async (params) => {
    await dispatch(submitVideo(params));
  }

  const deleteData = async (params) => {
    await dispatch(deleteObj(params));
  }  

  return {
    submitStoryData,
    submitPersonalityData,
    submitInstitutionData,
    submitVideoData,
    deleteData,    
  };
};

export default useAdminActionDispatch;
