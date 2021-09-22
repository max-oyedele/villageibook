import { Fragment, useState } from "react";
import type { NextPage } from "next";

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
  Button,
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

import UseLeftFixed from "hooks/use-left-fixed";

import { villageName } from "data/browse";

const Posts: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const { fixed } = UseLeftFixed();
  
  const dispatch: MyThunkDispatch = useDispatch();
  const { posts, articles, users, institutions, videos } = useSelector((state:OurStore)=>state.villagePageReducer.pageData)

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Posts" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard fixed={fixed} />
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
            <Grid
              templateColumns={
                breakpointValue === "base" ? "repeat(1, 1fr)" : "repeat(2, 1fr)"
              }
              columnGap={6}
              rowGap={8}
            >
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Grid>
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
