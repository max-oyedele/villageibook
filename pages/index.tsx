import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import {useRouter} from "next/router";

import cookieCutter from "cookie-cutter";

const Index:NextPage = () => {
  const router = useRouter();

  useEffect(()=>{
    let jwtFromCookie = cookieCutter.get("jwt");
    if(jwtFromCookie){
      router.push("/feed")
    }
    else{
      router.push("/home")
    }
  }, []);

  return (
    <></>
  )
}

export default Index;
