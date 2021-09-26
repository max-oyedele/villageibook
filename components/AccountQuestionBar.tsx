import { Fragment } from "react";
import Link from "next/link";
import { HStack, Flex, Box, Text, Image, Button } from "@chakra-ui/react";

const AccountQuestionBar: React.FC<{
  question: string;
  isTrue: boolean;
  setIsTrue;
}> = ({ question, isTrue, setIsTrue }) => {
  return (
    <Fragment>
      <Flex justifyContent="space-between" fontSize="13px">
        <Text>{question}</Text>
        <HStack spacing={4}>
          <Text
            color={isTrue ? "purpleTone" : ""}
            cursor="pointer"
            onClick={() => setIsTrue(true)}
          >
            Yes
          </Text>
          <Text color="gray.200">|</Text>
          <Text
            color={isTrue ? "" : "purpleTone"}
            cursor="pointer"
            onClick={() => setIsTrue(false)}
          >
            No
          </Text>
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default AccountQuestionBar;
