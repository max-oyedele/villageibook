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
import GraduateStatsCard from "components/GraduateStatsCard";
import GraduateStatsByCountries from "components/GraduateStatByCountries";
import Loader from "components/widgets/Loader";

import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";
import useWindowProp from "hooks/use-window-prop";

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
    graduatePageStatus,
    graduateStats,
  } = useFetchData();
  const {
    fetchMeData,
    fetchCommonData,
    fetchRegionsData,
    fetchDistrictsData,
    fetchSubDistrictsData,
    fetchVillagesData,
    fetchGraduateStatsData,
  } = useActionDispatch();

  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const [expandedItem, setExpandedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (me) {
      fetchCommonData();
      // fetchRegionsData(null);
      fetchDistrictsData(null);
      fetchSubDistrictsData(null);
      fetchVillagesData(null);
      fetchGraduateStatsData({ type: "region" });
    } else {
      fetchMeData();
    }
  }, [me]);

  useEffect(() => {
    if (activeMenuItem) {
      fetchGraduateStatsData({ type: activeMenuItem.value });
      setLocation(null);
    }
  }, [activeMenuItem]);

  useEffect(() => {
    const districtItem = districts?.find((e) => e.uuid === id);
    if (districtItem) {
      setActiveMenuItem(menuItems[0]);
      setItems(districts);
      setExpandedItem(districtItem);
    }

    const subDistrictItem = subDistricts?.find((e) => e.uuid === id);
    if (subDistrictItem) {
      setActiveMenuItem(menuItems[1]);
      setItems(subDistricts);
      setExpandedItem(subDistrictItem);
    }

    const villageItem = villages?.find((e) => e.uuid === id);
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
    const districtItem = districts?.find(
      (e) => e.href === location.toLowerCase()
    );
    if (districtItem) {
      setActiveMenuItem(menuItems[0]);
      setExpandedItem(districtItem);
      router.push("/graduates/" + districtItem.uuid, undefined, {
        shallow: true,
      });
    }

    const subDistrictItem = subDistricts?.find(
      (e) => e.href === location.toLowerCase()
    );
    if (subDistrictItem) {
      setActiveMenuItem(menuItems[1]);
      setExpandedItem(subDistrictItem);
      router.push("/graduates/" + subDistrictItem.uuid, undefined, {
        shallow: true,
      });
    }

    const villageItem = villages?.find(
      (e) => e.href === location.toLowerCase()
    );
    if (villageItem) {
      setActiveMenuItem(menuItems[2]);
      setExpandedItem(villageItem);
      router.push("/graduates/" + villageItem.uuid, undefined, {
        shallow: true,
      });
    }

    if (!districtItem && !subDistrictItem && !villageItem) {
      toast({
        title: "No Found " + location,
        description: "Please try to find correct name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const findStat = (location) => {
    return graduateStats[activeMenuItem.value]?.stats.find(
      (e) => e.location === location
    );
  };

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        <PageTitle title="Graduates" />
        <Flex>
          {breakpointValue === "md" && (
            <Box
              minW="280px"
              pos={fixed ? "fixed" : "static"}
              top={fixed ? "80px" : 0}
            >
              <GraduateStatsCard type="region" graduateStats={graduateStats} />
            </Box>
          )}

          <Box
            w="full"
            ml={
              fixed && breakpointValue === "md"
                ? "304px"
                : breakpointValue === "md"
                ? "24px"
                : "0px"
            }
          >
            <GraduateSearchBox
              location={location}
              totalGraduates={
                graduateStats[activeMenuItem?.value]?.totalGraduates ?? 0
              }
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
            {graduatePageStatus === "loading" && <Loader />}
            {graduatePageStatus !== "loading" && (
              <Accordion
                w="full"
                allowToggle
                mt={6}
                index={items.findIndex((e) => e.uuid === expandedItem?.uuid)}
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
                      id={item.uuid}
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
                            stat={findStat(item.name) ?? {}}
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
                              stat={findStat(item.name) ?? {}}
                              isExpanded={item.uuid === expandedItem?.uuid}
                            />
                          </Flex>
                        )}
                        <Box w={{ base: "100%", md: "80%" }} p={6}>
                          {me?.comesFrom && (
                            <GraduateStatsByCountries
                              overseasCountries={
                                findStat(item.name)?.overseasCountries
                              }
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

      {!expandedItem && (
        <Box w="full" pos="fixed" bottom={0} bg="white" mt={20}>
          <Footer />
        </Box>
      )}
      {expandedItem && (
        <Box bg="white" mt={20}>
          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

const TotalCapsule = ({ locationItem, stat, isExpanded }) => {
  let totalGraduates = stat.domestic + stat.overseas;
  if (isNaN(totalGraduates)) totalGraduates = 0;

  return (
    <HStack spacing={0}>
      <Box fontSize="14px" color="GrayText" mr={4} textTransform="capitalize">
        {locationItem.name} Graduates Total -{" "}
        <Text color="greenTone" display="inline">
          {totalGraduates}
        </Text>
      </Box>
      <GraduateStatCapsule
        domestic={stat?.domestic ?? 0}
        overseas={stat?.overseas ?? 0}
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
