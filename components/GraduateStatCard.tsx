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

import GraduateStatCapsule from "./GraduateStatCapsule";

import VillageGraduatePercent from "./VillageGraduatePercent";

const GraduateStatCard: React.FC<{
  totalGraduates: number;
  villageName: string;
  villageGraduates: number;
  bangladeshGraduates: any;
}> = ({
  totalGraduates,
  villageName,
  villageGraduates,
  bangladeshGraduates,
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
        <VillageGraduatePercent
          totalGraduates={totalGraduates}
          villageName={villageName}
          villageGraduates={villageGraduates}
        />

        <VStack divider={<StackDivider />} mt={8}>
          {Object.keys(bangladeshGraduates).map((region) => (
            <Flex
              w="full"
              key={region}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                fontSize="12px"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {region}
              </Text>
              <GraduateStatCapsule
                inter={bangladeshGraduates[region].inter}
                oversea={bangladeshGraduates[region].oversea}
              />
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Fragment>
  );
};

export default GraduateStatCard;
