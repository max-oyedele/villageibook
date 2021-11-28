import { Fragment, useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";
import PageTitle from "components/widgets/PageTitle";
import GraduateSearchBox from "components/GraduateSearchBox";
import GraduateStatCapsule from "components/GraduateStatCapsule";
import AlphaBetaBar from "components/widgets/AlphaBetaBar";
import useFetchData from "hooks/use-fetch-data";

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

const homeCountry = "bangladesh";

const Graduates: NextPage = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { me, totalGraduates, districts, subDistricts, villages, fetchCommonData, fetchGraduatePageData } = useFetchData();
  
  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[2]);

  const [expandedItem, setExpandedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchCommonData();
    fetchGraduatePageData(null);
  }, []);

  useEffect(()=>{
    setItems(villages);
  }, [villages])

  useEffect(() => {
    if (activeMenuItem.value === "district") setItems(districts);
    else if (activeMenuItem.value === "subDistrict") setItems(subDistricts);
    else if (activeMenuItem.value === "village") setItems(villages);
  }, [activeMenuItem]);

  const toast = useToast();

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

  const calcGraduates = (locationItem) => {
    const totalGraduatesCount = totalGraduates.filter(e=>e.comesFrom === locationItem.href).length;
    const homeGraduatesCount = 0;//totalGraduates.filter(e=>e.comesFrom === locationItem.href && e.graduatedAt === homeCountry).length;
    const overseaGraduateCount = totalGraduatesCount - homeGraduatesCount;
    
    //[total=12, inter=6, oversea=6]
    return [totalGraduatesCount, homeGraduatesCount, overseaGraduateCount];
  };

  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        {/* <PageTitle title="Graduates" /> */}

        <Box mt={8}>
          <GraduateSearchBox
            location={location}
            setLocation={setLocation}
            onFind={onFind}
          />
        </Box>

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
                key={item.id}
                id={item.id.toString()}
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
                      item.id === expandedItem?.id ? "purpleTone" : "primary"
                    }
                  >
                    {item.name}
                  </Box>
                  {breakpointValue === "md" && (
                    <TotalCapsule locationItem={item} stats={calcGraduates(item)} />
                  )}
                  <AccordionIcon ml={4} />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Divider />
                  {breakpointValue === "base" && (
                    <Flex justifyContent="center" alignItems="center" mt={6}>
                      <TotalCapsule locationItem={item} stats={calcGraduates(item)} />
                    </Flex>
                  )}
                  <VStack spacing={2} divider={<Divider />} p={6}>
                    {/* {Object.entries(districtGraduate.stats).map((item) => (
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
                  ))} */}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

const TotalCapsule = ({ locationItem, stats }) => {
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
      />
    </HStack>
  );
};

export default Graduates;
