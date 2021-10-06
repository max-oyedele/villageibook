import { Fragment } from "react";
import getConfig from 'next/config'

import {
  Box,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const { publicRuntimeConfig } = getConfig();

const InputBoxWithAutoComplete: React.FC<{
  id: string;
  label: string;
  selectedValue: any;
  setSelectedValue: React.Dispatch<React.SetStateAction<any | null>>;
  isRequired: boolean;
  isInvalid: boolean;
  error: any;
}> = ({
  id,
  label,
  selectedValue,
  setSelectedValue,
  isRequired,
  isInvalid,
  error,
}) => {
  
  return (
    <Fragment>
      <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
        <HStack mt={4}>
          <FormLabel w="40%" fontSize="13px" color="GrayText">
            {label}
          </FormLabel>
          <Box w="full">
            <GooglePlacesAutocomplete
              apiKey={publicRuntimeConfig.googleApiKey}
              selectProps={{
                value: selectedValue,
                onChange: setSelectedValue,
                placeholder: "",
                styles: {
                  indicatorSeparator: () => ({}),
                  dropdownIndicator: () => ({ display: "none" }),
                  control: () => ({
                    display: 'flex',
                    border: "1px solid #E5E7EB",
                    borderRadius: 4,
                  }),
                },
              }}
            />
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

export default InputBoxWithAutoComplete;
