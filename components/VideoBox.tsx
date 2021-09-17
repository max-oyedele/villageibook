import { Fragment } from "react";
import { useRouter } from "next/router";
import { BiCaretRight } from "react-icons/bi";

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
  AspectRatio,
  Circle,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import ReactPlayer from "react-player/lazy";

import type { Video } from "data/myPage";

const VideoBox: React.FC<{ video: Video }> = ({ video }) => {
  const router = useRouter();
  const { pathname } = router;

  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Box pos="relative">
        <AspectRatio maxW="full" ratio={4 / 3}>
          <Image
            src={video.img}
            alt="naruto"
            objectFit="cover"
            borderRadius="6px"
          />
        </AspectRatio>
        <Flex
          pos="absolute"
          top={0}
          w="full"
          h="full"
          justifyContent="center"
          alignItems="center"
        >
          <Circle
            w={9}
            h={9}
            bgColor="gray.600"
            _hover={{ bgColor: "red.500", cursor: "pointer" }}
            onClick={onOpen}
          >
            <BiCaretRight fontSize="24px" color="white" />
          </Circle>
        </Flex>
      </Box>

      <Modal
        closeOnOverlayClick={false}
        isCentered
        size={breakpointValue === "base" ? "full" : "3xl"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent m={0} p={0} bgColor="transparent">
          <ModalCloseButton color="white" zIndex={10} />
          <ReactPlayer
            className="react-player"
            url="https://video.vidyard.com/watch/YBvcF2BEfvKdowmfrRwk57"
            width="100%"
            height="100%"
            playing={true}
          />
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default VideoBox;
