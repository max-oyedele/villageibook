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
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import MyVillageCard from "components/MyVillageCard";
import InstitutionCard from "components/InstitutionCard";

import { institutions } from "data/institutions";

const Institutions: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Header jwt={null} />
      <Container maxW="container.xl" px={6}>
        <HStack h={24}>
          <PageTitle title="Institutions" />
        </HStack>
        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <MyVillageCard />
            </Box>
          )}

          <Box w="full">
            <VStack spacing={2}>
              {institutions.map((institution) => (
                <InstitutionCard
                  key={institution.id}
                  institution={institution}
                />
              ))}
            </VStack>
          </Box>
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Institutions;
