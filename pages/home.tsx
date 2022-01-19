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
    if (posts["posts"].length > 0) { // temporary, if fetch is success, considering access_token is valid so can redirect to Feed
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

        <Box px={{ base: 6, md: 16, lg: 32 }} mt={12}>
          <Stack spacing={12} direction={{ base: "column", md: "row" }}>
            <Center w="full">
              <Box>
                <Text
                  fontSize={["xl", "2xl", "3xl", "4xl", "5xl"]}
                  fontWeight="600"
                  color="GrayText"
                  lineHeight={1.2}
                >
                  Welcome to Skillhet
                </Text>
                <Text
                  fontSize={["xl", "2xl", "3xl", "4xl", "5xl"]}
                  color="GrayText"
                  lineHeight={1.2}
                  mt={[0, 6]}
                >
                  your loved community
                </Text>
              </Box>
            </Center>
            {breakpointValue === "base" && (
              <Box px={6} mt={12}>
                <VStack spacing={4} justifyContent="space-around">
                  <Center>
                    <HStack
                      fontSize="xl"
                      fontWeight="semibold"
                      spacing={8}
                      letterSpacing={4}
                    >
                      <HStack color="#E64E90">
                        <BsDot />
                        <Text>Search</Text>
                      </HStack>
                      <HStack color="#6852FB">
                        <BsDot />
                        <Text>Connect</Text>
                      </HStack>
                      <HStack color="#36CFD1">
                        <BsDot />
                        <Text>Inspire</Text>
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
                          _hover={{ color: "#AE3CFB" }}
                        >
                          Login
                        </Text>
                      </Link>
                      <Text color="GrayText">Or</Text>
                      <Link href="/signup" passHref={true}>
                        <Text
                          color="#553CFB"
                          cursor="pointer"
                          _hover={{ color: "#AE3CFB" }}
                        >
                          Signup
                        </Text>
                      </Link>
                    </HStack>
                  </Center>
                </VStack>
              </Box>
            )}
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

        {breakpointValue === "md" && (
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
                    <Text>Search</Text>
                  </HStack>
                  <HStack color="#6852FB">
                    <BsDot />
                    <Text>Connect</Text>
                  </HStack>
                  <HStack color="#36CFD1">
                    <BsDot />
                    <Text>Inspire</Text>
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
                      _hover={{ color: "#AE3CFB" }}
                    >
                      Login
                    </Text>
                  </Link>
                  <Text color="GrayText">Or</Text>
                  <Link href="/signup" passHref={true}>
                    <Text
                      color="#553CFB"
                      cursor="pointer"
                      _hover={{ color: "#AE3CFB" }}
                    >
                      Signup
                    </Text>
                  </Link>
                </Stack>
              </Center>
            </HStack>
          </Box>
        )}

        <Box px={{ base: 6, lg: 36 }} mt={24}>
          <HomeCategoryBar />
        </Box>

        <Stack
          direction={{ base: "column", xl: "row" }}
          bgColor="grayBg"
          px={{ base: 6, lg: 32 }}
          mt={24}
        >
          <Box mt={-4} pos="relative" zIndex={0}>
            <Flex
              justifyContent={{ base: "center", xl: "end" }}
              alignItems="start"
            >
              <ReactPlayer
                className="react-player"
                url="https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4"
                // width="100%"
                height="360px"
                playing={true}
                light="/images/home-video-back.png"
              />
              {/* <Center pos="absolute" top={0} w="full" h="full">
                <Circle w={9} h={9} bgColor="gray.600" _hover={{ bgColor: "red.500", cursor: "pointer" }}>
                  <BiCaretRight fontSize="24px" color="white" />
                </Circle>
              </Center> */}
              <Box
                pos="absolute"
                top={-4}
                right={-4}
                display={{ base: "block", md: "none", xl: "block" }}
                w="50%"
                h="50%"
                bgColor="#36CFD1"
                opacity={0.5}
                zIndex={-1}
              ></Box>
            </Flex>
          </Box>
          <Center>
            <Box p={12}>
              <Text fontSize="xl" fontWeight="semibold">
                Let{"'"}s explore
              </Text>
              <Text fontSize="md" color="GrayText" mt={4}>
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
          <Text fontSize="2xl" fontWeight="semibold" mb={6}>
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
