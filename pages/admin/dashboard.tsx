import { Fragment, useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Grid,
  Center,
  HStack,
  VStack,
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

const Dashboard: NextPage = () => {
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

  const [users, setUsers] = useState(10200);
  const [posts, setPosts] = useState(9100);
  const [articles, setArticles] = useState(1220);
  const [personalities, setPersonalities] = useState(2300);
  const [institutions, setInstitutions] = useState(5020);
  const [videos, setVideos] = useState(1120);
  const [displayItems, setDisplayItems] = useState([])

  useEffect(()=>{
    setDisplayItems([
      {
        label: "Users",
        count: users,
        path: "/admin/users"
      },
      {
        label: "Posts",
        count: posts,
        path: "/admin/posts"
      },
      {
        label: "Articles",
        count: articles,
        path: "/admin/societies"
      },
      {
        label: "Personalities",
        count: personalities,
        path: "/admin/personalities"
      },
      {
        label: "Institutions",
        count: institutions,
        path: "/admin/institutions"
      },
      {
        label: "Videos",
        count: videos,
        path: "/admin/videos"
      },
    ])
  }, [users, posts, articles, personalities, institutions, videos])

  return (
    <Fragment>
      <Layout>
        <SimpleGrid columns={{base: 3, md: 6}} gap={2}>
          {
            displayItems?.map((item, index)=>(
                <Link key={index} href={item.path} passHref={true}>
              <VStack bg="white" borderRadius={8} p={2} cursor="pointer">
                <Text>{item.label}</Text>
                <Text>{item.count}</Text>
              </VStack>
                </Link>
            ))
          }
        </SimpleGrid>
      </Layout>
    </Fragment>
  );
};

export default Dashboard;
