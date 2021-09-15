import { Fragment } from "react";
import Link from "next/link";
import { HStack, Image } from "@chakra-ui/react";

const SocialLinkBar = () => {
  return (
    <Fragment>
      <HStack spacing={8} justifyContent="center">
        <Link href="https://twitter.com">
          <Image src="/icons/home-twitter.svg" alt="" cursor="pointer" />
        </Link>
        <Link href="https://facebook.com">
          <Image src="/icons/home-facebook.svg" alt="" cursor="pointer" />
        </Link>
        <Link href="https://instagram.com">
          <Image src="/icons/home-instagram.svg" alt="" cursor="pointer" />
        </Link>
        <Link href="https://youtube.com">
          <Image src="/icons/home-youtube.svg" alt="" cursor="pointer" />
        </Link>
      </HStack>
    </Fragment>
  );
};

export default SocialLinkBar;
