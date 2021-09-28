import { Fragment } from "react";
import Link from "next/link";

import { HStack, Divider, Button } from "@chakra-ui/react";

const LeftVillageDivider:React.FC<{title?: string, village: string}> = ({title, village}) => {
  return (
    <Fragment>
      <HStack>
        <Divider />
        <Button
          w="full"
          h="30px"
          bgColor="purpleTone"
          color="white"
          fontSize="13px"
          fontWeight="400"
          _focus={{ boxShadow: "none" }}
        >
          <Link href="/village">{title??"GO VILLAGE"}</Link>
        </Button>
        <Divider />
      </HStack>
    </Fragment>
  );
};

export default LeftVillageDivider;
