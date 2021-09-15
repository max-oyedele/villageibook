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
import MyVillageCard from "components/MyVillageCard";
import PersonalityCard from "components/PersonalityCard";

import { MyPage, myPages } from "data/myPages";

const UserView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const [user, setUser] = useState<MyPage | undefined>(undefined);
  useEffect(() => {
    const t_user = myPages.find((item) => item.id == Number(id));
    setUser(t_user);
  }, [id]);

  return (
    <Fragment>
      <Header jwt={null} />
      <Container maxW="full" px={6}>
        <HStack h={24}>
          <PageTitle title={user?.name ?? ""} />
        </HStack>

        <HStack spacing={6} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <Image src={user?.img} w="full" fit="cover" alt="" />
            </Box>
          )}

          <Box w="full">
            <Flex
              flexDirection="column"
              bgColor="white"
              borderRadius="8px"
              p={6}
            >
              <Text fontSize="18px" fontWeight="700">
                General
              </Text>
              <VStack
                w={{ base: "full", md: "400px" }}
                spacing={2}
                divider={<Divider />}
                mt={6}
              >
                <HStack w="full">
                  <Box
                    w="full"
                    fontSize="13px"
                    fontWeight="700"
                    color="purpleTone"
                  >
                    Village
                  </Box>
                  <Box
                    w="full"
                    fontSize="13px"
                    fontWeight="700"
                    color="grayText"
                  >
                    Fatepur
                  </Box>
                </HStack>
                <HStack w="full">
                  <Box
                    w="full"
                    fontSize="13px"
                    fontWeight="700"
                    color="purpleTone"
                  >
                    Graduated in
                  </Box>
                  <Box
                    w="full"
                    fontSize="13px"
                    fontWeight="700"
                    color="grayText"
                  >
                    UK
                  </Box>
                </HStack>
                <HStack w="full">
                  <Box
                    w="full"
                    fontSize="13px"
                    fontWeight="700"
                    color="purpleTone"
                  >
                    Age
                  </Box>
                  <Box
                    w="full"
                    fontSize="13px"
                    fontWeight="700"
                    color="grayText"
                  >
                    35
                  </Box>
                </HStack>
              </VStack>

              <Text fontSize="18px" fontWeight="700" mt={12}>
                About me
              </Text>
              <Text fontSize="15px" fontWeight="400" color="GrayText" mt={6}>
                I am a recent English and Creative Writing graduate from the
                University of Birmingham, with particular focus on English
                Literature. My teaching is based on essay plans, writing
                practice and close analysis of texts significant to the
                student&apos;s course.
                <br />
                <br />
                Since the age of fifteen I have been writing creatively. By
                sixteen, I finished my first book. Currently, I am in the
                progress of writing a historical fantasy novel exploring witch
                hunts of the seventeenth century.
              </Text>

              <Text fontSize="18px" fontWeight="700" mt={12}>
                My Photos
              </Text>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
                {user?.photos?.map((photo) => (
                  <Image key={photo} src={photo} w="full" alt="" />
                ))}
              </SimpleGrid>
            </Flex>
          </Box>
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default UserView;
