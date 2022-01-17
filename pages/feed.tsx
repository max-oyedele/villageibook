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
  useBreakpointValue,
  useToast,
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
import GraduateStatsCard from "components/GraduateStatsCard";
import RecentUserCard from "components/RecentUserCard";
import VideoBox from "components/widgets/VideoBox";
import Loader from "components/widgets/Loader";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import InfiniteScroll from "react-infinite-scroll-component";
import { Status } from "rdx/types";

const Feed: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const { fixed } = useWindowProp();

  const rightPartRef = useRef(null);

  const tabsMobile = ["Post", "My Village", "Graduates"];
  const [activeTab, setActiveTab] = useState(tabsMobile[0]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {
    me,
    feedPageStatus,
    postStatus,
    posts,
    recentUsers,
    recentVillages,
    graduateStats,
  } = useFetchData();
  const {
    resetPosts,
    fetchMeData,
    fetchPostsData,
    fetchFeedPageData,
    fetchVillageData,
    fetchGraduateStatsData,
  } = useActionDispatch();

  useEffect(() => {
    fetchMeData();
    fetchFeedPageData({ page: 1 });
    fetchVillageData({ villageUuid: me?.comesFrom?.uuid });
    fetchGraduateStatsData({ type: "region" });
    fetchGraduateStatsData({ type: "village" });
  }, []);

  useEffect(() => {
    if (postStatus === Status.SUCCESS) {
      resetPosts();
      fetchPostsData({ page: 1 });
    }
  }, [postStatus]);

  useEffect(() => {
    if (posts && posts.length != 0) {
      const uniqueValuesSet = new Set();
      const tempData = [...data, ...posts["posts"]];
      const filteredArr = tempData.filter((obj) => {
        const isPresentInSet = uniqueValuesSet.has(obj.uuid);
        uniqueValuesSet.add(obj.uuid);
        return !isPresentInSet;
      });
      setData(filteredArr);
      if (filteredArr.length >= posts["pagination"].total) {
        setHasMore(false);
      }
      resetPosts();
    }
  }, [posts["posts"]]);

  const getMorePost = async () => {
    var p = page + 1;
    fetchPostsData({ page: p });
    setPage(p);
  };

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
              <Box bgColor="white" borderRadius="8px" boxShadow="sm" p={4}>
                <CaptionCard name="Skillhet" />
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
            {(breakpointValue === "md" ||
              (breakpointValue === "base" && activeTab === "Post")) && (
              <>
                <Box bg="white" borderRadius="4px" mb={4} p={4}>
                  <PostForm />
                </Box>
                <InfiniteScroll
                  dataLength={data?.length}
                  next={getMorePost}
                  hasMore={hasMore}
                  loader={<Loader loading={true} />}
                >
                  <VStack spacing={4}>
                    {data?.map((post) => (
                      <PostCard key={post.uuid} post={post} />
                    ))}
                  </VStack>
                </InfiniteScroll>
              </>
            )}
            {breakpointValue === "base" && activeTab === "My Village" && (
              <Box>
                <LeftVillageItems village={me?.comesFrom} badgeShow={true} />
                <Text fontSize="20px" mt={12} mb={6}>
                  Recently developed
                </Text>
                <VStack spacing={4}>
                  {recentVillages.map((village) => (
                    <RecentVillageCard key={village.name} village={village} />
                  ))}
                </VStack>

                {/* <Link href={`https://www.fundsurfer.com/crowdfund/villageibook?token=975ab55f35fefbd176774045369a62ba`} passHref={true}>
                      <Button
                        px={4}
                        h="26px"
                        fontSize="12px"
                        fontWeight="400"
                        bgColor="#FFB425"
                        color="white"                        
                      >
                        Sponsor VillageIbook
                      </Button>
                    </Link> */}
              </Box>
            )}
            {breakpointValue === "base" && activeTab === "Graduates" && (
              <Box>
                <GraduateStatsCard
                  type="region"
                  graduateStats={graduateStats}
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
              <GraduateStatsCard type="region" graduateStats={graduateStats} />

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
