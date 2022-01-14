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
  useToast,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import GraduateSearchBox from "components/GraduateSearchBox";
import GraduateStatCapsule from "components/GraduateStatCapsule";
import AlphaBetaBar from "components/widgets/AlphaBetaBar";
import GraduatesCountryStatBox from "components/GraduatesCountryStatBox";
import VillageGraduatesRegionStatCard from "components/VillageGraduatesRegionStatCard";
import Loader from "components/widgets/Loader";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useWindowProp from "hooks/use-window-prop";

import {
  platformCountries,
  homeCountry,
  watchCountries,
} from "constants/global";

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
  const router = useRouter();
  const { id } = router.query;
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const {
    me,
    districts,
    subDistricts,
    villages,
    graduateStatsByCondition,
    totalGraduateStats,
  } = useFetchData();
  const {
    fetchMeData,
    fetchCommonData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    getGraduatesByConditionData,
    getTotalGraduatesData,
  } = useActionDispatch();

  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const [expandedItem, setExpandedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState(null);

  const universityCountries = watchCountries
    .filter((e) => e.href != "other")
    .map((e) => e.href)
    .join(",");

  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    if (me) {
      setLoading(true);
      fetchCommonData();
      // fetchRegionsData(null);
      fetchDistrictsData(null);
      fetchSubDistrictsData(null);
      fetchVillagesData(null);
    } else {
      fetchMeData();
    }
  }, [me]);

  useEffect(() => {
    if (id) {
      getGraduatesByConditionData({ universityCountries, locationUuid: id });
      getTotalGraduatesData();
    }
  }, [id]);

  useEffect(() => {
    const districtItem = districts.find((e) => e.uuid === id);
    if (districtItem) {
      setActiveMenuItem(menuItems[0]);
      setItems(districts);
      setExpandedItem(districtItem);
    }

    const subDistrictItem = subDistricts.find((e) => e.uuid === id);
    if (subDistrictItem) {
      setActiveMenuItem(menuItems[1]);
      setItems(subDistricts);
      setExpandedItem(subDistrictItem);
    }

    const villageItem = villages.find((e) => e.uuid === id);
    if (villageItem) {
      setActiveMenuItem(menuItems[2]);
      setItems(villages);
      setExpandedItem(villageItem);
    }
  }, [districts, subDistricts, villages]);

  useEffect(() => {
    if (activeMenuItem?.value === "district") setItems(districts);
    else if (activeMenuItem?.value === "subDistrict") setItems(subDistricts);
    else if (activeMenuItem?.value === "village") setItems(villages);
  }, [activeMenuItem]);

  const toast = useToast();
  const { fixed } = useWindowProp();

  const onFind = () => {
    if (districts.find((item) => item.href === location.toLowerCase())) {
      setActiveMenuItem(menuItems[0]);
    } else if (
      subDistricts.find((item) => item.href === location.toLowerCase())
    ) {
      setActiveMenuItem(menuItems[1]);
    } else if (villages.find((item) => item.href === location.toLowerCase())) {
      setActiveMenuItem(menuItems[2]);
    } else {
      toast({
        title: "No Found " + location,
        description: "Please try to find correct name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (items && items.length > 0 && loading) {
    setLoading(false);
  }

  const calcGraduates = (location) => {
    const totalGraduatesCount = 1; //totalGraduates.filter(e=>e.comesFrom === locationItem.href).length;
    const homeGraduatesCount = 0; //totalGraduates.filter(e=>e.comesFrom === locationItem.href && e.graduatedAt === homeCountry).length;
    const overseaGraduateCount = totalGraduatesCount - homeGraduatesCount;

    //[total=12, inter=6, oversea=6]
    return [totalGraduatesCount, homeGraduatesCount, overseaGraduateCount];
  };

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Graduates" />
        <Flex>
          {breakpointValue === "md" && (
            <Box>
              <VillageGraduatesRegionStatCard
                village={me?.comesFrom}
                fixed={fixed}
              />
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
            <GraduateSearchBox
              location={location}
              setLocation={setLocation}
              onFind={onFind}
            />

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
                  borderBottom={item.id === activeMenuItem?.id ? "2px" : "none"}
                  borderBottomColor={
                    item.id === activeMenuItem?.id ? "purpleTone" : "none"
                  }
                  cursor="pointer"
                  onClick={() => setActiveMenuItem(item)}
                >
                  {item.label}
                </Box>
              ))}
            </Flex>
            {loading && <Loader loading={loading} />}
            {!loading && (
              <Accordion
                w="full"
                allowToggle
                mt={6}
                defaultIndex={0}
                onChange={(index) => {
                  typeof index === "number"
                    ? setExpandedItem(items[index])
                    : setExpandedItem(items[index[0]]);
                }}
              >
                {items.map((item) => {
                  return (
                    <AccordionItem
                      key={item.uuid}
                      id={item.uuid?.toString()}
                      isFocusable={item.uuid === expandedItem?.uuid}
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
                            item.uuid === expandedItem?.uuid
                              ? "purpleTone"
                              : "primary"
                          }
                        >
                          {item.name}
                        </Box>
                        {breakpointValue === "md" && (
                          <TotalCapsule
                            locationItem={item}
                            stats={calcGraduates(item)}
                            isExpanded={item.uuid === expandedItem?.uuid}
                          />
                        )}
                        <AccordionIcon ml={4} />
                      </AccordionButton>

                      <AccordionPanel pb={4}>
                        <Divider />
                        {breakpointValue === "base" && (
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            mt={6}
                          >
                            <TotalCapsule
                              locationItem={item}
                              stats={calcGraduates(item)}
                              isExpanded={item.uuid === expandedItem?.uuid}
                            />
                          </Flex>
                        )}
                        <Box w={{ base: "100%", md: "40%" }} p={6}>
                          {me?.comesFrom && (
                            <GraduatesCountryStatBox
                              graduateStats={graduateStatsByCondition}
                            />
                          )}
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </Box>
        </Flex>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

const TotalCapsule = ({ locationItem, stats, isExpanded }) => {
  return (
    <HStack spacing={0}>
      <Box fontSize="14px" color="GrayText" mr={4} textTransform="capitalize">
        {locationItem.name} Graduates Total -{" "}
        <Text color="greenTone" display="inline">
          {stats[0]}
        </Text>
      </Box>
      <GraduateStatCapsule
        inter={stats[1]}
        oversea={stats[2]}
        style={{
          bgColor: "#F7F5FF", //light bg purple
          border: isExpanded ? "1px" : "0px",
          borderColor: isExpanded ? "purpleTone" : "transparent",
          iconColor: "#553CFB", //same purpleTone
          separatorColor: "purpleTone",
        }}
      />
    </HStack>
  );
};

export default Graduates;
