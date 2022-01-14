import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  VStack,
  SimpleGrid,
  Divider,
  Flex,
  Box,
  Center,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import SearchBar from "components/SearchBar";
import LeftVillageCard from "components/LeftVillageCard";
import UserCard from "components/UserCard";
import GraduatesLocationStatCard from "components/GraduatesLocationStatCard";
import StoryCard from "components/StoryCard";
import PersonalityCard from "components/PersonalityCard";
import InstitutionCard from "components/InstitutionCard";
import VideoCard from "components/VideoCard";
import PhotoCard from "components/PhotoCard";
import FilterCard from "components/FilterCard";
import Loader from "components/widgets/Loader";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const Posts: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village uuid

  const {
    village,
    villageUsers,
    villageStories,
    villagePersonalities,
    villageInstitutions,
    villageVideos,
    villagePhotos,
  } = useFetchData();
  const { fetchVillageData, fetchVillagePageData } = useActionDispatch();

  const { fixed } = useWindowProp();

  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");

  useEffect(() => {
    if (vid) {
      setLoading(true);
      fetchVillageData({ villageUuid: vid });
      fetchVillagePageData({ villageUuid: vid });
      setLink("/village/" + vid);
    }
  }, [vid]);

  if (village && loading) {
    setLoading(false);
  }

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <Box px={{ lg: 20 }} my={{ base: 16, md: 8 }}>
          <SearchBar />
        </Box>

        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={village} fixed={fixed} />
              {/* <Text fontSize="24px" my={10}>
                Filters
              </Text>
              <Box bgColor="white" borderRadius="6px" px={4} py={8}>
                <FilterCard />
              </Box> */}
            </Box>
          )}

          {loading && <Loader loading={loading} />}
          {!loading && (
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
              {villageUsers && villageUsers["users"].length > 0 && (
                <Box bgColor="white" p={6} mb={6}>
                  <Text fontSize="14px">MY PAGES</Text>

                  {breakpointValue === "md" && (
                    <VStack spacing={2} mt={6}>
                      {villageUsers["users"].slice(0, 5).map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </VStack>
                  )}
                  {breakpointValue === "base" && (
                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={6}>
                      {villageUsers["users"].map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </SimpleGrid>
                  )}
                  <Center>
                    <Link href={link + "/users"} passHref={true}>
                      <Text
                        fontSize="12px"
                        color="purpleTone"
                        cursor="pointer"
                        mt={8}
                      >
                        SEE ALL MY PAGES ({villageUsers["users"].length})
                      </Text>
                    </Link>
                  </Center>
                </Box>
              )}

              <Box bgColor="white" p={6} mb={6}>
                <Text fontSize="14px">VILLAGE GRADUATES</Text>
                {/* <Divider mt={6} mb={8} /> */}
                <Box mt={4}>
                  <GraduatesLocationStatCard
                    location={village}
                    condition="universityCountries"
                    direction="row"
                  />
                </Box>
              </Box>

              {villageStories && villageStories["stories"].length > 0 && (
                <Box bgColor="white" p={6} mb={6}>
                  <Text fontSize="14px">SOCIETY</Text>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    columnGap={6}
                    rowGap={10}
                    mt={6}
                  >
                    {villageStories["stories"].slice(0, 2).map((story) => (
                      <StoryCard key={story.uuid} story={story} />
                    ))}
                  </SimpleGrid>
                  <Divider my={6} />
                  <Center>
                    <Link href={link + "/stories"} passHref={true}>
                      <Text
                        fontSize="12px"
                        color="purpleTone"
                        textAlign="center"
                        cursor="pointer"
                      >
                        SEE ALL STORIES ({villageStories["stories"].length})
                      </Text>
                    </Link>
                  </Center>
                </Box>
              )}

              {villagePersonalities &&
                villagePersonalities["personalities"].length > 0 && (
                  <Box bgColor="white" p={6} mb={6}>
                    <Text fontSize="14px">PERSONALITIES</Text>
                    {breakpointValue === "md" && (
                      <VStack spacing={2} mt={6}>
                        {villagePersonalities["personalities"]
                          .slice(0, 5)
                          .map((personality) => (
                            <PersonalityCard
                              key={personality.uuid}
                              personality={personality}
                            />
                          ))}
                      </VStack>
                    )}
                    {breakpointValue === "base" && (
                      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} mt={6}>
                        {villagePersonalities["personalities"].map(
                          (personality) => (
                            <PersonalityCard
                              key={personality.uuid}
                              personality={personality}
                            />
                          )
                        )}
                      </SimpleGrid>
                    )}
                    <Center>
                      <Link href={link + "/personalities"} passHref={true}>
                        <Text
                          fontSize="12px"
                          color="purpleTone"
                          textAlign="center"
                          cursor="pointer"
                          mt={8}
                        >
                          SEE ALL PERSONALITIES (
                          {villagePersonalities["personalities"].length})
                        </Text>
                      </Link>
                    </Center>
                  </Box>
                )}

              {villageInstitutions &&
                villageInstitutions["institutions"].length > 0 && (
                  <Box bgColor="white" p={6} mb={6}>
                    <Text fontSize="14px">INSTITUTIONS</Text>
                    <VStack spacing={2} mt={6}>
                      {villageInstitutions["institutions"]
                        .slice(0, 3)
                        .map((institution) => (
                          <InstitutionCard
                            key={institution.id}
                            institution={institution}
                          />
                        ))}
                    </VStack>
                    <Center>
                      <Link href={link + "/institutions"} passHref={true}>
                        <Text
                          fontSize="12px"
                          color="purpleTone"
                          textAlign="center"
                          mt={8}
                          cursor="pointer"
                        >
                          SEE ALL INSTITUTIONS (
                          {villageInstitutions["institutions"].length})
                        </Text>
                      </Link>
                    </Center>
                  </Box>
                )}

              {villageVideos && villageVideos["videos"].length > 0 && (
                <Box bgColor="white" p={6} mb={6}>
                  <Text fontSize="14px">VIDEOS</Text>
                  <SimpleGrid
                    columns={{ base: 2, md: 3 }}
                    columnGap={4}
                    rowGap={10}
                    mt={6}
                  >
                    {villageVideos &&
                      villageVideos["videos"]
                        .slice(0, 6)
                        .map((video) => (
                          <VideoCard key={video.id} video={video} />
                        ))}
                  </SimpleGrid>
                  <Divider mt={10} mb={6} />
                  <Center>
                    <Link href={link + "/videos"} passHref={true}>
                      <Text
                        fontSize="12px"
                        color="purpleTone"
                        textAlign="center"
                        cursor="pointer"
                      >
                        SEE ALL VIDEOS (
                        {villageVideos && villageVideos["videos"].length})
                      </Text>
                    </Link>
                  </Center>
                </Box>
              )}

              {/* {villagePhotos.length > 0 && (
                <Box bgColor="white" p={6} mb={6}>
                  <Text fontSize="14px">PHOTOS</Text>
                  <SimpleGrid
                    columns={{ base: 2, md: 3 }}
                    columnGap={4}
                    rowGap={10}
                    mt={6}
                  >
                    {villagePhotos.slice(0, 6).map((photo) => (
                      <PhotoCard key={photo.id} photo={photo} />
                    ))}
                  </SimpleGrid>
                  <Divider mt={10} mb={6} />
                  <Center>
                    <Link href="/village/photos" passHref={true}>
                      <Text
                        fontSize="12px"
                        color="purpleTone"
                        textAlign="center"
                        cursor="pointer"
                      >
                        SEE ALL PHOTOS ({villagePhotos.length})
                      </Text>
                    </Link>
                  </Center>
                </Box>
              )} */}
            </Box>
          )}
        </Flex>
      </Container>

      <Box bg="white" mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Posts;
