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
import SocietyCard from "components/SocietyCard";

import { articles } from "data/society";

const Society: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Header jwt={null} />
      <Container maxW="container.xl" px={6}>
        <HStack h={24}>
          <PageTitle title="Society" />
        </HStack>
        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <MyVillageCard />
            </Box>
          )}

          <Box w="full">
            <Box bgColor="white" p={6}>
              <Text fontSize="14px">
                SEE ALL ARTICLES
                <Text display="inline" color="#36CFD1" ml={1}>
                  ({articles.length})
                </Text>
              </Text>
              <Grid
                templateColumns="repeat(2, 1fr)"
                columnGap={6}
                rowGap={10}
                mt={6}
              >
                {articles.map((article) => (
                  <SocietyCard key={article.id} society={article} />
                ))}
              </Grid>
            </Box>
          </Box>
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Society;
