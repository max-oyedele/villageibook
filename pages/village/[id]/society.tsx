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
import ArticleCard from "components/ArticleCard";

import UseLeftFixed from "hooks/use-left-fixed";

const Society: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = UseLeftFixed();

  const dispatch: MyThunkDispatch = useDispatch();
  const { users, articles, personalities, institutions, videos } = useSelector(
    (state: OurStore) => state.villagePageReducer.pageData
  );
  useEffect(() => {
    dispatch(fetchVillagePageData({ villageName: vid }));
  }, []);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Society" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={vid} fixed={fixed} />
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
                SEE ALL ARTICLES
                <Text display="inline" color="#36CFD1" ml={1}>
                  ({articles.length})
                </Text>
              </Text>
              <Grid
                templateColumns={
                  breakpointValue === "base"
                    ? "repeat(1, 1fr)"
                    : "repeat(2, 1fr)"
                }
                columnGap={6}
                rowGap={12}
                mt={6}
              >
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </Grid>
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

export default Society;
