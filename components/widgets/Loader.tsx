import { Fragment } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/react";

const Loader: React.FC<{
  loading: boolean;
}> = ({ loading }) => {
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
      <ScaleLoader color={color} loading={loading} css={override} />
    </Fragment>
  );
};

export default Loader;
