import { Fragment } from "react";
import Link from "next/link";
import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";

import type {Society} from "data/myPages";

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
        <Text fontSize="16px" fontWeight="700" mt={6}>{society.title}</Text>
        <Text fontSize="12px" fontWeight="400" color="grayText" mt={4}>{society.desc}</Text>
      </Flex>
    </Fragment>
  );
};

export default SocietyCard;
