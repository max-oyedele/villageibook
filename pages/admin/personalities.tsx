import { Fragment, useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Grid,
  Center,
  Icon,
  Image,
  Portal,
  Progress,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import {FaWallet, FaGlobe, FaFile, FaShoppingCart, FaRegArrowAltCircleRight, FaRocket, FaThList} from "react-icons/fa";

import Layout from "admin/components/Layout";

import { getUserToken } from "helpers/user-token";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const Personalities: NextPage = () => {
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

  useEffect(() => {
    // if(me.role !== "admin"){
    //   router.push("/feed");
    // }
  }, [me]);

  return (
    <Fragment>
      <Layout>
        personality management
      </Layout>
    </Fragment>
  );
};

export default Personalities;
