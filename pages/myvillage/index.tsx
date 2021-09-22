import { Fragment, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import {
  Container,
  HStack,
  VStack,
  SimpleGrid,
  Divider,
  Flex,
  Box,
  Text,
  Image,
  Avatar,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { MyThunkDispatch, OurStore } from "rdx/store";
import { fetchVillagePageData } from "rdx/slices/villagePage";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import PostCard from "components/PostCard";
import VillageGraduatesCard from "components/VillageGraduatesCard";
import ArticleCard from "components/ArticleCard";
import PersonalityCard from "components/PersonalityCard";
import InstitutionCard from "components/InstitutionCard";
import VideoCard from "components/VideoCard";
import FilterCard from "components/FilterCard";

import {
  totalGraduates,
  villageName,
  villageGraduates,
  countryGraduates,
} from "data/browse";

import UseLeftFixed from "hooks/use-left-fixed";
import UseVillageStats from "hooks/use-village-stats";

const Posts: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { fixed } = UseLeftFixed();
  const { villageStats } = UseVillageStats(villageName);
  
  const dispatch: MyThunkDispatch = useDispatch();
  const { posts, articles, users, institutions, videos } = useSelector((state:OurStore)=>state.villagePageReducer.pageData)

  useEffect(()=>{
    dispatch(fetchVillagePageData({villageName}))
  }, [])

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title={`My Village: ${villageName}`} />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard fixed={fixed} />
              {/* <Text fontSize="24px" my={10}>
                Filters
              </Text>
              <Box bgColor="white" borderRadius="6px" px={4} py={8}>
                <FilterCard />
              </Box> */}
            </Box>
          )}

          <Box
            w="full"
            ml={
              fixed && breakpointValue === "md"
                ? "264px"
                : breakpointValue === "md"
                ? "24px"
                : "0px"
            }
          >
            {posts.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">POSTS</Text>

                <Grid
                  templateColumns={
                    breakpointValue === "base"
                      ? "repeat(1, 1fr)"
                      : "repeat(2, 1fr)"
                  }
                  columnGap={6}
                  rowGap={8}
                  mt={6}
                >
                  {posts.slice(0, 2).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </Grid>
                <Divider my={6} />
                <Box>
                  <Link href="/myvillage/posts">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                    >
                      SEE ALL POSTS ({villageStats["posts"]})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            <Box bgColor="white" p={6} mb={6}>
              <Text fontSize="14px">VILLAGE GRADUATES</Text>
              <Divider mt={6} mb={8} />
              <VillageGraduatesCard
                totalGraduates={totalGraduates}
                villageName={villageName}
                villageGraduates={villageGraduates}
                countryGraduates={countryGraduates}
              />
            </Box>

            {articles.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">SOCIETY</Text>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  columnGap={6}
                  rowGap={10}
                  mt={6}
                >
                  {articles.slice(0, 2).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </SimpleGrid>
                <Divider my={6} />
                <Box>
                  <Link href="/myvillage/society">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                    >
                      SEE ALL ARTICLES ({villageStats["articles"]})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            {users.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">PERSONALITIES</Text>
                {breakpointValue === "md" && (
                  <VStack spacing={2} mt={6}>
                    {users.slice(0, 5).map((user) => (
                      <PersonalityCard key={user.id} user={user} />
                    ))}
                  </VStack>
                )}
                {breakpointValue === "base" && (
                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={6}>
                    {users.map((user) => (
                      <PersonalityCard key={user.id} user={user} />
                    ))}
                  </SimpleGrid>
                )}
                <Box>
                  <Link href="/myvillage/personalities">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                      mt={8}
                    >
                      SEE ALL PERSONALITIES ({villageStats["personalities"]})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            {institutions.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">INSTITUTIONS</Text>
                <VStack spacing={2} mt={6}>
                  {institutions
                    .slice(0, 3)
                    .map((institution) => (
                      <InstitutionCard
                        key={institution.id}
                        institution={institution}
                      />
                    ))}
                </VStack>
                <Box>
                  <Link href="/myvillage/institutions">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      mt={8}
                      cursor="pointer"
                    >
                      SEE ALL INSTITUTIONS ({villageStats["institutions"]})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}

            {videos.length > 0 && (
              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">VIDEOS</Text>
                <SimpleGrid
                  columns={{ base: 2, md: 3 }}
                  columnGap={4}
                  rowGap={10}
                  mt={6}
                >
                  {videos.slice(0, 6).map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </SimpleGrid>
                <Divider mt={10} mb={6} />
                <Box>
                  <Link href="/myvillage/videos">
                    <Text
                      fontSize="12px"
                      color="purpleTone"
                      textAlign="center"
                      cursor="pointer"
                    >
                      SEE ALL VIDEOS ({villageStats["videos"]})
                    </Text>
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Posts;
