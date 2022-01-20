import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';

const Paginate = (props) => {
  const [itemOffset, setItemOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const itemsPerPage = props.itemsPerPage? props.itemsPerPage : 4;

  console.log("dddddddddddddddddddddddddddddddddddddddddddddddd")
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
      setIsLast(props.data.length - itemsPerPage > itemOffset);
    }
  }, [itemOffset]);

  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      previousClassName={`${itemOffset < 2 ? 'paginate-disabled' : ''} previouse-disabled`}
      nextClassName={`${isLast ? 'paginate-disabled' : ''} next-disabled`}
      pageRangeDisplayed={5}
      onPageChange={handlePageClicked}
      containerClassName={'pagination'}
      renderOnZeroPageCount={null}
      pageCount={pageCount}
      activeClassName={'active'}
    />
  )
};

export default Paginate;
