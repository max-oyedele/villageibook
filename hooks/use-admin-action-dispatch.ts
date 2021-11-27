import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import { submitPersonality } from "rdx/slices/admin";

const useAdminActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const submitPersonalityData = async (params) => {
    await dispatch(submitPersonality(params));
  }

  return {
    submitPersonalityData,
    
  };
};

export default useAdminActionDispatch;
