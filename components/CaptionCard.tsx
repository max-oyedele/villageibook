import React, { Fragment } from "react";
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { MyThunkDispatch, OurStore } from "rdx/store";

const CaptionCard = () => {
  const dispatch: MyThunkDispatch = useDispatch();
  const {
    posts,
    recentVillages,
    recentUsers,
    totalGraduates,
    village,
    villageGraduates,
    bangladeshGraduates,
  } = useSelector((state: OurStore) => state.browsePageReducer.pageData);

  return (
    <Fragment>
      <Flex
        w="full"
        flexDirection="column"
        justifyContent="center"
        p={6}
        bgColor="#EEECFF"
        color="purpleTone"
        borderRadius="6px"
      >
        <Text fontSize="24px">Welcome</Text>
        <Text fontSize="24px" fontWeight="700" mt={2}>
          to {village.name ? village.name : "VillageiBook"}
        </Text>
      </Flex>
    </Fragment>
  );
};

export default CaptionCard;
