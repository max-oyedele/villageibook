import { Fragment, useState, useEffect } from "react";
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
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import MyVillageCard from "components/MyVillageCard";
import PersonalityCard from "components/PersonalityCard";

import UseLeftFixed from "hooks/use-left-fixed";
import { personalities } from "data/myPage";

const Personalities: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const {fixed} = UseLeftFixed();

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Personalities" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <MyVillageCard fixed={fixed} />
            </Box>
          )}

          <Box w="full" ml={fixed && breakpointValue === "md" ? "264px" : breakpointValue === "md" ? "24px" : "0px"}>
            <VStack spacing={2}>
              {personalities.map((personality) => (
                <PersonalityCard
                  key={personality.id}
                  personality={personality}
                />
              ))}
            </VStack>
          </Box>
        </Flex>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Personalities;
