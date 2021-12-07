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
import PersonalityCard from "components/PersonalityCard";
import Alert from "components/widgets/Alert";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";

const Personalities: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { fixed } = useWindowProp();

  const { village, villagePersonalities, fetchVillagePersonalitiesData } = useFetchData();

  useEffect(() => {
    if (vid) {
      fetchVillagePersonalitiesData({ villageUuid: vid });
    }
  }, [vid]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Personalities" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={village} fixed={fixed} />
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
            <VStack spacing={2}>
              {villagePersonalities.length > 0 &&
                villagePersonalities.map((user) => (
                  <PersonalityCard key={user.id} user={user} />
                ))}
              {villagePersonalities.length == 0 && (
                <Alert message="There is no personality to be displayed." />
              )}
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

export default Personalities;
