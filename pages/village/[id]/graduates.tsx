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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { MyThunkDispatch, OurStore } from "rdx/store";
import { fetchVillagePageData } from "rdx/slices/villagePage";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import LeftVillageCard from "components/LeftVillageCard";
import VillageGraduatesCard from "components/VillageGraduatesCard";

import {
  totalGraduates,
  villageGraduates,
  bangladeshGraduates,
} from "data/feed";
import {
  interCountry,
  Stats,
  districtGraduates,
  districts,
} from "data/graduates";

import UseLeftFixed from "hooks/use-left-fixed";

const menuItems = [
  {
    id: 0,
    label: "DISTRICT",
    value: "district",
  },
  {
    id: 1,
    label: "UPAZILA",
    value: "subDistrict",
  },
  {
    id: 2,
    label: "VILLAGE",
    value: "village",
  },
];

const Graduates: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { fixed } = UseLeftFixed();

  const router = useRouter();
  const { query } = router;
  const vid = query.id; //village name currently, but replace to uuid

  const dispatch: MyThunkDispatch = useDispatch();
  const { users, articles, personalities, institutions, videos } = useSelector(
    (state: OurStore) => state.villagePageReducer.pageData
  );
  const {
    totalGraduates,
    villageGraduates,
    countryGraduates,
    bangladeshGraduates,
  } = useSelector((state: OurStore) => state.feedPageReducer.pageData);

  useEffect(() => {
    dispatch(fetchVillagePageData({ villageName: vid }));
  }, [vid]);

  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]);

  const [expandedDistrict, setExpandedDistrict] = useState(
    districtGraduates[0]
  );
  const [selectedDistrict, setSelectedDistrict] = useState(districts);
  const [selectedLetter, setSelectedLetter] = useState("a");

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Graduates" />

        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <LeftVillageCard village={vid as string} fixed={fixed} />
            </Box>
          )}

          <Box
            w="full"
            ml={
              fixed && breakpointValue === "md"
                ? "264px"
                : breakpointValue === "md"
                ? "24px"
                : "0px"
            }
          >
            <Box bgColor="white" p={6}>
              <VillageGraduatesCard
                totalGraduates={totalGraduates}
                villageName={vid as string}
                villageGraduates={villageGraduates}
                countryGraduates={countryGraduates}
              />
            </Box>
            
          </Box>
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Graduates;
