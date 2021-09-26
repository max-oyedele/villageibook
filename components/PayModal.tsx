import {Fragment} from "react"

import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const PayModal = () => {
  return (
    <Fragment>
      <Modal isOpen={true} onClose={()=>{}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subscribe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Payment Interface</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Close
            </Button>
            <Button variant="ghost">Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default PayModal;
