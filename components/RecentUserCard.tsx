import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";

const RecentUserCard: React.FC<{ name: string; img: string; recentAt: number }> = ({
  name,
  img,
  recentAt,
}) => {
  return (
    <Fragment>
      <Flex
        w="full"
        justifyContent="center"
        alignItems="center"
        p={4}
        bgColor="white"
        borderRadius="6px"
        _hover={{transform: "scale(1.03)", transition: "transform 0.2s ease", cursor: "pointer"}}
      >
        <Image src={img} alt="" borderRadius="4px" />
        <Box w="full" ml={4}>
          <Text fontSize="13px">
            {name}
          </Text>
          <Text fontSize="12px" color="GrayText">
            {recentAt === 0
              ? "Today"
              : recentAt === 1
              ? "Yesterday"
              : `${recentAt} days ago`}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default RecentUserCard;
