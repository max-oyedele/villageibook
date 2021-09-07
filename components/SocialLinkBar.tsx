import { Fragment } from "react";
import { HStack, Image } from "@chakra-ui/react";

const SocialLinkBar = () => {
  return (
    <Fragment>
      <HStack spacing={8} justifyContent="center">
        <Image src="/icons/home-twitter.svg" alt="" />
        <Image src="/icons/home-facebook.svg" alt="" />
        <Image src="/icons/home-instagram.svg" alt="" />
        <Image src="/icons/home-youtube.svg" alt="" />
      </HStack>
    </Fragment>
  );
};

export default SocialLinkBar;