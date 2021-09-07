import React, { Fragment } from "react";
import { Flex, Stack, Box, Text, Avatar, Image, useBreakpointValue } from "@chakra-ui/react";

type User = {
  name: string;
  img: string;
};

type Post = {
  text: string;
  imgs: string[];
};

const PostCard: React.FC<{ user: User; ago: string; post: Post }> = ({
  user,
  ago,
  post,
}) => {
  const breakpointValue = useBreakpointValue({base: 'base', md: 'md'})

  return (
    <Fragment>
      <Box w="full" p={4} bgColor="white" borderRadius="6px">
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          bgColor="white"
          borderRadius="6px"
        >
          <Avatar src={user.img} size="base" />
          <Box w="full" ml={4}>
            <Text fontSize="13px" fontWeight="bold">
              {user.name}
            </Text>
            <Text fontSize="11px" color="grayText">
              {ago}
            </Text>
          </Box>
        </Flex>

        <Text fontSize="13px" my={4}>{post.text}</Text>

        <Stack direction={{base: 'column', lg: "row"}} spacing={4}>
          {post.imgs.map((img) => (
            <Image key={img} src={img} alt="" borderRadius="4px" w="full" />
          ))}
        </Stack>
      </Box>
    </Fragment>
  );
};

export default PostCard;
