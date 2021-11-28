import { Fragment } from "react";
import Link from "next/link";
import { Text, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Fragment>
      <Link href="/" passHref={true}>
        <Image src="/logo.svg" h={6} alt="" cursor="pointer" />
      </Link>
    </Fragment>
  );
};

export default Logo;
