import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import {useRouter} from "next/router";

import useJwt from "hooks/use-jwt";

const Index:NextPage = () => {
  const router = useRouter();

  const {jwt} = useJwt();
  useEffect(()=>{
    if(jwt){
      router.push("/feed")
    }
    else{
      router.push("/home")
    }
  }, [jwt]);

  return (
    <></>
  )
}

export default Index;
