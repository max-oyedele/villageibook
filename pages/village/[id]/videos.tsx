import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Text,
  Image,
  Avatar,
  SimpleGrid,
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
import VideoCard from "components/VideoCard";

import useLeftFixed from "hooks/use-left-fixed";

const Videos: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = useLeftFixed();

  const dispatch: MyThunkDispatch = useDispatch();
  const { users, articles, personalities, institutions, videos } = useSelector(
    (state: OurStore) => state.villagePageReducer.pageData
  );
  useEffect(() => {
    dispatch(fetchVillagePageData({ villageName: vid }));
  }, [vid]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Videos" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={vid as string} fixed={fixed} />
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
            <SimpleGrid
              columns={{ base: 2, md: 3 }}
              columnGap={4}
              rowGap={10}
              bgColor="white"
              border="1px"
              borderRadius="8px"
              borderColor="gray.200"
              p={4}
            >
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Videos;
