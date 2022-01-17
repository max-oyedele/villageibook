import React, { Fragment, useState, useEffect } from "react";
import {
  Flex,
  HStack,
  VStack,
  StackDivider,
  Box,
  Text,
  Image,
  Progress,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const DeleteDialog: React.FC<{
  uuid: string;
  isOpen,
  onClose,
  onConfirm
}> = ({
  uuid, isOpen, onClose, onConfirm
}) => {
    // const [isOpen, setIsOpen] = React.useState(false)
    // const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    
    return (
      <Fragment>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Data
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={() => onConfirm(uuid)} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Fragment>
    )
  }

export default DeleteDialog;