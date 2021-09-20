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

import UseLeftFixed from "hooks/use-left-fixed";

import { institutions } from "data/institutions";

const Institutions: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const {fixed} = UseLeftFixed();

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Institutions" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <MyVillageCard fixed={fixed} />
            </Box>
          )}

          <Box w="full" ml={fixed && breakpointValue === "md" ? "264px" : breakpointValue === "md" ? "24px" : "0px"}>
            <VStack spacing={2}>
              {institutions.map((institution) => (
                <InstitutionCard
                  key={institution.id}
                  institution={institution}
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

export default Institutions;
