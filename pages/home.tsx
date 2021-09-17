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

const Home: NextPage = () => {
  return (
    <Fragment>
      <Flex pos="absolute" top={6} right={6} justifyContent="end">
        <Link href="/login">Login</Link>
      </Flex>
      <Center h="100vh" fontSize="5xl">
        Welcome Villageibook
      </Center>
    </Fragment>
  );
};

export default Home;
