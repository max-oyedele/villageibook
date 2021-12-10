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
  SimpleGrid,
  Badge,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";

import useFetchData from "hooks/use-fetch-data";

const UserView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const toast = useToast();

  const { user, userError, fetchUserData } = useFetchData();

  useEffect(() => {
    if (id) {
      fetchUserData({ uuid: id });
    }
  }, [id]);

  if (userError) {
    !toast.isActive("userError") &&
      toast({
        id: "userError",
        title: "Cant't find user information.",
        description: userError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  }

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6} mt={8} mb={48}>
        {/* <PageTitle title={user?.firstName + " " + user?.lastName ?? ""} /> */}

        <Flex>
          {breakpointValue === "md" && (
            <Flex minW="max-content" flexDirection="column" alignItems="center" pos="fixed" top="80px" spacing={6}>
              <Image
                src={user?.avatar??"/images/default-user.png"}
                boxSize="200px"
                loading="eager"
                fit="cover"
                alt=""
                borderRadius="full"
              />

              <Text fontSize="18px" textTransform="capitalize" mt={8}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text fontSize="13px" mt={4}>
                {user?.email}
              </Text>

              {user?.role === "premium" && (
                <Badge
                  bgColor="yellow.400"
                  borderRadius="4px"
                  color="white"
                  fontWeight="400"
                  mt={4}
                >
                  Premium
                </Badge>
              )}
            </Flex>
          )}

          <Box
            w="full"
            ml={breakpointValue === "base" ? 0 : "224px"}
            bgColor="white"
            borderRadius="8px"
            border="1px"
            borderColor="gray.300"
          >
            <Flex flexDirection="column" p={6}>
              {breakpointValue === "base" && (
                <Flex flexDirection="column" alignItems="center" mb={6}>
                  <Avatar
                    src={user?.avatar}
                    size="2xl"
                    mb={6}
                  />

                  <Text fontSize="18px" textTransform="capitalize" mt={8}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text fontSize="13px" mt={4}>
                    {user.email}
                  </Text>
                </Flex>
              )}

              <Text fontSize="18px">Personal Info</Text>
              <VStack
                w="full"
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
                    {user?.livesIn.name}
                  </Box>
                </HStack>
                <HStack w="full">
                  <Box w="full" fontSize="13px" color="purpleTone">
                    Comes from
                  </Box>
                  <Box
                    w="full"
                    fontSize="13px"
                    color="GrayText"
                    textTransform="capitalize"
                  >
                    {user?.comesFrom.name}
                  </Box>
                </HStack>
                {user?.graduatedAt && (
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Graduated at
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {user?.graduatedAt.name}
                    </Box>
                  </HStack>
                )}
                {user?.profession && (
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Profession
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {user?.profession}
                    </Box>
                  </HStack>
                )}
                {user?.degree && (
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Degree
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {user?.degree}
                    </Box>
                  </HStack>
                )}
                
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
                    <Image src={user?.photo1} w="full" alt="" />
                    <Image src={user?.photo2} w="full" alt="" />
                    <Image src={user?.photo3} w="full" alt="" />
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
        </Flex>
      </Container>

      {/* <Box pos="fixed" w="full" bottom={0}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default UserView;
