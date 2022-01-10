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

import { District, SubDistrict, Village } from "types/schema";
import GraduatePercent from "./GraduatePercent";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

import { platformCountries, homeCountry, watchCountries } from "constants/global";
const totalGraduatesCount = 1000;

const GraduatesLocationStatCard: React.FC<{
  location: District | SubDistrict | Village;
  condition: string;
  direction: string;
}> = ({ location, condition, direction }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { villageGraduates, graduateStatsByCondition } = useFetchData();
  const { getGraduatesByConditionData } = useActionDispatch();

  useEffect(() => {
    if (location) {
      const universityCountries = watchCountries.filter(e => e.href != "other").map(e => e.href).join(",");
      getGraduatesByConditionData({ universityCountries, locationUuid: location?.uuid });
    }
  }, [location]);

  useEffect(() => {

  }, [graduateStatsByCondition])

  const maxRowsPerCol = Math.floor(
    watchCountries.length / 2 + (watchCountries.length % 2)
  );

  const getGraduatesCountByLocation = (location) => {
    const existedItem = graduateStatsByCondition.find(e => e.location === location.name);
    return existedItem?.graduates ?? 0;
  }

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <Stack
          direction={direction as StackDirection}
          spacing={direction === "row" ? 12 : 6}
          align="start"
          bgColor="white"
          border="1px"
          borderRadius="8px"
          borderColor="gray.200"
          p={4}
        >
          <GraduatePercent
            location={location}
            totalCount={totalGraduatesCount}
            graduatesCount={graduateStatsByCondition.reduce((acc, val) => { return acc + val.graduates }, 0)}
          />

          {direction === "column" && (
            <VStack w="full" divider={<Divider />}>
              {watchCountries.map((country, index) => (
                <CountryBox
                  key={country.id}
                  country={country}
                  count={getGraduatesCountByLocation(country)}
                />
              ))}
            </VStack>
          )}

          {direction === "row" && (
            <>
              <VStack w="full" divider={<Divider />}>
                {watchCountries.map((country, index) => {
                  if (index >= maxRowsPerCol) return null;
                  return (
                    <CountryBox
                      key={country.id}
                      country={country}
                      count={getGraduatesCountByLocation(country)}
                    />
                  );
                })}
              </VStack>
              <VStack w="full" divider={<Divider />}>
                {watchCountries.map((country, index) => {
                  if (index < maxRowsPerCol) return null;
                  return (
                    <CountryBox
                      key={country.id}
                      country={country}
                      count={getGraduatesCountByLocation(country)}
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
            location={location}
            totalCount={totalGraduatesCount}
            graduatesCount={villageGraduates.length}
          />
          <VStack w="full" divider={<Divider />}>
            {watchCountries.map((country, index) => (
              <CountryBox
                key={country.id}
                country={country}
                count={getGraduatesCountByLocation(country)}
              />
            ))}
          </VStack>
        </VStack>
      )}
    </Fragment>
  );
};

import { Country } from "types/schema";

const CountryBox: React.FC<{ country: Country; count: number }> = ({
  country,
  count,
}) => {
  return (
    <Flex w="full" justifyContent="space-between" alignItems="center">
      <Text fontSize="12px" textTransform="capitalize">
        {country.name}
      </Text>
      <Capsule count={count} flag={country.name === homeCountry.name ? "domestic" : "oversea"} />
    </Flex>
  );
};

const Capsule: React.FC<{ count: number, flag: string }> = ({ count, flag }) => {
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
          {
            flag === "domestic" &&
            <BiHomeAlt fontSize="12px" color="gray.300" />
          }
          {
            flag === "oversea" &&
            <RiGlobalLine fontSize="12px" color="gray.300" />
          }
          <Text fontSize="10px" lineHeight={2}>
            {count}
          </Text>
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default GraduatesLocationStatCard;
