import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";

import { reset as authResetFunc, login, signup } from "rdx/slices/auth";
import { reset as accountResetFunc, submitStepOne, submitStepTwo } from "rdx/slices/account";
import { reset as viewResetFunc } from "rdx/slices/view";
import { reset as postResetFunc, submitPost } from "rdx/slices/post";
import { reset as postsResetFunc } from 'rdx/slices/feedPage';

const useActionDispatch = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const authReset = async () => {
    await dispatch(authResetFunc());
  }

  const accountReset = async () => {
    await dispatch(accountResetFunc());
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

  const resetPost = async () => {
    await dispatch(postResetFunc());
  }

  const resetPosts = async() => {
    await dispatch(postsResetFunc());
  }

  return {
    authReset,
    accountReset,
    doLogin,
    doSignup,
    submitPostData,
    submitStepOneData,
    submitStepTwoData,
    resetPost,
    resetPosts
  };
};

export default useActionDispatch;
