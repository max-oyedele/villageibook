import { Fragment } from "react";
import { HStack, Divider, Button } from "@chakra-ui/react"; 

const MyVillageDivider = () => {
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
        >
          MY VILLAGE
        </Button>
        <Divider />
      </HStack>
    </Fragment>
  );
};

export default MyVillageDivider;