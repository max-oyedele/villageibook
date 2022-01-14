import { Flex, Button } from "@chakra-ui/react";

const LngSwitch = (props:any) => {
  return (
    <Flex>
      <Button
        w="107px"
        h="25px"
        fontSize="13px"
        bgColor={props.activeLng === "english" ? "purpleTone" : "#EEECFF"}
        color={props.activeLng === "english" ? "white" : "purpleTone"}
        onClick={() => props.setActiveLng("english")}
      >
        English
      </Button>
      <Button
        w="107px"
        h="25px"
        fontSize="13px"
        bgColor={props.activeLng === "bengali" ? "purpleTone" : "#EEECFF"}
        color={props.activeLng === "bengali" ? "white" : "purpleTone"}
        onClick={() => props.setActiveLng("bengali")}
      >
        Bengali
      </Button>
    </Flex>
  );
};

export default LngSwitch;
