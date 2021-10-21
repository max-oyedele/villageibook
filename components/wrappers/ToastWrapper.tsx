import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import useFetchData from "hooks/use-fetch-data";
import { Status } from "rdx/types";

const ToastWrapper = ({ children }) => {
  const {
    jwt,
    authMe,
    authError,
    meStep,
    meError,
    postStatus,
    postError,
    userError
  } = useFetchData();

  const toast = useToast();
  useEffect(() => {
    if (authError) {
      toast({
        title: "Authentication Failed!",
        description: authError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (authMe) {
      toast({
        title: "Account created successfully!",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    if (meError) {
      toast({
        title: "Failed. Please try again.",
        description: meError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (postStatus === Status.SUCCESS) {
      toast({
        title: "Successfully Posted.",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    if (postError) {
      toast({
        title: "Post Failed. Please try again.",
        description: postError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (userError) {
      toast({
        title: "User Information Failed!",
        description: userError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [jwt, authMe, authError, meError, userError, postStatus, postError]);

  return children;
};

export default ToastWrapper;
