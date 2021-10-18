import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  VStack,
  Flex,
  Box,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import ArticleCard from "components/ArticleCard";

import useLeftFixed from "hooks/use-left-fixed";
import useFetchData from "hooks/use-fetch-data";

const Society: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = useLeftFixed();

  const { articles, fetchVillagePageData } = useFetchData();

  useEffect(()=>{
    fetchVillagePageData({villageName: vid})
  }, [vid])

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Society" />
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
            {articles.length > 0 && (
              <Box bgColor="white" p={6}>
                <Grid
                  templateColumns={
                    breakpointValue === "base"
                      ? "repeat(1, 1fr)"
                      : "repeat(2, 1fr)"
                  }
                  columnGap={6}
                  rowGap={12}
                >
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Society;
