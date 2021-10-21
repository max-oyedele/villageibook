import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { getUserToken } from "helpers/get-user-token";
import useFetchData from "hooks/use-fetch-data";

const Index: NextPage = () => {
  const router = useRouter();
  const { me, fetchCommonData, fetchMeData } = useFetchData();

  useEffect(() => {
    const access_token = getUserToken();
    if (access_token) {
      fetchMeData();
    } else {
      router.push("/home");
    }
  }, []);

  useEffect(()=>{
    const isCompletedUser = (user) => {
      return user.livesIn && user.comesFrom
    }

    if(me){
      if(isCompletedUser(me)) router.push("/feed");
      else router.push("/home");
    }
  }, [me])

  return <Fragment></Fragment>;
};

export default Index;
