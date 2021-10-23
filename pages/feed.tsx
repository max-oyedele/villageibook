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
  useBreakpointValue,
} from "@chakra-ui/react";


import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageDivider from "components/LeftVillageDivider";
import LeftVillageItems from "components/LeftVillageItems";

import RecentVillageCard from "components/RecentVillageCard";
import PostForm from "components/PostForm";
import PostCard from "components/PostCard";
import CaptionCard from "components/CaptionCard";
import VillageGraduatesCountryStatCard from "components/VillageGraduatesCountryStatCard";
import RecentUserCard from "components/RecentUserCard";
import VideoBox from "components/VideoBox";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";

const Feed: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const { fixed, rightPartOffsetX } = useWindowProp();

  const tabsMobile = ["Feed", "Village", "Graduates"];
  const [activeTab, setActiveTab] = useState(tabsMobile[0]);

  const { me, posts, recentUsers, recentVillages, fetchMeData, fetchCommonData, fetchFeedPageData, fetchVillagePageData } = useFetchData();
  
  useEffect(() => {
    fetchMeData();
    fetchCommonData();
    fetchFeedPageData();
    fetchVillagePageData({ villageName: me?.comesFrom });
  }, []);
  
  useEffect(()=>{
    console.log('rightpart', rightPartOffsetX)
  }, [rightPartOffsetX])

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6} mb={20}>
        {breakpointValue === "base" && (
          <Box mt={12}>
            <TabsMobile
              tabs={tabsMobile}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Box>
        )}

        <Flex mt={8}>
          {breakpointValue === "md" && (
            <Box
              id="left-part"
              minW="270px"
              pos={fixed ? "fixed" : "static"}
              top={fixed ? "80px" : 0}
            >
              <Box
                bgColor="white"
                p={4}
                border="1px"
                borderColor="gray.200"
                borderRadius="6px"
              >
                <CaptionCard name="Skillhet" />
                <Box mt={8}>
                  <LeftVillageDivider
                    title="Go My Village"
                    village={me?.comesFrom}
                  />
                </Box>
                <Box my={6}>
                  <LeftVillageItems village={me?.comesFrom} />
                </Box>
              </Box>

              <Box>
                <Text fontSize="24px" mt={12} mb={6}>
                  Recently developed
                </Text>
                <VStack spacing={4}>
                  {recentVillages.map((village) => (
                    <RecentVillageCard key={village.name} village={village} />
                  ))}
                </VStack>
              </Box>
            </Box>
          )}

          <Box
            id="feed-root"
            w={{ base: "100%", md: "full" }}
            mx={
              fixed && breakpointValue === "md"
                ? "294px"
                : breakpointValue === "md"
                ? "24px"
                : "0px"
            }
          >
            <Box bg="white" borderRadius="4px" mb={4} p={4}>
              <PostForm />
            </Box>

            {(breakpointValue === "md" ||
              (breakpointValue === "base" && activeTab === "Feed")) && (
              <VStack spacing={4}>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </VStack>
            )}
            {breakpointValue === "base" && activeTab === "Village" && (
              <Box>
                <LeftVillageItems village={me?.comesFrom} />
                <Text fontSize="20px" mt={12} mb={6}>
                  Recently developed
                </Text>
                <VStack spacing={4}>
                  {recentVillages.map((village) => (
                    <RecentVillageCard key={village.name} village={village} />
                  ))}
                </VStack>
              </Box>
            )}
            {breakpointValue === "base" && activeTab === "Graduates" && (
              <Box>
                <VillageGraduatesCountryStatCard village={me?.comesFrom} direction="column" />
                <Box mt={12}>
                  <VideoBox
                    videoUrl={""}
                  />
                </Box>

                <Text fontSize="20px" mt={12} mb={6}>
                  Recently joined
                </Text>
                <VStack spacing={4}>
                  {recentUsers.map((user) => (
                    <RecentUserCard key={user.uuid} user={user} />
                  ))}
                </VStack>
              </Box>
            )}
          </Box>

          {breakpointValue === "md" && (
            <Box
              minW="270px"
              pos={fixed ? "fixed" : "static"}
              top={fixed ? "80px" : 0}
              left={fixed ? rightPartOffsetX : 0}
            >
              <VillageGraduatesCountryStatCard village={me?.comesFrom} direction="column" />

              <Text fontSize="24px" mt={12} mb={6}>
                Recently joined
              </Text>
              <VStack spacing={4}>
                {recentUsers.map((user) => (
                  <RecentUserCard key={user.uuid} user={user} />
                ))}
              </VStack>
            </Box>
          )}
        </Flex>
      </Container>

      {/* <Box mt={40}>
        <Footer />
      </Box> */}
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

export default Feed;