import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";

import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
  Image,
  Textarea,
  AspectRatio,
  Circle,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import SearchBar from "components/SearchBar";
import MyVillageDivider from "components/MyVillageDivider";
import MyVillageItems from "components/MyVillageItems";
import PremiumCard from "components/PremiumCard";
import SignupCard from "components/SignupCard";
import RecentVillageCard from "components/RecentVillageCard";
import PostCard from "components/PostCard";
import CaptionCard from "components/CaptionCard";
import GraduateStatCard from "components/GraduateStatCard";
import RecentUserCard from "components/RecentUserCard";
import VideoBox from "components/VideoBox";

import { parseCookie } from "helpers/parse-cookie";

import {
  recentVillages,
  posts,
  recentUsers,
  totalGraduates,
  villageName,
  villageGraduates,
  bangladeshGraduates,
} from "data";

import { District } from "types/schema";

const Home: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const tabsMobile = ["Feed", "My Village", "Graduates"];
  const [activeTab, setActiveTab] = useState(tabsMobile[0]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <HStack h={24}>
          <PageTitle title="Find Village" />
        </HStack>
        <Box px={{ lg: 20 }}>
          <SearchBar />
        </Box>

        {breakpointValue === "base" && (
          <Box mt={12}>
            <TabsMobile
              tabs={tabsMobile}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Box>
        )}

        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <Box bgColor="white" p={4} borderRadius="6px" mb={6}>
                <VideoBox
                  video={{
                    id: 0,
                    title: "video title",
                    author: "author",
                    img: "https://bit.ly/naruto-sage",
                  }}
                />

                <Box mt={8}>
                  <MyVillageDivider />
                </Box>
                <Box my={6}>
                  <MyVillageItems />
                </Box>
              </Box>

              {/* {jwt && <PremiumCard />} */}

              {/* {!jwt && <SignupCard />} */}

              <Text fontSize="24px" my={10}>
                Recently developed
              </Text>
              <VStack spacing={4}>
                {recentVillages.map((village) => (
                  <RecentVillageCard key={village.name} {...village} />
                ))}
              </VStack>
            </Box>
          )}

          <Box w={{ base: "100%", md: "50%" }}>
            <Box bg="white" borderRadius="4px" mb={4} p={4}>
              <Textarea fontSize="13px" placeholder="Write something here..." />
              <Divider mt={4} mb={2} />
              <Flex justifyContent="space-between">
                <HStack spacing={4} fontSize="13px" color="GrayText">
                  <HStack spacing={1}>
                    <Image src="/icons/post-photo.svg" />
                    <Text>Picture</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Image src="/icons/post-video.svg" />
                    <Text>Video</Text>
                  </HStack>
                </HStack>
                <Button
                  h="27px"
                  fontSize="13px"
                  fontWeight="400"
                  bgColor="greenTone"
                  color="white"
                >
                  Post
                </Button>
              </Flex>
            </Box>

            {(breakpointValue === "md" ||
              (breakpointValue === "base" && activeTab === "Feed")) && (
              <VStack spacing={4}>
                {posts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </VStack>
            )}
            {breakpointValue === "base" && activeTab === "My Village" && (
              <Box>
                <MyVillageItems />
                <Box mt={12}>
                  <PremiumCard />
                </Box>
                <Text fontSize="20px" mt={12} mb={6}>
                  Recently developed
                </Text>
                <VStack spacing={4}>
                  {recentVillages.map((village) => (
                    <RecentVillageCard key={village.name} {...village} />
                  ))}
                </VStack>
              </Box>
            )}
            {breakpointValue === "base" && activeTab === "Graduates" && (
              <Box>
                <GraduateStatCard
                  totalGraduates={totalGraduates}
                  villageName={villageName}
                  villageGraduates={villageGraduates}
                  bangladeshGraduates={bangladeshGraduates}
                />
                <Box mt={12}>
                  <VideoBox
                    video={{
                      id: 0,
                      title: "video title",
                      author: "author",
                      img: "https://bit.ly/naruto-sage",
                    }}
                  />
                </Box>

                <Text fontSize="20px" mt={12} mb={6}>
                  Recently joined
                </Text>
                <VStack spacing={4}>
                  {recentUsers.map((user) => (
                    <RecentUserCard key={user.name} {...user} />
                  ))}
                </VStack>
              </Box>
            )}
          </Box>

          {breakpointValue === "md" && (
            <Box w="25%">
              <CaptionCard caption="caption" desc="Text Block" />
              <Text fontSize="24px" my={10}>
                Graduates
              </Text>
              <GraduateStatCard
                totalGraduates={totalGraduates}
                villageName={villageName}
                villageGraduates={villageGraduates}
                bangladeshGraduates={bangladeshGraduates}
              />
              <Text fontSize="24px" my={10}>
                Recently joined
              </Text>
              <VStack spacing={4}>
                {recentUsers.map((user) => (
                  <RecentUserCard key={user.name} {...user} />
                ))}
              </VStack>
            </Box>
          )}
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

const TabsMobile: React.FC<{
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = (props) => {
  return (
    <Fragment>
      <HStack borderTop="1px" borderBottom="1px" borderColor="gray.300">
        {props.tabs.map((tab) => (
          <Box
            key={tab}
            w="full"
            py={4}
            borderBottom={`${
              tab === props.activeTab ? "2px solid #553CFB" : ""
            }`}
            onClick={() => props.setActiveTab(tab)}
          >
            <Text
              textAlign="center"
              color={`${tab === props.activeTab ? "purpleTone" : ""}`}
            >
              {tab}
            </Text>
          </Box>
        ))}
      </HStack>
    </Fragment>
  );
};

export default Home;

export async function getServerSideProps({ req }) {
  const { jwt } = parseCookie(req ? req.headers.cookie || "" : document.cookie);

  if (jwt) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}
