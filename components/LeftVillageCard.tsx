import { Fragment, useState, useEffect } from "react";
import {
  HStack,
  Divider,
  Flex,
  Box,
  Button,
  Image,
  Avatar,
  Text,
} from "@chakra-ui/react";

import LeftVillageDivider from "./LeftVillageDivider";
import LeftVillageItems from "./LeftVillageItems";
import CaptionCard from "./CaptionCard";

const LeftVillageCard = ({fixed}) => {
  return (
    <Fragment>
      <Box bgColor="white" border="1px" borderRadius="8px" borderColor="gray.200" w="240px" pos={fixed ? "fixed" : "static"} top={fixed ? "80px" : 0}>
        <Flex w="full" flexDirection="column" alignItems="center" p={4}>
          {/* <Avatar size="lg" src="/images/mohammed-shah.png" />
          <Text fontSize="15px" mt={4} textTransform="capitalize">
            {userName}
          </Text> */}
          <CaptionCard name="Jammura" />
          {/* <Text
            fontSize="12px"
            fontWeight="400"
            color="GrayText"
            mt={2}
            textTransform="capitalize"
          >
            {villageName}
          </Text> */}
        </Flex>
        <LeftVillageDivider />
        <Box p={4}>
          <LeftVillageItems />
        </Box>
      </Box>
    </Fragment>
  );
};

export default LeftVillageCard;
