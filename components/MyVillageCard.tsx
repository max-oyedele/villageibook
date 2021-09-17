import { Fragment } from "react";
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

import MyVillageDivider from "./MyVillageDivider";
import MyVillageItems from "./MyVillageItems";

const villageName = "jammura";
const userName = "mohammed shah";

const MyVillageCard = () => {
  return (
    <Fragment>
      <Box bgColor="white" borderRadius="6px">
        <Flex w="full" flexDirection="column" alignItems="center" p={4}>
          <Avatar size="lg" src="/images/mohammed-shah.png" />
          <Text
            fontSize="15px"
            mt={4}
            textTransform="capitalize"
          >
            {userName}
          </Text>
          <Text
            fontSize="12px"
            fontWeight="400"
            color="GrayText"
            mt={2}
            textTransform="capitalize"
          >
            {villageName}
          </Text>
        </Flex>
        <MyVillageDivider />
        <Box p={4}>
          <MyVillageItems />
        </Box>
      </Box>
    </Fragment>
  );
};

export default MyVillageCard;
