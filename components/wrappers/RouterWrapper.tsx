import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { MyThunkDispatch, OurStore } from "rdx/store";
import { Register } from "rdx/types";
import { reset } from "rdx/slices/auth";

const RouterWrapper = ({children}) => {
  const router = useRouter();

  const dispatch: MyThunkDispatch = useDispatch();
  const { jwt, register, error } = useSelector(
    (state: OurStore) => state.authReducer
  );

  const [cookie, setCookie] = useCookies(["jwt"]);
  
  useEffect(() => {
    if (register === Register.STEP2) {
      router.push("/accountregister");
    }
    else if (register === Register.COMPLETED) {
      setTimeout(()=>{
        // router.push("/login");
      }, 3000)
    }
    if (jwt) {
      setCookie("jwt", JSON.stringify(jwt), {
        path: "/home",
        maxAge: jwt.expires_in, // Expirey time in seconds
        sameSite: true,
      });
      router.push("/feed");
    }
  }, [jwt, register, error]);
  
  return children;
};

export default RouterWrapper;
