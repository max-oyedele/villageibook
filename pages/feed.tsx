import { Fragment, useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Link from "next/link";

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
import VideoBox from "components/widgets/VideoBox";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";

const Feed: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const { fixed } = useWindowProp();

  const rightPartRef = useRef(null);

  const tabsMobile = ["Feed", "Village", "Graduates"];
  const [activeTab, setActiveTab] = useState(tabsMobile[0]);

  const {
    me,
    posts,
    recentUsers,
    recentVillages,
    fetchMeData,
    fetchCommonData,
    fetchFeedPageData,
    fetchVillagePageData,
  } = useFetchData();

  useEffect(() => {
    fetchMeData();
    fetchCommonData();
  }, []);

  useEffect(() => {
    if (me) {
      fetchFeedPageData();
      fetchVillagePageData({ villageUuid: me.comesFrom?.uuid });
    }
  }, [me])

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
                <VideoBox
                  videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
                  videoBackImg="/images/video-caption-back.png"
                />
                <Box mt={8}>
                  <LeftVillageDivider
                    title="My Village"
                    village={me?.comesFrom}
                  />
                </Box>
                <Box my={6}>
                  <LeftVillageItems village={me?.comesFrom} badgeShow={false} />
                </Box>
              </Box>

              {/* <Link href={`https://www.fundsurfer.com/crowdfund/villageibook?token=975ab55f35fefbd176774045369a62ba`} passHref={true}>
                <Button
                  w="full"
                  mt={4}
                  px={4}
                  fontSize="14px"
                  fontWeight="400"
                  bgColor="#FFB425"
                  color="white"
                  _focus={{ boxShadow: "none" }}
                >
                  Sponsor VillageIbook
                </Button>
              </Link> */}

              <Box>
                <Text fontSize="24px" mt={10} mb={6}>
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
            w="full"
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
                    <PostCard key={post.uuid} post={post} />
                  ))}
                </VStack>
              )}
            {breakpointValue === "base" && activeTab === "Village" && (
              <Box>
                <LeftVillageItems village={me?.comesFrom} badgeShow={false} />
                <Text fontSize="20px" mt={12} mb={6}>
                  Recently developed
                </Text>
                <VStack spacing={4}>
                  {recentVillages.map((village) => (
                    <RecentVillageCard key={village.name} village={village} />
                  ))}
                </VStack>

                <Link href={`https://www.fundsurfer.com/crowdfund/villageibook?token=975ab55f35fefbd176774045369a62ba`} passHref={true}>
                  <Button
                    px={4}
                    h="26px"
                    fontSize="12px"
                    fontWeight="400"
                    bgColor="#FFB425"
                    color="white"
                    _focus={{ boxShadow: "none" }}
                  >
                    Sponsor VillageIbook
                  </Button>
                </Link>
              </Box>
            )}
            {breakpointValue === "base" && activeTab === "Graduates" && (
              <Box>
                <VillageGraduatesCountryStatCard
                  village={me?.comesFrom}
                  direction="column"
                />
                <Box mt={12}>
                  <VideoBox videoUrl={""} />
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
              ref={(ref) => (rightPartRef.current = ref)}
              minW="270px"
              pos={fixed ? "fixed" : "static"}
              top={fixed ? "80px" : 0}
              left={fixed ? rightPartRef.current.offsetLeft : 0}
            >
              <CaptionCard name="Skillhet" />

              <Box mt={4}>
                <Text fontSize="24px" mt={8} mb={4}>
                  Graduates
                </Text>
                <VillageGraduatesCountryStatCard
                  village={me?.comesFrom}
                  direction="column"
                />
              </Box>

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
            borderBottom={`${tab === props.activeTab ? "2px solid #553CFB" : ""
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
