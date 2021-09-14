import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { OurStore } from "rdx/store";

const Toast = () => {
  const { jwt, error } = useSelector(
    (state: OurStore) => state.authReducer
  );

  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: "Failed",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [jwt, error]);

  return null;
};

export default Toast;
