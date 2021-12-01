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
  Badge,
  SimpleGrid,
  Input,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import Logo from "components/Logo";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import ContactCard from "components/ContactCard";
import FaqAccordion from "components/FaqAccordion";

const Faq: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  
  return (
    <Fragment>
      <Box p={6}>
        <Logo type="i" />
      </Box>
      <Container maxW="container.xl" px={6}>
        <PageTitle title="FAQ" />

        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <Box w={{ base: "30%", sm: "25%" }}>
              <ContactCard />
            </Box>
          )}

          <Box w="full">
            {breakpointValue === "base" && <ContactCard />}
            <FaqAccordion />
          </Box>
        </HStack>
      </Container>

      <Box w="full" pos="fixed" bottom={0}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Faq;
