import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight, BiWifi0 } from "react-icons/bi";

import { Flex, HStack, Center, Circle, Text } from "@chakra-ui/react";

const HomeSlickControl = ({sliderIndex, setSliderIndex, styles}) => {
  return (
    <Fragment>
      <Flex justifyContent="space-between" mt={{base: 5, md:8, lg:12}}>
        <HStack spacing={4}>
          <Center
            color={sliderIndex == 0 ? styles.btnColor : styles.btnActiveColor}
            cursor="pointer"
            onClick={() =>
              setSliderIndex((sliderIndex) =>
                sliderIndex > 0 ? sliderIndex - 1 : 0
              )
            }
          >
            <BiChevronLeft fontSize={22} /> <Text lineHeight={0}>Prev</Text>
          </Center>
          <Center
            color={sliderIndex == 2 ? styles.btnColor : styles.btnActiveColor}
            cursor="pointer"
            onClick={() =>
              setSliderIndex((sliderIndex) =>
                sliderIndex < 2 ? sliderIndex + 1 : 2
              )
            }
          >
            <Text lineHeight={0}>Next</Text>
            <BiChevronRight fontSize={22} />
          </Center>
        </HStack>
        <HStack>
          <Circle
            size="5px"
            bgColor={sliderIndex == 0 ? styles.dotActiveColor : styles.dotColor}
          />
          <Circle
            size="5px"
            bgColor={sliderIndex == 1 ? styles.dotActiveColor : styles.dotColor}
          />
          <Circle
            size="5px"
            bgColor={sliderIndex == 2 ? styles.dotActiveColor : styles.dotColor}
          />
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default HomeSlickControl;
