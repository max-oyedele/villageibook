import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
  Image,
  Textarea,
  AspectRatio,
  Center,
  Circle,
  useBreakpointValue,
} from "@chakra-ui/react";

import Logo from "components/Logo";
import Footer from "components/Footer";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Flex pos="fixed" top={6} w="full" justifyContent="space-between" px={6} zIndex={10}>
        <Logo />
        <HStack spacing={8}>
          <Box fontSize="14px">
            <Link href="/login">Login</Link>
          </Box>
          <Box
            px={4}
            h="24px"
            textAlign="center"
            color="purpleTone"
            fontSize="14px"
            border="1px"
            borderColor="purpleTone"
            borderRadius="6px"
            cursor="pointer"
          >
            <Link href="/signup">Create Account</Link>
          </Box>
        </HStack>
      </Flex>
      <Box>
        <Flex pos="relative" flexDirection="column" justifyContent="center">
          <Image src="/images/hero.png" alt="" w="full" objectFit="cover" />
          <Box pos="absolute" left={20}>
            <Text fontSize="5xl">VillageiBook</Text>
            <Text fontSize="lg" color="purpleTone" mt={8}>Connecting village community worldwide</Text>
            
          </Box>
          
        </Flex>
      </Box>

      <Box pos="fixed" bottom={0} w="full">
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Home;
