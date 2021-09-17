import { Fragment } from "react";
import Link from "next/link";
import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";

import type {Society} from "data/myPage";

const SocietyCard:React.FC<{society: Society}> = ({society}) => {
  return (
    <Fragment>
      <Flex w="full" flexDirection="column" justifyContent="center">
        <Image
          src={society.img}
          w="full"
          fit="cover"
          alt=""
        />
        <Text fontSize="16px" mt={6}>{society.title}</Text>
        <Text fontSize="12px" color="GrayText" mt={4}>{society.desc}</Text>
      </Flex>
    </Fragment>
  );
};

export default SocietyCard;
