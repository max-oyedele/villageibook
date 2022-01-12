import { Fragment } from "react";
import { useRouter } from "next/router";
import {
  HStack,
  VStack,
  Divider,
  Flex,
  Box,
  Image,
  Text,
  Badge,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import ImageBox from "components/widgets/ImageBox";
import { Video } from "types/data";

const PhotoCard: React.FC<{ photo: Video }> = ({ photo }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  return (
    <Fragment>
      <Flex w="full" flexDirection="column">
        <ImageBox imageUrl={photo.url} />
      </Flex>
    </Fragment>
  );
};

export default PhotoCard;
