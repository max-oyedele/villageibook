import { Fragment } from "react";
import Link from "next/link";
import { Box, Text, Image, Button } from "@chakra-ui/react";

const ContactCard = () => {
  return (
    <Fragment>
      <Box w="full" pos="relative">
        <Image src="/images/email-card.png" w="full" fit="cover" alt="" borderRadius="4px"/>
        <Box pos="absolute" top="70%" left="10%">
          <Button
            w="110px"
            h="30px"
            variant="outline"
            color="white"
            fontSize="10px"
            fontWeight="400"
          >
            EMAIL NOW
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ContactCard;
