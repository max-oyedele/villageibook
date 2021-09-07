import { Fragment } from "react";
import type { NextPage } from "next";
import Image from "next/image";

import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import PageTitle from "components/widgets/PageTitle";
import SearchBar from "components/SearchBar";
import SignupCard from "components/SignupCard";
import VillageCard from "components/VillageCard";
import PostCard from "components/PostCard";

const villages = [
  {
    id: 0,
    name: "Syedpur",
    img: "/images/village-card1.png",
    last: 1,
  },
  {
    id: 1,
    name: "Panchpara",
    img: "/images/village-card2.png",
    last: 2,
  },
  {
    id: 2,
    name: "Rasulpur",
    img: "/images/village-card1.png",
    last: 4,
  },
];

const posts = [
  {
    id: 0,
    user: { name: "Nusrat Rahman", img: "/images/nusrat.png" },
    ago: "3 hours ago",
    post: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      imgs: ["/images/nusrat-post.png"],
    },
  },
  {
    id: 1,
    user: { name: "Sarmin Degum", img: "/images/sarmin.png" },
    ago: "5 hours ago",
    post: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      imgs: ["/images/sarmin-post1.png", "/images/sarmin-post2.png"],
    },
  },
  {
    id: 2,
    user: { name: "Sonia Khatun", img: "/images/sonia.png" },
    ago: "1 day ago",
    post: {
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.",
      imgs: ["/images/sonia-post.png"],
    },
  },
];

const Home: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Header />
      <Container maxW="full" p={6}>
        <Box mt={4}>
          <PageTitle title="Find Village" />
        </Box>
        <Box mt={10} px={{ lg: 20 }}>
          <SearchBar />
        </Box>
        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <SignupCard />
              <Text fontSize="26px" fontWeight="bold" my={10}>
                Recently developed
              </Text>
              <VStack spacing={4}>
                {villages.map((village) => (
                  <VillageCard key={village.name} {...village} />
                ))}
              </VStack>
            </Box>
          )}

          <Box w={{ base: "100%", md: "50%" }}>
            <VStack spacing={4}>
              {posts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </VStack>
          </Box>

          {breakpointValue === "md" && (
            <Box w="25%">
              {/* <CaptionCard />
              <Text>Graduates</Text>
              <GraduatesStatCard />
              <Text>Recently joined</Text>
              <UserCard /> */}
            </Box>
          )}
        </HStack>
      </Container>
    </Fragment>
  );
};

export default Home;
