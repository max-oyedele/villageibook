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
  village,
  villageGraduates,
  bangladeshGraduates,
} from "data/browse";
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
  const [activeLng, setActiveLng] = useState("english");

  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]);

  const [expandedDistrict, setExpandedDistrict] = useState(
    districtGraduates[0]
  );
  const [selectedDistrict, setSelectedDistrict] = useState(districts);
  const [selectedLetter, setSelectedLetter] = useState("a");

  const {fixed} = UseLeftFixed();

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Graduates" />

        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <GraduateStatCard
                totalGraduates={totalGraduates}
                villageName={village.href}
                villageGraduates={villageGraduates}
                bangladeshGraduates={bangladeshGraduates}
                fixed={fixed}
              />
            </Box>
          )}

          <Box w="full" ml={fixed && breakpointValue === "md" ? "264px" : breakpointValue === "md" ? "24px" : "0px"}>
            {breakpointValue === "base" && (
              <Box mb={6}>
                <GraduateStatCard
                  totalGraduates={totalGraduates}
                  villageName={village.href}
                  villageGraduates={villageGraduates}
                  bangladeshGraduates={bangladeshGraduates}
                />
              </Box>
            )}

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

            {activeMenuItem.value === "subDistrict" && (
              <VStack>
                <Box w={{ base: "full", md: "40%" }} mt={6}>
                  <SelectBox
                    options={districts}
                    selectedOption={selectedDistrict}
                    setSelectedOption={setSelectedDistrict}
                    borderColor="#36CFD1"
                    height="45px"
                  />
                </Box>
              </VStack>
            )}

            {activeMenuItem.value === "village" && (
              <Box mt={6}>
                <AlphaBetaBar
                  selectedLetter={selectedLetter}
                  setSelectedLetter={setSelectedLetter}
                />
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
                  <AccordionButton h={14} _focus={{ boxShadow: "none" }}>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="16px"
                      textTransform="capitalize"
                      color={
                        districtGraduate.id === expandedDistrict?.id
                          ? "purpleTone"
                          : "primary"
                      }
                    >
                      {districtGraduate.name}
                    </Box>
                    {breakpointValue === "md" && (
                      <TotalCapsule districtGraduate={districtGraduate} />
                    )}
                    <AccordionIcon ml={4} />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Divider />
                    {breakpointValue === "base" && (
                      <Flex justifyContent="center" alignItems="center" mt={6}>
                        <TotalCapsule districtGraduate={districtGraduate} />
                      </Flex>
                    )}
                    <VStack spacing={2} divider={<Divider />} p={6}>
                      {Object.entries(districtGraduate.stats).map((item) => (
                        <Flex
                          key={item[0]}
                          w="full"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text fontSize="13px" textTransform="capitalize">
                            {item[0]}
                          </Text>
                          <Badge
                            px={4}
                            borderRadius="full"
                            fontSize="12px"
                            fontWeight="400"
                          >
                            {item[1]}
                          </Badge>
                        </Flex>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Flex>
      </Container>

      <Box mt={20}>
        <Footer />
      </Box>
    </Fragment>
  );
};

const TotalCapsule = ({ districtGraduate }) => {
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
    <HStack spacing={0}>
      <Box fontSize="14px" color="GrayText" mr={4} textTransform="capitalize">
        {districtGraduate.name} Graduates Total -{" "}
        <Text color="greenTone" display="inline">
          {calcGraduates(districtGraduate.stats)[0]}
        </Text>
      </Box>
      <GraduateStatCapsule
        inter={calcGraduates(districtGraduate.stats)[1]}
        oversea={calcGraduates(districtGraduate.stats)[2]}
      />
    </HStack>
  );
};

export default Graduates;
