import { Fragment } from "react";
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
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import PageTitle from "components/widgets/PageTitle";
import MyVillageCard from "components/MyVillageCard";
import MyPageCard from "components/MyPageCard";

import { myPages } from "data/myPages";

const villageName = "jammura";
const userName = "mohammed shah";

const MyPages: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Header />
      <Container maxW="full" p={6}>
        <Box mt={4}>
          <PageTitle title={`My Village: ${villageName}`} />
        </Box>
        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <MyVillageCard />
            </Box>
          )}

          <Box w="full">
            <Box bgColor="white" p={6}>
              <Text fontSize="14px" fontWeight="600">
                MY PAGES
                <Text display="inline" color="#36CFD1" ml={1}>({myPages.length})</Text>
              </Text>
              <VStack spacing={2} mt={6}>
                {
                  myPages.map(myPage=>(
                    <MyPageCard key={myPage.id} myPage={myPage} />
                  ))
                }
              </VStack>
              <Text fontSize="12px" fontWeight="700" color="purpleTone" textAlign="center" mt={8}>SEE ALL MY PAGES ({myPages.length})</Text>
            </Box>
          </Box>
        </HStack>
      </Container>
    </Fragment>
  );
};

export default MyPages;
