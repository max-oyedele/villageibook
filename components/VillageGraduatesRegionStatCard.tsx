import React, { Fragment, useEffect } from "react";
import {
  Flex,
  HStack,
  VStack,
  StackDivider,
  Box,
  Text,
  Image,
  Progress,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { MyThunkDispatch, OurStore } from "rdx/store";
import {
  fetchCountries,
  fetchRegions,
  fetchDistricts,
  fetchSubDistricts,
  fetchVillages,
} from "rdx/slices/location";

import GraduateStatCapsule from "./GraduateStatCapsule";
import GraduatePercent from "./GraduatePercent";

const totalGraduatesCount = 1000;
const bangladeshGraduates = {
  barisal: {
    inter: 12,
    oversea: 12,
  },
  chittagong: {
    inter: 11,
    oversea: 2,
  },
  dhaka: {
    inter: 10,
    oversea: 14,
  },
  khulna: {
    inter: 21,
    oversea: 5,
  },
  mymensingh: {
    inter: 16,
    oversea: 11,
  },
  rajshahi: {
    inter: 18,
    oversea: 8,
  },
  rangpur: {
    inter: 14,
    oversea: 13,
  },
  sylhet: {
    inter: 13,
    oversea: 13,
  },
};

const VillageGraduatesRegionStatCard: React.FC<{
  village: string;
}> = ({ village }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const dispatch: MyThunkDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDistricts({country: "bangladesh"}));
  }, []);

  const { districts } = useSelector((state: OurStore) => state.locationReducer);
  const { graduates, articles, personalities, institutions, videos } =
    useSelector((state: OurStore) => state.villagePageReducer.pageData);

  return (
    <Fragment>
      <Box
        p={6}
        bgColor="white"
        border="1px"
        borderRadius="6px"
        borderColor="gray.200"
      >
        <GraduatePercent
          village={village}
          totalCount={totalGraduatesCount}
          graduatesCount={graduates.length}
        />

        <VStack divider={<StackDivider />} mt={8}>
          {Object.keys(bangladeshGraduates).map((region) => (
            <Flex
              w="full"
              key={region}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="12px" textTransform="capitalize">
                {region}
              </Text>
              <GraduateStatCapsule
                inter={bangladeshGraduates[region].inter}
                oversea={bangladeshGraduates[region].oversea}
              />
            </Flex>
          ))}
        </VStack>
      </Box>
    </Fragment>
  );
};

export default VillageGraduatesRegionStatCard;
