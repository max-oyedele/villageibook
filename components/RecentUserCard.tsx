import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Flex, HStack, Box, Text, Image, Avatar } from "@chakra-ui/react";

import { User } from "types/schema";

const RecentUserCard: React.FC<{ user: User }> = ({ user }) => {
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
        onClick={() => router.push(`/userview/${user.id}`)}
      >
        <Avatar src={user.avatar??"/images/default-user.png"} size="sm" cursor="pointer" />
        <Box w="full" ml={4}>
          <Text fontSize="13px" textTransform="capitalize">
            {user.firstName} {user.lastName}
          </Text>
          <Text fontSize="12px" color="GrayText">
            {user.recentAt === 0
              ? "Today"
              : user.recentAt === 1
              ? "Yesterday"
              : `${user.recentAt} days ago`}
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default RecentUserCard;
