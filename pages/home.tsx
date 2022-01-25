import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsDot } from "react-icons/bs";
import { BiCaretRight } from "react-icons/bi";

import {
  Container,
  Flex,
  Center,
  Circle,
  Box,
  Text,
  Stack,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import ReactPlayer from "react-player/lazy";

import Logo from "components/Logo";
import Footer from "components/Footer";

import HomeCategoryBar from "components/HomeCategoryBar";
import FaqAccordion from "components/FaqAccordion";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const Home: NextPage = () => {
  const router = useRouter();
  const { posts } = useFetchData();
  const { fetchFeedPageData } = useActionDispatch();

  useEffect(() => {
    fetchFeedPageData({ page: 1 });
  }, []);

  useEffect(() => {    
    if (posts["posts"]?.length > 0) { // temporary, if fetch is success, considering access_token is valid so can redirect to Feed
      router.push("/feed");
    }    
  }, [posts]);

  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "md",
  });

  return (
    <Fragment>
      <Box bgColor="white" pt={6}>
        <Center w="full">
          <Logo />
        </Center>

        {breakpointValue === "base" && (
          <Box px={{ base: 6, md: 16, lg: 32 }} mt={8}>
            <Stack spacing={12} direction={{ base: "column", md: "row" }}>
              <Center w="full">
                <Box>
                  <Text
                    fontSize="32px"
                    fontWeight="600"
                    color="GrayText"
                    lineHeight="40px"
                    fontFamily="Sofia Pro"
                    textAlign="center"
                  >
                    Welcome to Skillhet
                  </Text>
                  <Text
                    fontSize="32px"
                    fontWeight="600"
                    color="GrayText"
                    lineHeight="40px"
                    fontFamily="Sofia Pro"
                    textAlign="center"
                    mt={[0, 6]}
                  >
                    your loved community
                  </Text>
                </Box>
              </Center>
              <Box px={6} mt={10}>
                <VStack spacing={4} justifyContent="space-around">
                  <Center>
                    <HStack
                      fontSize="xl"
                      fontWeight="semibold"
                      spacing={8}
                    >
                      <HStack color="#E64E90">
                        <BsDot />
                        <Text
                          fontSize="20px"
                          lineHeight="32px"
                          fontWeight="600"
                        >Search</Text>
                      </HStack>
                      <HStack color="#6852FB">
                        <BsDot />
                        <Text
                          fontSize="20px"
                          lineHeight="32px"
                          fontWeight="600"
                        >Connect</Text>
                      </HStack>
                      <HStack color="#36CFD1">
                        <BsDot />
                        <Text
                          fontSize="20px"
                          lineHeight="32px"
                          fontWeight="600"
                        >Inspire</Text>
                      </HStack>
                    </HStack>
                  </Center>
                  <Center>
                    <HStack
                      fontSize="xl"
                      fontWeight="semibold"
                      textAlign="center"
                      spacing={8}
                      letterSpacing={4}
                    >
                      <Link href="/login" passHref={true}>
                        <Text
                          color="#553CFB"
                          cursor="pointer"
                          fontSize="20px"
                          lineHeight="32px"
                          fontWeight="600"
                          _hover={{ color: "#AE3CFB" }}
                        >
                          Login
                        </Text>
                      </Link>
                      <Text
                        color="GrayText"
                        fontSize="20px"
                        lineHeight="32px"
                        fontWeight="600"
                      >Or</Text>
                      <Link href="/signup" passHref={true}>
                        <Text
                          color="#553CFB"
                          cursor="pointer"
                          fontSize="20px"
                          lineHeight="32px"
                          fontWeight="600"
                          _hover={{ color: "#AE3CFB" }}
                        >
                          Signup
                        </Text>
                      </Link>
                    </HStack>
                  </Center>
                </VStack>
              </Box>
              <Box w="full">
                <Image
                  src={`/images/logo-img.svg`}
                  alt=""
                  w="full"
                  objectFit="cover"
                />
              </Box>
            </Stack>
          </Box>
        )}

        {breakpointValue === "md" && (
          <Box px={{ base: 6, md: 16, lg: 32 }} mt={8}>
            <Stack spacing={12} direction={{ base: "column", md: "row" }}>
              <Center w="full">
                <Box>
                  <Text
                    fontSize="48px"
                    fontWeight="600"
                    color="GrayText"
                    lineHeight="64px"
                    fontFamily="Sofia Pro"
                  >
                    Welcome to Skillhet
                  </Text>
                  <Text
                    fontSize="48px"
                    fontWeight="600"
                    color="GrayText"
                    lineHeight="64px"
                    fontFamily="Sofia Pro"
                    mt={[0, 6]}
                  >
                    your loved community
                  </Text>
                </Box>
              </Center>
              <Box w="full">
                <Image
                  src={`/images/logo-img.svg`}
                  alt=""
                  w="full"
                  objectFit="cover"
                />
              </Box>
            </Stack>
            <Box px={36} mt={24}>
              <HStack spacing={4} justifyContent="space-around">
                <Center>
                  <Stack
                    fontSize="3xl"
                    fontWeight="semibold"
                    spacing={8}
                    letterSpacing={4}
                  >
                    <HStack color="#E64E90">
                      <BsDot />
                      <Text fontSize="32px" lineHeight="56px" fontWeight="600">Search</Text>
                    </HStack>
                    <HStack color="#6852FB">
                      <BsDot />
                      <Text fontSize="32px" lineHeight="56px" fontWeight="600">Connect</Text>
                    </HStack>
                    <HStack color="#36CFD1">
                      <BsDot />
                      <Text fontSize="32px" lineHeight="56px" fontWeight="600">Inspire</Text>
                    </HStack>
                  </Stack>
                </Center>
                <Center>
                  <Stack
                    fontSize="3xl"
                    fontWeight="semibold"
                    textAlign="center"
                    spacing={8}
                    letterSpacing={4}
                  >
                    <Link href="/login" passHref={true}>
                      <Text
                        color="#553CFB"
                        cursor="pointer"
                        fontSize="32px"
                        lineHeight="56px"
                        fontWeight="600"
                        _hover={{ color: "#AE3CFB" }}
                      >
                        Login
                      </Text>
                    </Link>
                    <Text
                      color="GrayText"
                      fontSize="32px"
                      lineHeight="56px"
                      fontWeight="600"
                    >Or</Text>
                    <Link href="/signup" passHref={true}>
                      <Text
                        color="#553CFB"
                        cursor="pointer"
                        fontSize="32px"
                        lineHeight="56px"
                        fontWeight="600"
                        _hover={{ color: "#AE3CFB" }}
                      >
                        Signup
                      </Text>
                    </Link>
                  </Stack>
                </Center>
              </HStack>
            </Box>
          </Box>
        )}

        <Box px={{ base: 6, lg: 36 }} mt={24}>
          <HomeCategoryBar />
        </Box>

        <Stack
          direction={{ base: "column", xl: "row" }}
          bgColor="#F6F7F9"
          px={{ base: 6, lg: 32 }}
          mt={24}
        >
          <Box mt={breakpointValue === "md" ? -4 : 0} pos="relative" zIndex={0}>
            <Flex
              justifyContent={{ base: "center", xl: "end" }}
              alignItems="start"
            >
              <ReactPlayer
                className="react-player"
                url="https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4"
                // width="100%"
                height={breakpointValue === "md" ? "360px" : "200px"}
                playing={true}
                playIcon={
                  breakpointValue === "md" ?
                    <Center pos="absolute" top={0} w="full" h="full">
                      <Circle w="118px" h="118px" bgColor="gray.600" _hover={{ bgColor: "red.500", cursor: "pointer" }}>
                        <BiCaretRight fontSize="48px" width="50%" color="white" />
                      </Circle>
                    </Center> :
                    <Center pos="absolute" top={0} w="full" h="full">
                      <Circle w="64px" h="64px" bgColor="gray.600" _hover={{ bgColor: "red.500", cursor: "pointer" }}>
                        <BiCaretRight fontSize="48px" width="50%" color="white" />
                      </Circle>
                    </Center>
                  }
                light="/images/home-video-back.png"
              />
              <Box
                pos="absolute"
                top={-6}
                right={-6}
                display="block"
                w="45%"
                h="40%"
                bgColor="#36CFD1"
                zIndex={-1}
              ></Box>
            </Flex>
          </Box>
          <Center>
            <Box p={12}>
              <Text fontSize={{ base: "32px", md: "36px"}} lineHeight={{ base: "32px", md: "36px"}} fontWeight="semibold">
                Let{"'"}s explore
              </Text>
              <Text fontSize={{ base: "16px", md: "20px"}} lineHeight={{ base: "24px", md: "28px"}} color="#8888A8" fontWeight="400" mt={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                auctor euismod lobortis. Mauris ornare ante non justo mattis,
                vitae fermentum ligula consequat. Donec ac quam sit amet libero.
                Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante
                mauris, non elementum purus luctus sit amet. Nullam sed elit
                lectus.
              </Text>
            </Box>
          </Center>
        </Stack>

        <Box w={{ base: "100%", md: "70%" }} px={{ base: 6, md: 36 }} mt={24}>
          <Text fontSize={{ base: "32px", md: "36px"}} lineHeight={{ base: "32px", md: "36px"}} fontWeight="semibold" mb={6}>
            FAQ
          </Text>
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
