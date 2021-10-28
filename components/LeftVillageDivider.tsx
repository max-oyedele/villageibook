import { Fragment } from "react";
import Link from "next/link";

import { HStack, Divider, Button } from "@chakra-ui/react";

import {Village} from "types/schema";

const LeftVillageDivider:React.FC<{title?: string, village: Village}> = ({title, village}) => {
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
          px={8}
          _focus={{ boxShadow: "none" }}
        >
          <Link href={`/village/${village?.uuid}`}>{title??"Go Village"}</Link>
        </Button>
        <Divider />
      </HStack>
    </Fragment>
  );
};

export default LeftVillageDivider;
