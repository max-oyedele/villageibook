import { Fragment, useState, useMemo } from "react";
import { Text, Box } from "@chakra-ui/react";
import { Markup } from "interweave";

const ReadMoreLess: React.FC<{
  children: any;
}> = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const renderedText = useMemo(
    () => (isReadMore ? text?.slice(0, 150) : text),
    [isReadMore, text]
  );

  return (
    <Fragment>
      <Markup content={renderedText} />
      {text?.length > 150 && (
        <span
          onClick={toggleReadMore}
          style={{ color: "#553CFB", cursor: "pointer", textTransform: "lowercase" }}
        >
          {isReadMore ? " ...read more" : " show less"}
        </span>
      )}
    </Fragment>
  );
};

export default ReadMoreLess;
