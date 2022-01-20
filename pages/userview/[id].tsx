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
  AspectRatio,
  Badge,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import Loader from "components/widgets/Loader";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const UserView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const toast = useToast();

  const { viewPageStatus, user, userError } = useFetchData();
  const { fetchUserData } = useActionDispatch();

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

        {viewPageStatus === "loading" && <Loader />}
        {viewPageStatus !== "loading" && (
          <Flex>
            {breakpointValue === "md" && (
              <Flex
                minW="max-content"
                flexDirection="column"
                alignItems="center"
                pos="fixed"
                top="80px"
                spacing={6}
              >
                <Image
                  src={user?.avatar ?? "/images/default-user.png"}
                  boxSize="200px"
                  loading="eager"
                  fit="cover"
                  alt=""
                  borderRadius="full"
                  boxShadow="md"
                />

                <Text fontSize="18px" textTransform="capitalize" mt={8}>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text fontSize="13px" mt={4}>
                  {user?.email}
                </Text>

                {user?.roles?.includes("PREMIUM") && (
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
                    <Avatar src={user?.avatar} size="2xl" mb={6} />

                    <Text fontSize="18px" textTransform="capitalize" mt={8}>
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text fontSize="13px" mt={4}>
                      {user.email}
                    </Text>
                  </Flex>
                )}

                <Text fontSize="18px">Personal Info</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} mt={6}>
                  <VStack spacing={2} divider={<Divider />} pr={3}>
                    <HStack w="full">
                      <Box w="full" fontSize="13px" color="purpleTone">
                        First name
                      </Box>
                      <Box
                        w="full"
                        fontSize="13px"
                        color="GrayText"
                        textTransform="capitalize"
                      >
                        {user?.firstName}
                      </Box>
                    </HStack>
                    <HStack w="full">
                      <Box w="full" fontSize="13px" color="purpleTone">
                        Last name
                      </Box>
                      <Box
                        w="full"
                        fontSize="13px"
                        color="GrayText"
                        textTransform="capitalize"
                      >
                        {user?.lastName}
                      </Box>
                    </HStack>
                    <HStack w="full">
                      <Box w="full" fontSize="13px" color="purpleTone">
                        Email
                      </Box>
                      <Box w="full" fontSize="13px" color="GrayText">
                        {user?.email}
                      </Box>
                    </HStack>
                    <HStack w="full">
                      <Box w="full" fontSize="13px" color="purpleTone">
                        Lives in
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
                  </VStack>
                  <VStack spacing={2} divider={<Divider />} pr={3}>
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
                        {/* {user?.comesFrom.country.name} // not existed in me.comesFrom */}
                        Bangladesh
                      </Box>
                    </HStack>
                    <HStack w="full">
                      <Box w="full" fontSize="13px" color="purpleTone">
                        District
                      </Box>
                      <Box
                        w="full"
                        fontSize="13px"
                        color="GrayText"
                        textTransform="capitalize"
                      >
                        {user?.comesFrom?.district?.name}
                      </Box>
                    </HStack>
                    <HStack w="full">
                      <Box w="full" fontSize="13px" color="purpleTone">
                        Upazila
                      </Box>
                      <Box
                        w="full"
                        fontSize="13px"
                        color="GrayText"
                        textTransform="capitalize"
                      >
                        {user?.comesFrom?.subDistrict?.name}
                      </Box>
                    </HStack>
                    <HStack w="full">
                      <Box w="full" fontSize="13px" color="purpleTone">
                        Village
                      </Box>
                      <Box
                        w="full"
                        fontSize="13px"
                        color="GrayText"
                        textTransform="capitalize"
                      >
                        {user?.comesFrom?.name}
                      </Box>
                    </HStack>
                  </VStack>
                </SimpleGrid>
                <Text fontSize="18px" marginTop="30px">
                  Education
                </Text>
                <VStack
                  w={{ base: "full", md: "50%" }}
                  spacing={2}
                  divider={<Divider />}
                  mt={6}
                >
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
                      {user?.graduatedIn?.name}
                    </Box>
                  </HStack>
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
                      {user?.university?.name}
                    </Box>
                  </HStack>
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
                      {user?.hasProfession?.name}
                    </Box>
                  </HStack>
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
                </VStack>

                {user?.roles?.includes("PREMIUM") && (
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
                      {user?.about}
                    </Text>
                    <Text fontSize="18px" mt={12}>
                      My Photos
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={8}>
                      {["photo1", "photo2", "photo3"].map((e) => (
                        <>
                          {user?.[e] && (
                            <AspectRatio key={e} boxShadow="md">
                              <Image src={user?.[e]} w="full" alt="" />
                            </AspectRatio>
                          )}
                        </>
                      ))}
                    </SimpleGrid>
                  </>
                )}
              </Flex>
            </Box>
          </Flex>
        )}
      </Container>

      {!user?.roles?.includes("PREMIUM") && (
        <Box w="full" pos="fixed" bottom={0} bg="white" mt={20}>
          <Footer />
        </Box>
      )}
      {/* {user?.roles?.includes("PREMIUM") && (
        <Box bg="white" mt={20}>
          <Footer />
        </Box>
      )} */}
    </Fragment>
  );
};

export default UserView;
