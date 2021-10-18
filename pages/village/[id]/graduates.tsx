import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  HStack,
  VStack,
  Flex,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import VillageGraduatesCountryStatCard from "components/VillageGraduatesCountryStatCard";
import PersonalityCard from "components/PersonalityCard";

import useLeftFixed from "hooks/use-left-fixed";
import useFetchData from "hooks/use-fetch-data";


const Graduates: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { fixed } = useLeftFixed();

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { graduates, fetchVillagePageData } = useFetchData();

  useEffect(() => {
    fetchVillagePageData({ villageName: vid });
  }, [vid]);


  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Graduates" />

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
            <VillageGraduatesCountryStatCard
              village={vid as string}
              direction="row"
            />

            <VStack spacing={2} mt={6}>
              {graduates.map((user) => (
                <PersonalityCard key={user.id} user={user} />
              ))}
            </VStack>
          </Box>
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Graduates;
