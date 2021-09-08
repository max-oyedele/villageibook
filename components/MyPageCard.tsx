import { Fragment } from "react";
import { useRouter } from "next/router";
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

import { myVillageItems } from "constants/myVillageItems";
import { myVillageStats } from "data/myPages";
import type { MyPage } from "data/myPages";

const MyPageCard: React.FC<{ myPage: MyPage }> = ({ myPage }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <HStack border="1px" borderColor="gray.300" borderRadius="5px">
        <Image src={myPage.user.img} alt="" />
        <Box w="full" p={4}>
          <Text
            fontSize="12px"
            fontWeight="400"
            color="grayText"
            textTransform="capitalize"
          >
            {myPage.region}
          </Text>
          <Text
            fontSize="18px"
            fontWeight="700"
            color="primary"
            textTransform="capitalize"
          >
            {myPage.user.name}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="grayText" mt={2}>
            {myPage.desc}
          </Text>
        </Box>
        <Box w="200px">
          <Button
            w="120px"
            h="26px"
            fontSize="12px"
            fontWeight="400"
            bgColor="purpleTone"
            color="white"
          >
            View Profile
          </Button>
        </Box>
      </HStack>
    </Fragment>
  );
};

export default MyPageCard;
