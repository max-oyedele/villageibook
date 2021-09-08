import React, { Fragment } from "react";
import {
  Flex,
  HStack,
  VStack,
  StackDivider,
  Box,
  Text,
  Image,
  Progress,
} from "@chakra-ui/react";

import VillageGraduatePercent from "./VillageGraduatePercent";

const GraduateStatCard: React.FC<{ 
  totalGraduates: number;
  villageName: string;
  villageGraduates: number;
  bangladeshGraduates: any
}> = ({
  totalGraduates, villageName, villageGraduates, bangladeshGraduates
}) => {
  return (
    <Fragment>
      <Flex
        w="full"
        flexDirection="column"
        p={6}
        bgColor="white"
        borderRadius="6px"
      >
        <VillageGraduatePercent totalGraduates={totalGraduates} villageName={villageName} villageGraduates={villageGraduates} />

        <VStack divider={<StackDivider />} mt={8}>
          {Object.keys(bangladeshGraduates).map((region) => (
            <Flex w="full" key={region} justifyContent="space-between" alignItems="center">
              <Text fontSize="12px" fontWeight="bold" textTransform="capitalize">{region}</Text>
              <Capsule inter={bangladeshGraduates[region].inter} oversea={bangladeshGraduates[region].oversea}/>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Fragment>
  );
};

const Capsule: React.FC<{ inter: number; oversea: number }> = ({
  inter,
  oversea,
}) => {
  return (
    <Fragment>
      <Flex>
        <HStack w="50px" borderLeftRadius="25px" border="1px" borderColor="gray.300" px={2}>
          <Image src="/icons/graduate-inter.svg" alt="" />
          <Text fontSize="10px" fontWeight="bold">
            {inter}
          </Text>
        </HStack>
        <HStack w="50px" borderRightRadius="25px" border="1px" borderColor="gray.300" px={2}>
          <Image src="/icons/graduate-oversea.svg" alt="" />
          <Text fontSize="10px" fontWeight="bold">
            {oversea}
          </Text>
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default GraduateStatCard;
