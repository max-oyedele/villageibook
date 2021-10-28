import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";
import { Village } from "types/schema";
import { useRouter } from "next/router";

const RecentVillageCard: React.FC<{ village: Village }> = ({ village }) => {
  const router = useRouter();
  
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
          transform: "scale(1.03)",
          transition: "transform 0.2s ease",
          cursor: "pointer",
        }}
        onClick={() => router.push(`/village/${village?.uuid}`)}
      >
        <Image src={village.img} alt="" borderRadius="4px" />
        <Box w="full" ml={4}>
          <Text fontSize="13px">{village.name}</Text>
          <Text fontSize="12px" color="GrayText">
            {village.recentAt === 0
              ? "Today"
              : village.recentAt === 1
              ? "Yesterday"
              : `${village.recentAt} days ago`}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default RecentVillageCard;
