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
import { BiHomeAlt } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";

import GraduatePercent from "./GraduatePercent";
import StatCapsule from "./GraduateStatCapsule";

const GraduateStatsCard: React.FC<{
  type: "country" | "region" | "district" | "subDistrict" | "village";
  graduateStats: any;
  direction: string;
}> = ({ graduateStats, type, direction }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  if (!graduateStats?.[type]) return null;

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Stack
          direction={direction as StackDirection}
          spacing={direction === "row" ? 12 : 6}
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

          {direction === "column" && (
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
          )}

          {direction === "row" && (
            <>
              <VStack w="full" divider={<Divider />}>
                {graduateStats[type].stats.map((item, index) => {
                  if (index >= 4) return null;
                  return (
                    <StatBox
                      key={item.location}
                      location={item.location}
                      domestic={item.domestic}
                      overseas={item.overseas}
                    />
                  );
                })}
              </VStack>
              <VStack w="full" divider={<Divider />}>
                {graduateStats[type].stats.map((item, index) => {
                  if (index < 4) return null;
                  return (
                    <StatBox
                      key={item.location}
                      location={item.location}
                      domestic={item.domestic}
                      overseas={item.overseas}
                    />
                  );
                })}
              </VStack>
            </>
          )}
        </Stack>
      )}

      {breakpointValue === "base" && (
        <VStack
          spacing={8}
          bgColor="white"
          border="1px"
          borderRadius="8px"
          borderColor="gray.200"
          p={4}
        >
          <GraduatePercent
            totalCount={graduateStats[type].totalGraduates}
            domesticCount={graduateStats[type].stats.reduce((acc, val) => {
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
      )}
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
      {/* <Capsule
        count={count}
        flag={location === homeCountry.name ? "domestic" : "oversea"}
      /> */}
      <StatCapsule domestic={domestic} overseas={overseas} />
    </Flex>
  );
};

const Capsule: React.FC<{ count: number }> = ({
  count,
}) => {
  return (
    <Fragment>
      <Flex>
        <HStack
          w="50px"
          borderRadius="25px"
          border="1px"
          borderColor="gray.300"
          px={2}
        >          
          <Text fontSize="10px" lineHeight={2}>
            {count}
          </Text>
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default GraduateStatsCard;
