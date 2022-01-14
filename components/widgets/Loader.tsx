import { Fragment } from "react";
import { ScaleLoader, ClipLoader } from "react-spinners";
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
      {type === "scale" && (
        <ScaleLoader color={color} loading={loading} css={override} />
      )}
      {type === "clip" && (
        <ClipLoader color={color} loading={loading} css={override} />
      )}
    </Fragment>
  );
};

export default Loader;
