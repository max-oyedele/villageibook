import { Fragment, useEffect } from "react";
import {
  Stack,
  StackDirection,
  HStack,
  VStack,
  Divider,
  Flex,
  Text,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import GraduatePercent from "./GraduatePercent";
import StatCapsule from "./GraduateStatCapsule";

const GraduateStatsCard: React.FC<{
  type: "country" | "region" | "district" | "subDistrict" | "village";
  graduateStats: any;
}> = ({ graduateStats, type }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  if (!graduateStats?.[type]) return null;

  return (
    <Fragment>
      <VStack
        spacing={6}
        align="start"
        bgColor="white"
        borderRadius="8px"
        boxShadow="sm"
        p={4}
      >
        <GraduatePercent
          totalCount={graduateStats[type].totalGraduates}
          domesticCount={graduateStats[type].stats?.reduce((acc, val) => {
            return acc + val.domestic;
          }, 0)}
        />

        <VStack w="full" divider={<Divider />}>
          {graduateStats[type].stats?.map((item, index) => (
            <StatBox
              key={item.location}
              location={item.location}
              domestic={item.domestic}
              overseas={item.overseas}
            />
          ))}
        </VStack>
      </VStack>
    </Fragment>
  );
};

const StatBox: React.FC<{
  location: string;
  domestic: number;
  overseas: number;
}> = ({ location, domestic, overseas }) => {
  return (
    <Flex w="full" justifyContent="space-between" alignItems="center">
      <Text fontSize="12px" textTransform="capitalize">
        {location}
      </Text>
      <StatCapsule domestic={domestic} overseas={overseas} />
    </Flex>
  );
};

export default GraduateStatsCard;
