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
  Button
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

const GraduateSearchBox = () => {
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
            <Text fontSize="14px">
              TOTAL GRADUATES
            </Text>
            <Text fontSize="36px" fontWeight="700" color="purpleTone" mt={4}>
              10000
            </Text>
          </Box>
          <HStack
            w={{base: "100%", md:"90%"}}
            bgColor="white"
            border="1px"
            borderRadius="8px"
            borderColor="gray.300"
            p={1}
          >
            <Box ml={4}>
              <BiSearch fontSize={20} />
            </Box>
            <Input
              placeholder="Find a district, subdistrict or village"
              size="md"
              border="none"
            />
            <Button w="140px" h="42px" bgColor="purpleTone" color="white" fontSize="14px" fontWeight="400" _focus={{boxShadow: "none"}}>Find now</Button>
          </HStack>
        </VStack>
      </Flex>
    </Fragment>
  );
};

export default GraduateSearchBox;
