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

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import MyVillageCard from "components/MyVillageCard";
import ArticleCard from "components/ArticleCard";

import UseLeftFixed from "hooks/use-left-fixed";

import { articles } from "data/myvillage";

const Societies: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const { fixed } = UseLeftFixed();

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Society" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <MyVillageCard fixed={fixed} />
            </Box>
          )}

          <Box
            w="full"
            ml={fixed && breakpointValue === "md" ? "264px" : breakpointValue === "md" ? "24px" : "0px"}
          >
            <Box bgColor="white" p={6}>
              <Text fontSize="14px">
                SEE ALL ARTICLES
                <Text display="inline" color="#36CFD1" ml={1}>
                  ({articles.length})
                </Text>
              </Text>
              <Grid
                templateColumns={breakpointValue === "base" ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
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

export default Societies;
