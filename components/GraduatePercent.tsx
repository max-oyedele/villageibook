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

import { District, SubDistrict, Village } from "types/schema";

const GraduatePercent: React.FC<{
  location: District | SubDistrict | Village;
  totalCount: number;
  graduatesCount: number;
}> = ({ location, totalCount, graduatesCount }) => {
  return (
    <Fragment>
      <Box w="full">
        <Text fontSize="13px" textTransform="capitalize">
          {location?.name} Graduates
        </Text>
        <Progress
          max={totalCount}
          value={graduatesCount}
          size="xs"
          colorScheme="purple"
          mt={4}
        />
        <Flex justifyContent="space-between" mt={4}>
          <HStack>
            <Text fontSize="26px" fontWeight="bold" color="purpleTone">
              {graduatesCount}
            </Text>
            <Text fontSize="11px">
              /{totalCount}
            </Text>
          </HStack>
          <Text fontSize="11px">
            {(graduatesCount / totalCount) * 100}%
          </Text>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default GraduatePercent;
