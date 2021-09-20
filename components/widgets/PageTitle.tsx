import React, { Fragment } from "react";
import { HStack, Text, useBreakpointValue } from "@chakra-ui/react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <HStack h={24}>
        <Text
          w="full"
          fontSize="26px"
          fontWeight="600"
          textAlign={breakpointValue === "base" ? "center" : "left"}
          textTransform="capitalize"
        >
          {title}
        </Text>
      </HStack>
    </Fragment>
  );
};

export default PageTitle;
