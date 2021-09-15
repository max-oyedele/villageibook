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

import type { MyPage } from "data/myPages";

const MyPageCard: React.FC<{ myPage: MyPage }> = ({ myPage }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <HStack w="full" border="1px" borderColor="gray.300" borderRadius="5px">
        <Box pos="relative" minW="max-content">
          <Image src={myPage.img} alt="" w="135px" h="135px" fit="cover" />
          {myPage.role === "premium" && (
            <Box pos="absolute" top={2} left={2}>
              <Badge fontSize="9px" borderRadius="full" px={2}>
                PREMIUM
              </Badge>
            </Box>
          )}
        </Box>

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
            fontWeight="500"
            color="primary"
            textTransform="capitalize"
          >
            {myPage.name}
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
