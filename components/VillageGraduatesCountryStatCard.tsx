import { Fragment, useEffect } from "react";
import Link from "next/link";
import {
  Stack,
  StackDirection,
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Text,
  Image,
  Button,
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

import GraduatePercent from "./GraduatePercent";

const totalGraduatesCount = 1000;

const VillageGraduatesCountryStatCard: React.FC<{
  village: string;
  direction: string;
}> = ({ village, direction }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const dispatch: MyThunkDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const { countries } = useSelector((state: OurStore) => state.locationReducer);
  const { graduates, articles, personalities, institutions, videos } =
    useSelector((state: OurStore) => state.villagePageReducer.pageData);

  const maxRowsPerCol = Math.floor(
    countries.length / 2 + (countries.length % 2)
  );

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
            village={village}
            totalCount={totalGraduatesCount}
            graduatesCount={graduates.length}
          />

          {direction === "column" && (
            <VStack w="full" divider={<Divider />}>
              {countries.map((country, index) => (
                <CountryBox
                  key={country.id}
                  country={country}
                  count={
                    graduates.filter(
                      (user) => user.graduatedAt === country.href
                    ).length
                  }
                />
              ))}
            </VStack>
          )}

          {direction === "row" && (
            <>
              <VStack w="full" divider={<Divider />}>
                {countries.map((country, index) => {
                  if (index >= maxRowsPerCol) return null;
                  return (
                    <CountryBox
                      key={country.id}
                      country={country}
                      count={
                        graduates.filter(
                          (user) => user.graduatedAt === country.href
                        ).length
                      }
                    />
                  );
                })}
              </VStack>
              <VStack w="full" divider={<Divider />}>
                {countries.map((country, index) => {
                  if (index < maxRowsPerCol) return null;
                  return (
                    <CountryBox
                      key={country.id}
                      country={country}
                      count={
                        graduates.filter(
                          (user) => user.graduatedAt === country.href
                        ).length
                      }
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
            village={village}
            totalCount={totalGraduatesCount}
            graduatesCount={graduates.length}
          />
          <VStack w="full" divider={<Divider />}>
            {countries.map((country, index) => (
              <CountryBox
                key={country.id}
                country={country}
                count={
                  graduates.filter(
                    (user) => user.graduatedAt === country.href
                  ).length
                }
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
      <Capsule oversea={count} />
    </Flex>
  );
};

const Capsule: React.FC<{ oversea: number }> = ({ oversea }) => {
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
          <Image src="/icons/graduate-oversea.svg" alt="" />
          <Text fontSize="10px" lineHeight={2}>
            {oversea}
          </Text>
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default VillageGraduatesCountryStatCard;
