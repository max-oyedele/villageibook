import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

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
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import PersonalityCard from "components/PersonalityCard";

import { users } from "data/village";
import { User } from "types/schema";

const UserView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const user = users.find((item) => item.id == Number(id));
    setUser(user);
  }, [id]);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6} mt={8} mb={48}>
        {/* <PageTitle title={user?.firstName + " " + user?.lastName ?? ""} /> */}

        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <VStack minW="max-content" spacing={6}>
              <Image
                src={user?.img}
                w="200px"
                h="200px"
                fit="cover"
                alt=""
                borderRadius="full"
              />

              <Text fontSize="18px" textTransform="capitalize">
                {user.firstName} {user.lastName}
              </Text>

              {/* <Text fontSize="18px" mt={12}>
                My Photos
              </Text> */}
              {/* <VStack spacing={6} mt={8}>
                {user?.details?.photos.map((photo, index) => (
                  <Image key={index} src={photo} w="200px" fit="cover" alt="" />
                ))}
              </VStack> */}
            </VStack>
          )}

          <Box
            w="full"
            bgColor="white"
            borderRadius="8px"
            border="1px"
            borderColor="gray.300"
          >
            <Flex flexDirection="column" p={6}>
              {breakpointValue === "base" && (
                <VStack mb={6}>
                  <Image
                    src={user?.img}
                    w="full"
                    fit="cover"
                    borderRadius="full"
                    alt=""
                    mb={6}
                  />

                  <Text fontSize="18px" textTransform="capitalize">
                    {user.firstName} {user.lastName}
                  </Text>
                </VStack>
              )}
              <Text fontSize="18px">Personal Info</Text>
              <VStack
                w={{ base: "full", md: "400px" }}
                spacing={2}
                divider={<Divider />}
                mt={6}
              >
                <HStack w="full">
                  <Box w="full" fontSize="13px" color="purpleTone">
                    Living in
                  </Box>
                  <Box
                    w="full"
                    fontSize="13px"
                    color="GrayText"
                    textTransform="capitalize"
                  >
                    {user?.village}
                  </Box>
                </HStack>
                {user?.graduatedAt && (
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Graduated in
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {user?.graduatedAt}
                    </Box>
                  </HStack>
                )}
                {user?.university && (
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      University
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {user?.university}
                    </Box>
                  </HStack>
                )}
                {user?.degree && (
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Degree
                    </Box>
                    <Box w="full" fontSize="13px" color="GrayText" textTransform="capitalize">
                      {user?.degree}
                    </Box>
                  </HStack>
                )}
                <HStack w="full">
                  <Box w="full" fontSize="13px" color="purpleTone">
                    Email
                  </Box>
                  <Box
                    w="full"
                    fontSize="13px"
                    color="GrayText"
                  >
                    {user?.email}
                  </Box>
                </HStack>
              </VStack>
              {user?.role === "premium" && (
                <>
                  <Text fontSize="18px" mt={12}>
                    About me
                  </Text>
                  <Text
                    fontSize="15px"
                    fontWeight="400"
                    color="GrayText"
                    mt={6}
                  >
                    I am a recent English and Creative Writing graduate from the
                    University of Birmingham, with particular focus on English
                    Literature. My teaching is based on essay plans, writing
                    practice and close analysis of texts significant to the
                    student&apos;s course.
                    <br />
                    <br />
                    Since the age of fifteen I have been writing creatively. By
                    sixteen, I finished my first book. Currently, I am in the
                    progress of writing a historical fantasy novel exploring
                    witch hunts of the seventeenth century.
                  </Text>
                  <Text fontSize="18px" mt={12}>
                    My Photos
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
                    {user?.details?.photos.map((photo, index) => (
                      <Image key={index} src={photo} w="full" alt="" />
                    ))}
                  </SimpleGrid>
                </>
              )}

              {/* {breakpointValue === "base" && (
                <VStack spacing={6} mt={8}>
                  {user?.details?.photos.map((photo, index) => (
                    <Image
                      key={index}
                      src={photo}
                      w="full"
                      fit="cover"
                      alt=""
                    />
                  ))}
                </VStack>
              )} */}
            </Flex>
          </Box>
        </HStack>
      </Container>

      {/* <Box pos="fixed" w="full" bottom={0}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default UserView;
