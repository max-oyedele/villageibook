import React, { Fragment } from "react";
import {
  Flex,
  Badge,
  Text,
  useBreakpointValue,
  propNames,
} from "@chakra-ui/react";

const AlphaBetaBar = (props:any) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });
  const az = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <Fragment>
      <Flex justifyContent="space-between" wrap="wrap" borderRadius="full" p="2px" border="1px" borderColor="greenTone">
        {az.map((letter) => (
          <Badge
            key={letter}
            bgColor={
              letter === props.selectedLetter ? "greenTone" : "transparent"
            }
            color={letter === props.selectedLetter ? "white" : "greenTone"}
            borderRadius="full"
            px={4}
            cursor="pointer"
            onClick={()=>props.setSelectedLetter(letter)}
          >
            {letter}
          </Badge>
        ))}
      </Flex>
    </Fragment>
  );
};

export default AlphaBetaBar;
