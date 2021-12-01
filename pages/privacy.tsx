import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import {
  Container,
  Flex,
  Box,
  Text,
  Stack,
  HStack,
  VStack,
  Divider,
  Button,
  Image,
  Textarea,
  AspectRatio,
  Center,
  Circle,
  Progress,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";

import Logo from "components/Logo";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";

const Privacy: NextPage = () => {
  return (
    <Fragment>
      <Box p={6}>
        <Logo type="i" />
      </Box>
      <Container px={{ base: 6, md: 32 }} minW="full">
        <PageTitle title="Privacy Policy" />
        <Text fontSize="16px" color="GrayText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor
          euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum
          ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui
          ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus
          luctus sit amet. Nullam sed elit lectus.
        </Text>

        <Text fontSize="16px" color="GrayText" mt={6}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor
          euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum
          ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui
          ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus
          luctus sit amet. Nullam sed elit lectus.
        </Text>
        
        <Text fontSize="16px" color="GrayText" mt={6}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor
          euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum
          ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui
          ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus
          luctus sit amet. Nullam sed elit lectus.
        </Text>
      </Container>

      <Box pos="fixed" bottom={0} w="full">
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Privacy;
