import { useState, useEffect } from "react";
import {useRouter} from "next/router";
import { getUserToken, setUserToken, removeUserToken } from "helpers/user-token";

const useToken = () => {
  const router = useRouter();
  
  const isAuthPage = () => {
    return router.pathname === "/login" || router.pathname === "/signup"
  }

  useEffect(()=>{
    let access_token = getUserToken();
    if(!access_token && !isAuthPage()){
      router.push("/");
    }
  }, [])

  const getToken = () => {
    return getUserToken();
  }

  const setToken = (jwt) => {
    setUserToken(jwt);
  };

  const removeToken = () => {
    removeUserToken();
  }

  return { getToken, setToken, removeToken };
};

export default useToken;
