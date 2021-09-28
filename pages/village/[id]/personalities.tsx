import { Fragment, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter} from "next/router";

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
  useBreakpointValue,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { MyThunkDispatch, OurStore } from "rdx/store";
import { fetchVillagePageData } from "rdx/slices/villagePage";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import PersonalityCard from "components/PersonalityCard";

import UseLeftFixed from "hooks/use-left-fixed";

const Personalities: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const router = useRouter();
  const {query} = router;
  const vid = query.id; //village name currently, but replace to uuid

  const {fixed} = UseLeftFixed();

  const dispatch: MyThunkDispatch = useDispatch();
  const { users, articles, personalities, institutions, videos } = useSelector((state:OurStore)=>state.villagePageReducer.pageData)
  useEffect(() => {
    dispatch(fetchVillagePageData({villageName: vid}));
  }, []);

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Personalities" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={vid as string} fixed={fixed} />
            </Box>
          )}

          <Box w="full" ml={fixed && breakpointValue === "md" ? "264px" : breakpointValue === "md" ? "24px" : "0px"}>
            <VStack spacing={2}>
              {users.map((user) => (
                <PersonalityCard
                  key={user.id}
                  user={user}
                />
              ))}
            </VStack>
          </Box>
        </Flex>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Personalities;
