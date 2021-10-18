import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";
import { Step } from "rdx/types";

const ToastWrapper = ({ children }) => {
  const {
    jwt,
    me:authMe,
    error: authError,
  } = useSelector((state: OurStore) => state.authReducer);

  const {
    status: userStatus,
    meStep: meStep,
    meError: meError,
    userError: userError
  } = useSelector((state: OurStore) => state.userReducer);

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
    if (userError) {
      toast({
        title: "User Information Failed!",
        description: userError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [jwt, authMe, authError, meError, userError]);

  return children;
};

export default ToastWrapper;
