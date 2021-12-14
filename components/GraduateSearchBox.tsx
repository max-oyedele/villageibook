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
  Input,
  Button,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

import useFetchData from "hooks/use-fetch-data";

const GraduateSearchBox:React.FC<{location: string, setLocation, onFind}> = ({location, setLocation, onFind}) => {
  const totalGraduates = 100;

  return (
    <Fragment>
      <Flex
        w="full"
        flexDirection="column"
        p={6}
        bgColor="#F2F0FE"
        borderRadius="6px"
      >
        <VStack spacing={8}>
          <Box textAlign="center">
            <Text fontSize="14px">TOTAL GRADUATES</Text>
            <Text fontSize="36px" fontWeight="700" color="purpleTone" mt={4}>
              {totalGraduates}
            </Text>
          </Box>
          <HStack
            w={{ base: "100%", md: "90%" }}
            bgColor="white"
            border="1px"
            borderRadius="8px"
            borderColor="gray.300"
            p={1}
          >
            <Box ml={6}>
              <BiSearch fontSize={20} />
            </Box>
            <Input
              placeholder="Find a District, Upazila or Village"
              size="md"
              border="none"
              value={location??""}
              _focus={{outline: "none"}}
              onChange={(e)=>setLocation(e.target.value)}
            />
            <Button
              w="140px"
              h="42px"
              bgColor="purpleTone"
              color="white"
              fontSize="14px"
              fontWeight="400"
              disabled={!location}
              _focus={{ boxShadow: "none" }}
              onClick={onFind}
            >
              Find now
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Fragment>
  );
};

export default GraduateSearchBox;
