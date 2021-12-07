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

import {Village} from "types/schema";
import LeftVillageDivider from "./LeftVillageDivider";
import LeftVillageItems from "./LeftVillageItems";
import CaptionCard from "./CaptionCard";
import VideoBox from "./widgets/VideoBox";

const LeftVillageCard:React.FC<{village: Village, fixed?:boolean}> = ({village, fixed}) => {
  return (
    <Fragment>
      <Box bgColor="white" border="1px" borderRadius="8px" borderColor="gray.200" w="240px" pos={fixed ? "fixed" : "static"} top={fixed ? "80px" : 0}>
        <Box p={4}>
          <CaptionCard name={village?.name} />
        </Box>
        <LeftVillageDivider village={village} />
        <Box p={4}>
          <LeftVillageItems village={village} badgeShow={true} />
        </Box>
      </Box>
    </Fragment>
  );
};

export default LeftVillageCard;
