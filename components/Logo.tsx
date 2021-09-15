import { Fragment } from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Fragment>
      <Text fontSize="xl" fontWeight="700" color="purpleTone">
        <Link href="/">V.</Link>
      </Text>
    </Fragment>
  );
};

export default Logo;
