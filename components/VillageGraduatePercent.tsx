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

const VillageGraduatePercent: React.FC<{
  villageName: string;
  totalGraduates: number;
  villageGraduates: number;
}> = ({ villageName, totalGraduates, villageGraduates }) => {
  return (
    <Fragment>
      <Box w="full">
        <Text fontSize="13px" textTransform="capitalize">
          {villageName} Graduates
        </Text>
        <Progress
          max={totalGraduates}
          value={villageGraduates}
          size="xs"
          colorScheme="purple"
          mt={4}
        />
        <Flex justifyContent="space-between" mt={4}>
          <HStack>
            <Text fontSize="26px" fontWeight="bold" color="purpleTone">
              {villageGraduates}
            </Text>
            <Text fontSize="11px">
              /{totalGraduates}
            </Text>
          </HStack>
          <Text fontSize="11px">
            {(villageGraduates / totalGraduates) * 100}%
          </Text>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default VillageGraduatePercent;
