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
  Tooltip,
} from "@chakra-ui/react";

const AccountQuestionBar: React.FC<{
  question: string;
  isTrue: boolean;
  setIsTrue;
  yesTooltip: string;
  noTooltip: string;
}> = ({ question, isTrue, setIsTrue, yesTooltip, noTooltip }) => {
  return (
    <Fragment>
      <Box justifyContent="space-between" fontSize="14px">
        <Text fontSize="13px" color="GrayText">
          {question}
        </Text>

        <HStack mt={2}>
          <Tooltip label={yesTooltip} placement="bottom-start">
            <Text
              color={isTrue ? "purpleTone" : "GrayText"}
              cursor="pointer"
              onClick={() => setIsTrue(true)}
            >
              Yes
            </Text>
          </Tooltip>

          <Text color="gray.200">|</Text>

          <Tooltip label={noTooltip} placement="bottom-start">
            <Text
              color={isTrue ? "GrayText" : "purpleTone"}
              cursor="pointer"
              onClick={() => setIsTrue(false)}
            >
              No
            </Text>
          </Tooltip>
        </HStack>
      </Box>
    </Fragment>
  );
};

export default AccountQuestionBar;
