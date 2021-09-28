import { Fragment } from "react";

import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
  Image,
  Textarea,
  AspectRatio,
  Circle,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";

const Videos = () => {
  return (
    <Fragment>
      <Header />
      <Container maxW="container.xl" px={6}>
        Video Grids
      </Container>

      {/* <Box mt={20}>
        <Footer />
      </Box> */}
    </Fragment>
  );
};

export default Videos;
