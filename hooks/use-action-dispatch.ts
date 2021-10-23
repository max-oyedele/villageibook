import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import { reset as authResetFunc, login, signup } from "rdx/slices/auth";
import { reset as userResetFunc, submitPost, submitStepOne, submitStepTwo } from "rdx/slices/user";

const useActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const authReset = async () => {
    await dispatch(authResetFunc());
  }

  const userReset = async () => {
    await dispatch(userResetFunc());
  }

  const doLogin = async (params) => {
    await dispatch(login(params));
  }

  const doSignup = async (params) => {
    await dispatch(signup(params));
  }

  const submitPostData = async (params) => {
    await dispatch(submitPost(params));
  }

  const submitStepOneData = async (params) => {
    await dispatch(submitStepOne(params));
  }

  const submitStepTwoData = async (params) => {
    await dispatch(submitStepTwo(params));
  }

  return {
    authReset,
    userReset,
    doLogin,
    doSignup,
    submitPostData,
    submitStepOneData,
    submitStepTwoData,
  };
};

export default useActionDispatch;
