import { Fragment } from "react";
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

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import MyVillageCard from "components/MyVillageCard";
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
  posts,
} from "data/browse";

import { articles, personalities, institutions, videos } from "data/myvillage";

import UseLeftFixed from "hooks/use-left-fixed";

const Posts: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { fixed } = UseLeftFixed();

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title={`My Village: ${villageName}`} />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <MyVillageCard fixed={fixed} />
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
            <Box bgColor="white" p={6}>
              <Text fontSize="14px">
                POSTS
                <Text display="inline" color="#36CFD1" ml={1}>
                  ({posts.length})
                </Text>
              </Text>

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
                {posts.map((post) => (
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
                    SEE ALL POSTS ({posts.length})
                  </Text>
                </Link>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px">
                VILLAGE GRADUATES
                <Text display="inline" color="purpleTone" ml={1}>
                  ({villageGraduates})
                </Text>
              </Text>
              <Divider mt={6} mb={8} />
              <VillageGraduatesCard
                totalGraduates={totalGraduates}
                villageName={villageName}
                villageGraduates={villageGraduates}
                countryGraduates={countryGraduates}
              />
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px">
                SOCIETY
                <Text display="inline" color="GrayText" ml={1}>
                  ({articles.length})
                </Text>
              </Text>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                columnGap={6}
                rowGap={10}
                mt={6}
              >
                {articles.map((article) => (
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
                    SEE ALL ARTICLES ({articles.length})
                  </Text>
                </Link>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px">
                PERSONALITIES
                <Text display="inline" color="#FFC418" ml={1}>
                  ({personalities.length})
                </Text>
              </Text>
              {breakpointValue === "md" && (
                <VStack spacing={2} mt={6}>
                  {personalities.map((user) => (
                    <PersonalityCard
                      key={user.id}
                      user={user}
                    />
                  ))}
                </VStack>
              )}
              {breakpointValue === "base" && (
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={6}>
                  {personalities.map((user) => (
                    <PersonalityCard
                      key={user.id}
                      user={user}
                    />
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
                    SEE ALL PERSONALITIES ({personalities.length})
                  </Text>
                </Link>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px">
                INSTITUTIONS
                <Text display="inline" color="#FFC418" ml={1}>
                  ({institutions.length})
                </Text>
              </Text>
              <VStack spacing={2} mt={6}>
                {institutions.map((institution) => (
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
                    SEE ALL INSTITUTIONS ({institutions.length})
                  </Text>
                </Link>
              </Box>
            </Box>

            <Box bgColor="white" p={6} mt={6}>
              <Text fontSize="14px">
                VIDEOS
                <Text display="inline" color="#FFC418" ml={1}>
                  ({videos.length})
                </Text>
              </Text>
              <SimpleGrid
                columns={{ base: 2, md: 3 }}
                columnGap={4}
                rowGap={10}
                mt={6}
              >
                {videos.map((video) => (
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
                    SEE ALL VIDEOS ({videos.length})
                  </Text>
                </Link>
              </Box>
            </Box>
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
