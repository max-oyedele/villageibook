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
import LngSwitch from "components/LngSwitch";
import MyVillageCard from "components/MyVillageCard";
import PersonalityCard from "components/PersonalityCard";

import { personalities } from "data/myPages";

const Personalities: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [activeLng, setActiveLng] = useState("english");

  return (
    <Fragment>
      <Header jwt={null} />
      <Container maxW="full" p={6}>
        <Flex justifyContent="space-between" mt={4}>
          <PageTitle title="Personalities" />
          <LngSwitch activeLng={activeLng} setActiveLng={setActiveLng} />
        </Flex>

        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <MyVillageCard />
            </Box>
          )}

          <Box w="full">
            <VStack spacing={2}>
              {
                personalities.map(personality=>(
                  <PersonalityCard key={personality.id} personality={personality}/>
                ))
              }
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

export default Personalities;
