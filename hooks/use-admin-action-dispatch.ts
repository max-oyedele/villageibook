import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import { submitPersonality, submitInstitution } from "rdx/slices/admin";

const useAdminActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const submitPersonalityData = async (params) => {
    await dispatch(submitPersonality(params));
  }
  const submitInstitutionData = async (params) => {
    await dispatch(submitInstitution(params));
  }

  return {
    submitPersonalityData,
    submitInstitutionData
  };
};

export default useAdminActionDispatch;
