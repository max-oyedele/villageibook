import { Fragment } from "react";
import {
  Alert,
  Text
} from "@chakra-ui/react";

const CAlert: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <Fragment>
      {/* <Alert
        status="error"
        justifyContent="center"
        bgColor="white"
        border="1px"
        borderColor="gray.200"
        borderRadius="6px"
      >
        {message}
      </Alert> */}
      <Text>{message}</Text>
    </Fragment>
  );
};

export default CAlert;
