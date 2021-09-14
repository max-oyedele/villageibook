import { Fragment, useState } from "react";
import type { NextPage } from "next";

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

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import GraduateStatCard from "components/GraduateStatCard";
import GraduateSearchBox from "components/GraduateSearchBox";
import GraduateStatCapsule from "components/GraduateStatCapsule";
import SelectBox from "components/widgets/SelectBox";
import AlphaBetaBar from "components/widgets/AlphaBetaBar";

import {
  totalGraduates,
  villageName,
  villageGraduates,
  bangladeshGraduates,
} from "data";
import {
  interCountry,
  Stats,
  districtGraduates,
  districts,
} from "data/graduates";

const menuItems = [
  {
    id: 0,
    label: "DISTRICT",
    value: "district",
  },
  {
    id: 1,
    label: "UPAZILA",
    value: "upazila",
  },
  {
    id: 2,
    label: "VILLAGE",
    value: "village",
  },
];

const Graduates: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const [activeLng, setActiveLng] = useState("english");

  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]);

  const [expandedDistrict, setExpandedDistrict] = useState(
    districtGraduates[0]
  );
  const [selectedDistrict, setSelectedDistrict] = useState(districts);
  const [selectedLetter, setSelectedLetter] = useState("a");

  const calcGraduates: (stats: Stats) => number[] = (stats) => {
    //{ bangladesh: 6, australia: 1, canada: 1, europe: 1, uk: 1, usa: 1, other: 1 }
    const inter = stats[interCountry];
    let oversea = 0;
    for (const [key, value] of Object.entries(stats)) {
      oversea += key === interCountry ? 0 : value;
    }

    //[total=12, inter=6, oversea=6]
    return [inter + oversea, inter, oversea];
  };

  return (
    <Fragment>
      <Header jwt={null} />
      <Container maxW="full" p={6}>
        <Flex justifyContent="space-between" mt={4}>
          <PageTitle title="Graduates" />
        </Flex>

        <HStack spacing={6} mt={12} align="start">
          {breakpointValue === "md" && (
            <Box w="25%">
              <GraduateStatCard
                totalGraduates={totalGraduates}
                villageName={villageName}
                villageGraduates={villageGraduates}
                bangladeshGraduates={bangladeshGraduates}
              />
            </Box>
          )}

          <Box w="full">
            <GraduateSearchBox />

            <Flex
              justifyContent="center"
              alignItems="center"
              borderBottom="1px"
              borderBottomColor="gray.300"
              mt={6}
            >
              {menuItems.map((item) => (
                <Box
                  key={item.id}
                  h={8}
                  mx={8}
                  fontSize="13px"
                  fontWeight="800"
                  borderBottom={item.id === activeMenuItem.id ? "2px" : "none"}
                  borderBottomColor={
                    item.id === activeMenuItem.id ? "purpleTone" : "none"
                  }
                  cursor="pointer"
                  onClick={() => setActiveMenuItem(item)}
                >
                  {item.label}
                </Box>
              ))}
            </Flex>

            {activeMenuItem.value === "upazila" && (
              <VStack>
                <Box w={{ base: "full", md: "40%" }} mt={6}>
                  <SelectBox
                    options={districts}
                    selectedOption={selectedDistrict}
                    setSelectedOption={setSelectedDistrict}
                    borderColor="#36CFD1"
                  />
                </Box>
              </VStack>
            )}

            {activeMenuItem.value === "village" && (
              <Box mt={6}>
                <AlphaBetaBar selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
              </Box>
            )}

            <Accordion
              w="full"
              allowToggle
              mt={6}
              defaultIndex={0}
              onChange={(index) => {
                typeof index === "number"
                  ? setExpandedDistrict(districtGraduates[index])
                  : setExpandedDistrict(districtGraduates[index[0]]);
              }}
            >
              {districtGraduates.map((districtGraduate) => (
                <AccordionItem
                  key={districtGraduate.id}
                  id={districtGraduate.id.toString()}
                  border="none"
                  bgColor="white"
                  mt={4}
                >
                  <AccordionButton h={14}>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="16px"
                      fontWeight="700"
                      textTransform="capitalize"
                      color={
                        districtGraduate.id === expandedDistrict?.id
                          ? "purpleTone"
                          : "primary"
                      }
                    >
                      {districtGraduate.name}
                    </Box>
                    <Box
                      fontSize="14px"
                      fontWeight="400"
                      color="greyText"
                      mr={4}
                      textTransform="capitalize"
                    >
                      {districtGraduate.name} Graduates Total -{" "}
                      <Text color="greenTone" display="inline">
                        {calcGraduates(districtGraduate.stats)[0]}
                      </Text>
                    </Box>
                    <GraduateStatCapsule
                      inter={calcGraduates(districtGraduate.stats)[1]}
                      oversea={calcGraduates(districtGraduate.stats)[2]}
                    />

                    <AccordionIcon ml={4} />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Divider />
                    <Box w="300px" mt={6} mb={10} ml={6}>
                      <VStack spacing={2} divider={<Divider />}>
                        {Object.entries(districtGraduate.stats).map((item) => (
                          <Flex
                            key={item[0]}
                            w="full"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text
                              fontSize="13px"
                              fontWeight="700"
                              textTransform="capitalize"
                            >
                              {item[0]}
                            </Text>
                            <Badge px={4} borderRadius="full">
                              {item[1]}
                            </Badge>
                          </Flex>
                        ))}
                      </VStack>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </HStack>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

export default Graduates;
