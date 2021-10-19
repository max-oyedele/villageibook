import { Fragment, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Container,
  VStack,
  Flex,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import InstitutionCard from "components/InstitutionCard";
import Alert from "components/widgets/Alert";

import useWindowProp from "hooks/use-window-prop";
import useFetchData from "hooks/use-fetch-data";

const Institutions: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { fixed } = useWindowProp();

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const { villageInstitutions, fetchVillageInstitutionsData } = useFetchData();

  useEffect(() => {
    if (vid) {
      fetchVillageInstitutionsData({ villageName: vid });
    }
  }, [vid]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Institutions" />
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
            <VStack spacing={2}>
              {villageInstitutions.length > 0 &&
                villageInstitutions.map((institution) => (
                  <InstitutionCard
                    key={institution.id}
                    institution={institution}
                  />
                ))}
              {villageInstitutions.length == 0 && (
                <Alert message="There is no institution to be displayed." />
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

export default Institutions;
