import React, { Fragment } from "react";
import {
  Flex,
  HStack,
  VStack,
  Divider,
  Box,
  Text,
  Image,
  Progress,
} from "@chakra-ui/react";

import { BiHomeAlt } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";

const StatCapsule: React.FC<{
  domestic: number;
  overseas: number;
  style?: {
    width?: string;
    bgColor?: string;
    border?: string;
    borderColor?: string;
    borderRadius?: string;
    iconColor?: string;
    separatorColor?: string;
    color?: string;
  }
}> = ({
  domestic,
  overseas,
  style
}) => {
    return (
      <Fragment>
        <Flex>
          <HStack
            w={`${style?.width ?? "50px"}`}
            bgColor={`${style?.bgColor ?? "transparent"}`}
            border={`${style?.border ?? "1px"}`}
            borderColor={`${style?.borderColor ?? "gray.300"}`}
            borderLeftRadius={`${style?.borderRadius ?? "25px"}`}
            borderRight="0px"
            px={2}
          >            
            <BiHomeAlt fontSize="12px" color={`${style?.iconColor ?? "gray.300"}`} />
            <Text color={`${style?.color ?? "GrayText"}`} fontSize="10px" fontWeight="semibold" lineHeight={1.8}>
              {domestic}
            </Text>
          </HStack>
          <Divider orientation="vertical" h="20px" borderColor={`${style?.separatorColor ?? "gray.300"}`} />
          <HStack
            w={`${style?.width ?? "50px"}`}
            bgColor={`${style?.bgColor ?? "transparent"}`}
            border={`${style?.border ?? "1px"}`}
            borderColor={`${style?.borderColor ?? "gray.300"}`}
            borderRightRadius={`${style?.borderRadius ?? "25px"}`}
            borderLeft="0px"
            px={2}
          >            
            <RiGlobalLine fontSize="12px" color={`${style?.iconColor ?? "gray.300"}`} />
            <Text color={`${style?.color ?? "GrayText"}`} fontSize="10px" fontWeight="semibold" lineHeight={1.8}>
              {overseas}
            </Text>
          </HStack>
        </Flex>
      </Fragment >
    );
  };

export default StatCapsule;