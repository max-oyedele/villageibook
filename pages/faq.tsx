import React, { Fragment, useState } from "react";
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  SimpleGrid,
  Input,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";

const Faq: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Header />
      <Container maxW="full" p={6}>
        <Flex justifyContent="space-between" mt={4}>
          <PageTitle title="FAQ" />
        </Flex>

        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              
            </Box>
          )}

          <Box w="full"></Box>
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Faq;