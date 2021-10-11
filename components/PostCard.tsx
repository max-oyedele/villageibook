import React, { Fragment } from "react";
import Link from "next/link";
import ReactReadMoreReadLess from "react-read-more-read-less";

import {
  Flex,
  Stack,
  Box,
  Text,
  Avatar,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import VideoBox from "components/VideoBox";
import { Post } from "types/data";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Box w="full" p={4} bgColor="white" borderRadius="6px" border="1px" borderColor="gray.200">
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          bgColor="white"
          borderRadius="6px"
        >
          <Link href={`/userview/${post.user.id}`}>
            <Avatar src={post.user.avatarUrl} size="sm" cursor="pointer" />
          </Link>
          <Box w="full" ml={4}>
            <Link href={`/userview/${post.user.id}`}>
              <Text
                display="inline"
                fontSize="13px"
                textTransform="capitalize"
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {post.user.firstName} {post.user.lastName}
              </Text>
            </Link>
            <Text fontSize="11px" color="GrayText">
              {post.lastAt}
            </Text>
          </Box>
        </Flex>

        <Text fontSize="13px" my={4}>
          <ReactReadMoreReadLess
            charLimit={200}
            readMoreText={"see more"}
            readLessText={"see less"}
            readMoreStyle={{ color: "#553CFB", cursor: "pointer" }}
            readLessStyle={{ color: "#553CFB", cursor: "pointer" }}
          >
            {post.contents.text}
          </ReactReadMoreReadLess>
        </Text>

        <Stack direction={{ base: "column", lg: "row" }} spacing={4}>
          {post.contents.img && (
            <Box w="full">
              <Image
                src={post.contents.img}
                alt=""
                borderRadius="4px"
                w="full"
                h="full"
                fit="cover"
              />
            </Box>
          )}
          {post.contents.video && (
            <Box w="full">
              <VideoBox
                video={post.contents.video}
              />
            </Box>
          )}
        </Stack>
      </Box>
    </Fragment>
  );
};

export default PostCard;
