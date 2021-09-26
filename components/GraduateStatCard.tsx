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
  useBreakpointValue
} from "@chakra-ui/react";

import GraduateStatCapsule from "./GraduateStatCapsule";

import VillageGraduatePercent from "./VillageGraduatePercent";

const GraduateStatCard: React.FC<{
  totalGraduates: number;
  villageName: string;
  villageGraduates: number;
  bangladeshGraduates: any;
  fixed?: boolean;
}> = ({
  totalGraduates,
  villageName,
  villageGraduates,
  bangladeshGraduates,
  fixed,
}) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Box
        p={6}
        bgColor="white"
        border="1px"
        minW="240px"
        w={fixed ? "240px" : "full"}
        borderRadius="6px"
        borderColor="gray.200"
        pos={fixed ? "fixed" : "static"}
        top={fixed ? "80px" : 0}
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

export default GraduateStatCard;
