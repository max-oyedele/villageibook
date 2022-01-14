import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import moment from "moment";

import { Village } from "types/schema";

const RecentVillageCard: React.FC<{ village: Village }> = ({ village }) => {
  const router = useRouter();
  const ago = moment(village.lastUpdated).fromNow();
  return (
    <Fragment>
      <Flex
        w="full"
        justifyContent="center"
        alignItems="center"
        p={4}
        bgColor="white"
        borderRadius="6px"
        _hover={{
          // transform: "scale(1.03)",
          // transition: "transform 0.2s ease",
          boxShadow: "sm"
        }}
        cursor="pointer"
        onClick={() => router.push(`/village/${village?.uuid}`)}
      >
        <Image src={village.photo?.url??"/images/default-village.png"} alt="" borderRadius="4px" />
        <Box w="full" ml={4}>
          <Text fontSize="13px">{village.name}</Text>
          <Text fontSize="12px" color="GrayText">
            {ago}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default RecentVillageCard;
