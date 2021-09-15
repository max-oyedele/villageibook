import { Fragment } from "react";
import {
  SimpleGrid,
  Flex,
  Box,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import SelectBox from "components/widgets/SelectBox";

const SearchBar = () => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Flex justifyContent="center">
        <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={6}>
          <Box h="55px">
            <SelectBox id="district" placeholder="Select District" />
          </Box>
          <Box h="55px">
            <SelectBox id="upazila" placeholder="Select Upazila" />
          </Box>
          <Box h="55px">
            <SelectBox id="village" placeholder="Select Village" />
          </Box>
        </SimpleGrid>
        {breakpointValue === "md" && (
          <Box>
            <Button
              w="165px"
              h="full"
              bgColor="purpleTone"
              fontSize="13px"
              fontWeight="400"
              color="white"
              borderRadius="6px"
              ml={6}
            >
              GO
            </Button>
          </Box>
        )}
      </Flex>

      {breakpointValue === "base" && (
        <Button
          w="full"
          h="55px"
          bgColor="purpleTone"
          fontSize="13px"
          fontWeight="400"
          color="white"
          borderRadius="6px"
          mt={6}
        >
          GO
        </Button>
      )}
    </Fragment>
  );
};

export default SearchBar;
