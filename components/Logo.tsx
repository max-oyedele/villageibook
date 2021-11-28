import { Fragment } from "react";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Fragment>
        <Link href="/" passHref={true}>
          <Image src="/logo.svg" alt="prop" h={6} cursor="pointer" />
        </Link>
    </Fragment>
  );
};

export default Logo;
