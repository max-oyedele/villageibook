import { useState, useEffect } from "react";
import {useRouter} from "next/router";
import cookieCutter from "cookie-cutter";
import { getUserToken } from "helpers/get-user-token";

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

  const setToken = (jwt) => {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + jwt.expires_in);
    cookieCutter.set("jwt", JSON.stringify(jwt), { expires: expires });
  };

  const removeToken = () => {
    cookieCutter.set("jwt", "", {expires: new Date(0)});
  }

  return { setToken, removeToken };
};

export default useToken;
