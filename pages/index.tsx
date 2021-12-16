import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const Index: NextPage = () => {
  const router = useRouter();
  const { me, fetchMeData } = useFetchData();
  
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
      return user?.livesIn?.uuid && user?.comesFrom?.uuid
    }

    if(me){
      if(isCompletedUser(me)) router.push("/feed");
      else router.push("/home");
    }
    else {
      router.push("/home");
    }
  }, [me])

  return <Fragment></Fragment>;
};

export default Index;
