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
  const { error: userError } = useSelector(
    (state: OurStore) => state.userReducer
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
    if (userError) {
      toast({
        title: "Submit Failed!",
        description: userError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [jwt, authError, userError]);

  return children;
};

export default ToastWrapper;
