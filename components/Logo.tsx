import { Fragment } from "react";
import Link from "next/link";
import { Text, Image } from "@chakra-ui/react";

const Logo: React.FC<{
  type: string
}> = ({ type }) => {
  return (
    <Fragment>
      {
        type === "i" &&
        <Link href="/" passHref={true}>
          <Image src="/logo.svg" h={6} alt="" cursor="pointer" />
        </Link>
      }
      {
        type === "i-t" &&
        <Link href="/" passHref={true}>
          <Image src="/logo-t.svg" h={6} alt="" cursor="pointer" />
        </Link>
      }
    </Fragment>
  );
};

export default Logo;
