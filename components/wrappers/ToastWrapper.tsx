import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import useFetchData from "hooks/use-fetch-data";
import useAdminFetchData from "hooks/use-admin-fetch-data";
import { Status } from "rdx/types";

const ToastWrapper = ({ children }) => {
  const {
    jwt,
    signupMe,
    authError,
    meStep,
    meError,
    postStatus,
    postError,
    userError,
  } = useFetchData();

  const {
    error: adminError
  } = useAdminFetchData()

  const toast = useToast();

  useEffect(() => {
    if (authError) {
      !toast.isActive("authError") &&
        toast({
          id: "authError",
          title: "Authentication Failed!",
          description: authError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
    if (signupMe) {
      !toast.isActive("signupMe") &&
        toast({
          id: "signupMe",
          title: "Account created successfully!",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
    }
    if (meError) {
      !toast.isActive("meError") &&
        toast({
          id: "meError",
          title: "Failed. Please try again.",
          description: meError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(()=>{router.push("/")}, 2000)
    }
    if (postStatus === Status.SUCCESS) {
      !toast.isActive("postSuccess") &&
        toast({
          id: "postSuccess",
          title: "Successfully Posted.",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
    }
    if (postError) {
      !toast.isActive("postError") &&
        toast({
          id: "postError",
          title: "Post Failed. Please try again.",
          description: postError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
    if (userError) {
      !toast.isActive("userError") &&
        toast({
          id: "userError",
          title: "User Information Failed!",
          description: userError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
    if (adminError) {
      !toast.isActive("adminError") &&
        toast({
          id: "adminError",
          title: "Failed! Try again.",
          description: adminError.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }

  }, [jwt, signupMe, authError, meError, userError, postStatus, postError, adminError]);

  return children;
};

export default ToastWrapper;
