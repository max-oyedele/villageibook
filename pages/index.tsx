import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { getUserToken } from "helpers/get-user-token";

const Index: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    const access_token = getUserToken();
    if (access_token) {
      router.push("/feed");
    } else {
      router.push("/home");
    }
  }, []);

  return <Fragment></Fragment>;
};

export default Index;
