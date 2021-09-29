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

const GraduatePercent: React.FC<{
  village: string;
  totalCount: number;
  graduatesCount: number;
}> = ({ village, totalCount, graduatesCount }) => {
  return (
    <Fragment>
      <Box w="full">
        <Text fontSize="13px" textTransform="capitalize">
          {village} Graduates
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
