import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { Box } from "@chakra-ui/react";

const Paginate = (props) => {
  const [itemOffset, setItemOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [nextOk, setNextOk] = useState(true);
  const [preveOk, setPrevOk] = useState(true);
  const itemsPerPage = props.itemsPerPage? props.itemsPerPage : 4;

  const handlePageClicked = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % props.data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (props.data && props.data?.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      props.pageData(props.data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(props.data.length / itemsPerPage));
      const last: boolean = props.data.length - itemsPerPage > itemOffset;
      if (!props.centerPagination && itemOffset < 2) {
        setPrevOk(false);
      } else {
        setPrevOk(true);
      }
      if (!props.centerPagination && !last) {
        setNextOk(false);
      } else {
        setNextOk(true);
      }
    }
  }, [itemOffset]);

  return (
    <Box className={`${props.centerPagination ?? 'paginate-center'} align-pagination`}>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        previousClassName={`${preveOk ?? 'paginate-disabled'} previouse-disabled`}
        nextClassName={`${nextOk ?? 'paginate-disabled'} next-disabled`}
        pageRangeDisplayed={5}
        onPageChange={handlePageClicked}
        containerClassName={'pagination'}
        renderOnZeroPageCount={null}
        pageCount={pageCount}
        activeClassName={'active'}
      />
    </Box>
  )
};

export default Paginate;
