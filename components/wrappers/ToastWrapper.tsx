import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import { MyThunkDispatch, OurStore } from "rdx/store";
import { Register } from "rdx/types";

const ToastWrapper = ({children}) => {
  const dispatch: MyThunkDispatch = useDispatch();
  const { jwt, register, error: authError } = useSelector(
    (state: OurStore) => state.authReducer
  );
  const { error: profileError } = useSelector(
    (state: OurStore) => state.profileReducer
  );

  const toast = useToast();
  useEffect(() => {
    if (register === Register.COMPLETED) {
      toast({
        title: "Account created successfully!",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    if (authError) {
      toast({
        title: "Authentication Failed!",
        description: authError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (profileError) {
      toast({
        title: "Submit Failed!",
        description: profileError,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [jwt, authError, profileError]);

  return children;
};

export default ToastWrapper;
