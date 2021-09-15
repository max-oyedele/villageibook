import { Fragment } from "react";
import Link from "next/link";
import {
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

import VillageGraduatePercent from "./VillageGraduatePercent";

const VillageGraduatesCard: React.FC<{
  totalGraduates: number;
  villageName: string;
  villageGraduates: number;
  countryGraduates: any;
}> = ({ totalGraduates, villageName, villageGraduates, countryGraduates }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const maxRowsPerCol = Object.keys(countryGraduates).length / 2 + Object.keys(countryGraduates).length % 2;

  return (
    <Fragment>
      {breakpointValue === "md" && (
        <HStack spacing={12} align="start">
          <VillageGraduatePercent
            totalGraduates={totalGraduates}
            villageName={villageName}
            villageGraduates={villageGraduates}
          />
          <VStack w="full" divider={<Divider />}>
            {Object.keys(countryGraduates).map((country, index) => {
              if (index >= maxRowsPerCol) return null;
              return (
                <CountryBox key={country} country={country} countryGraduates={countryGraduates} />
              );
            })}
          </VStack>
          <VStack w="full" divider={<Divider />}>
            {Object.keys(countryGraduates).map((country, index) => {
              if (index < maxRowsPerCol) return null;
              return (
                <CountryBox key={country} country={country} countryGraduates={countryGraduates} />
              );
            })}
          </VStack>
        </HStack>
      )}
    </Fragment>
  );
};

const CountryBox: React.FC<{country: string, countryGraduates: any}> = ({country, countryGraduates}) => {
  return (
    <Flex
      w="full"
      key={country}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="12px" textTransform="capitalize">
        {country}
      </Text>
      <Capsule oversea={countryGraduates[country]} />
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

export default VillageGraduatesCard;
