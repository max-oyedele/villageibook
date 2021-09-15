import { Fragment } from "react";
import Link from "next/link";
import { Box, Text, Image, Button } from "@chakra-ui/react";

const SignupCard = () => {
  return (
    <Fragment>
      <Box pos="relative">
        <Image
          src="/images/signup-card.png"
          w="full"
          fit="cover"
          alt="signup"
        />
        <Box pos="absolute" top="70%" left="10%">
          <Button
            w="110px"
            h="30px"
            variant="outline"
            color="white"
            fontSize="10px"
            fontWeight="400"
          >
            <Link href="/signup">SIGN UP</Link>
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default SignupCard;
