import { Fragment, useEffect } from "react";
import {
  Stack,
  StackDirection,
  HStack,
  VStack,
  Center,
  Divider,
  Flex,
  Text,
  Image,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";

import GraduatePercent from "./GraduatePercent";

const countries = [
  "Bangladesh",
  "Australia",
  "Canada",
  "EU",
  "United Kingdom",
  "United States",
  "other",
];

const GraduateStatByCountries: React.FC<{
  overseasCountries: any;
}> = ({ overseasCountries }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const getCount = (country: string) => {
    if (country === "other")
      return overseasCountries?.find((e) => e.other)?.other ?? 0;
    return overseasCountries?.find((e) => e.name === country)?.count ?? 0;
  };

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <HStack w="full" spacing={12} align="start" p={4}>
          <VStack w="full" divider={<Divider />}>
            {countries.slice(0, 4).map((item) => (
              <StatBox key={item} country={item} count={getCount(item)} />
            ))}
          </VStack>
          <VStack w="full" divider={<Divider />}>
            {countries.slice(4).map((item) => (
              <StatBox key={item} country={item} count={getCount(item)} />
            ))}
          </VStack>
        </HStack>
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
          <VStack w="full" divider={<Divider />}>
            {countries.map((item) => (
              <StatBox key={item} country={item} count={getCount(item)} />
            ))}
          </VStack>
        </VStack>
      )}
    </Fragment>
  );
};

const StatBox: React.FC<{
  country: string;
  count: number;
}> = ({ country, count }) => {
  return (
    <Flex w="full" justifyContent="space-between" alignItems="center">
      <Text fontSize="12px" textTransform="capitalize">
        {country}
      </Text>
      <Badge
        // bgColor={
        //   pathname === `/village/[id]/${item.path}`
        //     ? item.badgeColor
        //     : "#FBFBFA"
        // }
        // color={pathname === `/village/[id]/${item.path}` ? "white" : ""}
        fontSize="11px"
        fontWeight="400"
        lineHeight={2}
        px={2}
        minW={8}
        h={5}
        borderRadius="xl"
      >
        <Center>{count}</Center>
      </Badge>
    </Flex>
  );
};

export default GraduateStatByCountries;
