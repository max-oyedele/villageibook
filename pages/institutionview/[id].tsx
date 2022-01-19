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
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

import Header from "components/Header";
import Loader from "components/widgets/Loader";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const InstitutionView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const toast = useToast();

  const { viewPageStatus, institution, institutionError } = useFetchData();
  const { fetchInstitutionData } = useActionDispatch();

  useEffect(() => {
    if (id) {
      fetchInstitutionData({ uuid: id });
    }
  }, [id]);

  if (institutionError) {
    !toast.isActive("institutionError") &&
      toast({
        id: "institutionError",
        title: "Cant't find institution information.",
        description: institutionError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  }

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6} mt={8} mb={48}>
        {viewPageStatus === 'loading' && <Loader />}
        {viewPageStatus !== 'loading' && (
          <Flex>
            <Box
              w="full"
              bgColor="white"
              borderRadius="8px"
              boxShadow="sm"
            >
              <Flex flexDirection="column" p={6}>
                <Flex flexDirection="column" alignItems="center" mb={6}>
                  <Image
                    src={
                      institution?.photo?.url ?? "/images/default-user.png"
                    }
                    size="2xl"
                    mb={6}
                    alt=""
                  />
                </Flex>

                <Text fontSize="18px">Inistitution Info</Text>
                <VStack w="full" spacing={2} divider={<Divider />} mt={6}>
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Name
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {institution?.name}
                    </Box>
                  </HStack>
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Phone Number
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {institution?.phone}
                    </Box>
                  </HStack>
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Email
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {institution?.email}
                    </Box>
                  </HStack>
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Address
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {institution?.address}
                    </Box>
                  </HStack>
                  <HStack w="full">
                    <Box w="full" fontSize="13px" color="purpleTone">
                      Established
                    </Box>
                    <Box
                      w="full"
                      fontSize="13px"
                      color="GrayText"
                      textTransform="capitalize"
                    >
                      {institution?.yearEstablished}
                    </Box>
                  </HStack>
                </VStack>
              </Flex>
            </Box>
          </Flex>
        )}
      </Container>
    </Fragment>
  );
};

export default InstitutionView;
