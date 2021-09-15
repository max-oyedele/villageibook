import React, { Fragment } from "react";
import { Text, useBreakpointValue } from "@chakra-ui/react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  const breakpointValue = useBreakpointValue({base: 'base', md: 'md'})

  return (
    <Fragment>
      <Text w="full" fontSize="26px" fontWeight="600" textAlign={breakpointValue === 'base' ? 'center' : 'left'} textTransform="capitalize">
        {title}
      </Text>
    </Fragment>
  );
};

export default PageTitle;
