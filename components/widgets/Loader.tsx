import { Fragment } from "react";
import { ScaleLoader, ClipLoader } from "react-spinners";
import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";

const Loader: React.FC<{
  loading: boolean;
  type?: string;
}> = ({ loading, type = "scale" }) => {
  const color = "#553cfb";
  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;

  return (
    <Fragment>
      <Box w="full" h="full">
        {type === "scale" && (
          <Box my={4}>
            <ScaleLoader color={color} loading={loading} css={override} />
          </Box>
        )}
        {type === "clip" && (
          <ClipLoader color={color} loading={loading} css={override} />
        )}
      </Box>
    </Fragment>
  );
};

export default Loader;
