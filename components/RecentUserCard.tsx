import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import moment from "moment";

import { User } from "types/schema";

const RecentUserCard: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const ago = moment(user.lastUpdated).fromNow();

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
        onClick={() => router.push(`/userview/${user.id}`)}
      >
        <Avatar src={user.avatar ?? "/images/default-user.png"} size="sm" cursor="pointer" />
        <Box w="full" ml={4}>
          <Text fontSize="13px" textTransform="capitalize">
            {user.firstName} {user.lastName}
          </Text>
          <Text fontSize="12px" color="GrayText">
            {ago}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default RecentUserCard;
