import React, { Fragment } from "react";
import { Text, useBreakpointValue } from "@chakra-ui/react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  const breakpointValue = useBreakpointValue({base: 'base', md: 'md'})

  return (
    <Fragment>
      <Text fontSize="26px" fontWeight="bold" textAlign={breakpointValue === 'base' ? 'center' : 'left'}>
        {title}
      </Text>
    </Fragment>
  );
};

export default PageTitle;
