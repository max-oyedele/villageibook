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
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

const PersonalityView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const toast = useToast();

  const { personality, personalityError, fetchPersonalityData } = useFetchData();

  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;
  
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#553cfb");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchPersonalityData({ uuid: id });
    }
  }, [id]);

  if (personalityError) {
    !toast.isActive("personalityError") &&
      toast({
        id: "personalityError",
        title: "Cant't find person information.",
        description: personalityError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  }

  if (personality && loading) {
    setLoading(false)
  }

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6} mt={8} mb={48}>
        {/* <PageTitle title={user?.firstName + " " + user?.lastName ?? ""} /> */}

        { !loading ?
          <Flex>
            {breakpointValue === "md" && (
              <Flex minW="max-content" flexDirection="column" alignItems="center" pos="fixed" top="80px" spacing={6}>
                <Image
                  src={personality?.photo?.url ?? "/images/default-user.png"}
                  boxSize="200px"
                  loading="eager"
                  fit="cover"
                  alt=""
                  borderRadius="full"
                />

                <Text fontSize="18px" textTransform="capitalize" mt={8}>
                  {personality?.name}
                </Text>
                <Text fontSize="13px" mt={4}>
                  {personality?.dateOfBirth} ~ {personality?.dateOfDeath}
                </Text>
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
                      src={personality?.photo?.url ?? "/images/default-user.png"}
                      size="2xl"
                      mb={6}
                    />

                    <Text fontSize="18px" textTransform="capitalize" mt={8}>
                      {personality?.name}
                    </Text>
                    <Text fontSize="13px" mt={4}>
                      {personality?.about}
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
                      Education life
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {personality?.educationLife}
                    </Box>
                  </HStack>
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Achievements
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {personality?.achievements}
                    </Box>
                  </HStack>
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Career
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {personality?.career}
                    </Box>
                  </HStack>
                </VStack>
                
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
          </Flex> :
        <ScaleLoader color={color} loading={loading} css={override} /> }
      </Container>

      {/* <Box pos="fixed" w="full" bottom={0}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default PersonalityView;
