import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import {
  Container,
  Flex,
  Center,
  Box,
  Text,
  Stack,
  HStack,
  SimpleGrid,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import ReactPlayer from "react-player/lazy";

import Logo from "components/Logo";
import Footer from "components/Footer";

import HomeSlick from "components/HomeSlick";
import HomeSlickControl from "components/HomeSlickControl";
import HomeCategoryBar from "components/HomeCategoryBar";
import FaqAccordion from "components/FaqAccordion";
import router from "next/router";

const Home: NextPage = () => {
  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
  });

  const heroImgSlideConf = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <Box bgColor="white" py={4}>
        <Center w="full">
          <Logo />
        </Center>

        <Box px={{ base: 6, md: 32 }} mt={12}>
          <Stack spacing={12} direction={{ base: "column", md: "row" }}>
            <Flex w="full" flexDirection={"column"} justifyContent={"center"}>
              <Text
                textAlign={{ base: "center", md: "left" }}
                fontSize="4xl"
                fontWeight="600"
                color="GrayText"
                lineHeight={1.2}
              >
                Welcome to Skillhet
              </Text>
              <Text
                textAlign={{ base: "center", md: "left" }}
                fontSize="4xl"
                color="GrayText"
                mt={2}
              >
                your loved community
              </Text>

              {breakpointValue === "md" && (
                <HStack spacing={4} mt={24}>
                  <Button onClick={() => router.push("/login")}>
                    Get Started
                  </Button>
                  <Button onClick={() => router.push("/signup")}>
                    Join Community
                  </Button>
                </HStack>
              )}
            </Flex>
            <Box w="full">
              {/* <Slider {...heroImgSlideConf}>
                {[1, 2, 3, 4].map((number) => (
                  <Box key={number} index={number}>
                    <Image
                      src={`/images/logo-img.svg`}
                      alt=""
                      w="full"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Slider> */}
              <Image
                src={`/images/logo-img.svg`}
                alt=""
                w="full"
                objectFit="cover"
              />
            </Box>
          </Stack>
        </Box>

        <Box px={{ base: 6, md: 36 }} mt={24}>
          <HomeCategoryBar />
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          bgColor="grayBg"
          px={{ base: 6, md: 32 }}
          mt={24}
        >
          <Box mt={-4}>
            <ReactPlayer
              className="react-player"
              url="https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4"
              width="100%"
              height="100%"
              playing={true}
            />
          </Box>
          <Center>
            <Box p={12}>
              <Text fontSize="xl" fontWeight="semibold">Let{"'"}s explore</Text>
              <Text fontSize="md" color="GrayText" mt={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.</Text>
            </Box>
          </Center>
        </SimpleGrid>

        <Box w={{base: "100%", md: "70%"}} px={{ base: 6, md: 36 }} mt={24}>
          <Text fontSize="2xl" fontWeight="semibold" mb={6}>FAQ</Text>
          <FaqAccordion />
        </Box>

        <Box mt={24}>
          <Footer />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Home;
