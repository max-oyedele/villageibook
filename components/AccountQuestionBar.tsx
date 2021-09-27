import { Fragment } from "react";
import Link from "next/link";
import {
  VStack,
  HStack,
  Flex,
  Box,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";

const AccountQuestionBar: React.FC<{
  question: string;
  isTrue: boolean;
  setIsTrue;
}> = ({ question, isTrue, setIsTrue }) => {
  return (
    <Fragment>
      <Box justifyContent="space-between" fontSize="14px">
        <Text>{question}</Text>

        <HStack mt={2}>
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
      </Box>
    </Fragment>
  );
};

export default AccountQuestionBar;
