import React, { Fragment } from "react";
import {
  HStack,
  Box,
  Text,
  Circle,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";

const Stepper: React.FC<{ activeStep: number }> = ({
  activeStep
}) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <HStack>
        {[1, 2, 3].map((e) => (
          <Fragment key={e}>
            <Circle
              size="24px"
              bgColor={e <= activeStep ? "purpleTone" : "#e0e0e0"}
              color="white"
            >
              {e}
            </Circle>
            {
              e !== 3 && 
              <Divider w={12} />
            }
          </Fragment>
        ))}
      </HStack>
    </Fragment>
  );
};

export default Stepper;
