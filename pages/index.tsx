import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Index: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/home");
  }, []);

  return <Fragment></Fragment>;
};

export default Index;
