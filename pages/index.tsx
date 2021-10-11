import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";

import { parseCookie } from "helpers/parse-cookie";

const Index:NextPage = () => {
  return (
    <></>
  )
}

export default Index;

export async function getServerSideProps({ req }) {
  const { jwt } = parseCookie(req ? req.headers.cookie || "" : document.cookie);

  if (jwt) {
    return {
      redirect: {
        destination: "/feed",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}
