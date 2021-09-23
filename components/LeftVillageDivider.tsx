import { Fragment } from "react";
import Link from "next/link";

import { HStack, Divider, Button } from "@chakra-ui/react";

const LeftVillageDivider = () => {
  return (
    <Fragment>
      <HStack>
        <Divider />
        <Button
          w="full"
          h="30px"
          bgColor="purpleTone"
          color="white"
          fontSize="10px"
          fontWeight="400"
          _focus={{ boxShadow: "none" }}
        >
          <Link href="/myvillage">GO VILLAGE</Link>
        </Button>
        <Divider />
      </HStack>
    </Fragment>
  );
};

export default LeftVillageDivider;
