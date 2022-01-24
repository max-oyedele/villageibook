import { Fragment } from "react";

import {
  Box,
  Image,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

const ImageBox: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const breakpointValue = useBreakpointValue({ base: "base", md: "md" });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Box w="full" h="full" pos="relative">
        <Image
          src={imageUrl}
          alt=""
          borderRadius="4px"
          w="full"
          h="full"
          fit="cover"
          onClick={onOpen}
        />
        <Modal
          closeOnOverlayClick={true}
          isCentered
          size={breakpointValue === "base" ? "full" : "4xl"}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent m={0} p={0} bgColor="transparent">
            {/* <ModalCloseButton color="white" zIndex={10} /> */}
            <Image
              src={imageUrl}
              alt=""
              borderRadius="4px"
              w="full"
              h="full"
              fit="cover"
            />
          </ModalContent>
        </Modal>
      </Box>
    </Fragment>
  );
};

export default ImageBox;
