import { Fragment } from "react";
import {
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Image,
  Text,
  Badge,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import SelectBox from "components/widgets/SelectBox";

const FilterCard = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  
  return (
    <Fragment>
      <VStack w="full" spacing={4}>
        <Flex
          w="full"
          alignItems="center"
          bgColor="#36CFD133"
          borderRadius="8px"
          p={2}
        >
          <Image src="/icons/filter-by-mypage.svg" alt="" w={4} h={4} ml={2} />
          <Box w="full" fontSize="13px" ml={4}>
            My Pages
          </Box>
        </Flex>
        <Flex
          w="full"
          alignItems="center"
          border="1px"
          borderColor="gray.300"
          borderRadius="8px"
          pl={2}
        >
          <Image src="/icons/filter-by-district.svg" alt="" w={4} h={4} ml={2} />
          <Box w="full" ml={2}>
            <SelectBox w="full" height="full" borderColor="transparent" placeholder="By District" />
          </Box>
        </Flex>

        <Flex
          w="full"
          alignItems="center"
          border="1px"
          borderColor="gray.300"
          borderRadius="8px"
          pl={2}
        >
          <Image src="/icons/filter-by-upazila.svg" alt="" w={4} h={4} ml={2} />
          <Box w="full" ml={2}>
            <SelectBox w="full" height="full" borderColor="transparent" placeholder="By Upazila" />
          </Box>
        </Flex>

        <Flex
          w="full"
          alignItems="center"
          border="1px"
          borderColor="gray.300"
          borderRadius="8px"
          pl={2}
        >
          <Image src="/icons/filter-by-village.svg" alt="" w={4} h={4} ml={2} />
          <Box w="full" ml={2}>
            <SelectBox w="full" height="full" borderColor="transparent" placeholder="By Village" />
          </Box>
        </Flex>
      </VStack>
    </Fragment>
  );
};

export default FilterCard;
