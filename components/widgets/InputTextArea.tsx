import { Fragment } from "react";
import {
  Box,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea
} from "@chakra-ui/react";

const InputTextArea: React.FC<{
  id: string;
  label: string;
  rows: number;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
  isRequired: boolean;
  isInvalid: boolean;
  error: any;
}> = ({ id, label, rows, onChange, isRequired, isInvalid, error }) => {
  return (
    <Fragment>
      <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
        <HStack mt={4}>
          <FormLabel w="40%" fontSize="13px" color="GrayText">
            {label}
          </FormLabel>
          <Box w="full">
            <Textarea rows={rows} onChange={(e) => onChange(e.target.value)} placeholder="Write here..." />
          </Box>
        </HStack>
        <HStack spacing={5}>
          <Box w="40%"></Box>
          <Box w="full">
            <FormErrorMessage>{error}</FormErrorMessage>
          </Box>
        </HStack>
      </FormControl>
    </Fragment>
  );
};

export default InputTextArea;
