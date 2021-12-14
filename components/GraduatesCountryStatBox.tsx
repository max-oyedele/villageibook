import { Fragment, useEffect } from "react";
import {
  Stack,
  StackDirection,
  HStack,
  VStack,
  Divider,
  Flex,
  Center,
  Text,
  Image,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";

import { platformCountries, homeCountry, watchCountries } from "constants/global";

const GraduatesCountryStatBox: React.FC<{  
  graduateStats: any[];
}> = ({ graduateStats }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  
  const getGraduatesCountByLocation = (location) => {
    const existedItem = graduateStats.find(e => e.location === location.name);
    return existedItem?.graduates ?? 0;
  }

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <VStack w="full" divider={<Divider />}>
          {watchCountries.map((country, index) => (
            <CountryBox
              key={country.id}
              country={country}
              count={getGraduatesCountByLocation(country)}
              badgeBgColor="#eeeeee"
              badgeColor="purpleTone"
            />
          ))}
        </VStack>
      )}

      {breakpointValue === "base" && (
        <VStack w="full" divider={<Divider />}>
          {watchCountries.map((country, index) => (
            <CountryBox
              key={country.id}
              country={country}
              count={getGraduatesCountByLocation(country)}
              badgeBgColor="#eeeeee"
              badgeColor="purpleTone"
            />
          ))}
        </VStack>
      )}
    </Fragment>
  );
};

import { Country } from "types/schema";

const CountryBox: React.FC<{
  country: Country;
  count: number,
  badgeBgColor: string,
  badgeColor: string
}> = ({
  country,
  count,
  badgeBgColor,
  badgeColor
}) => {
    return (
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <Text fontSize="12px" textTransform="capitalize">
          {country.name}
        </Text>
        <Badge
          bgColor={badgeBgColor}
          color={badgeColor}
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

export default GraduatesCountryStatBox;
