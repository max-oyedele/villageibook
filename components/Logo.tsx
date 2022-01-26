import { Fragment } from "react";
import Link from "next/link";
import { Text, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Fragment>
      <Link href="/" passHref={true}>
        <Image src="/logo.svg" alt="" cursor="pointer" sx={{width: "200px", height: "42.33px"}} />
      </Link>
    </Fragment>
  );
};

export default Logo;
