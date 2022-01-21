import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { Box } from "@chakra-ui/react";

const Paginate = (props) => {
  const [itemOffset, setItemOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [nextOk, setNextOk] = useState(true);
  const [preveOk, setPrevOk] = useState(true);
  const [data, setData] = useState(props.data);
  const itemsPerPage = props.itemsPerPage? props.itemsPerPage : 4;

  const handlePageClicked = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      if (data.length > itemsPerPage) {
        props.pageData(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
      } else {
        props.pageData(data);
        setPageCount(0);
      }
      const last: boolean = data.length - itemsPerPage > itemOffset;
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
    } else {
      props.pageData([]);
      setItemOffset(1);
    }
  }, [itemOffset, data]);

  useEffect(() => {
    setItemOffset(1);
    if (!props.searchText || props.searchText === "") setData(props.data)
    else setData(props.data.filter(function (row) {
      return  Object.keys(row).some(function(key) {
        return String(row[key]).toLowerCase().indexOf(String(props.searchText).toLowerCase()) > -1;
      })
    }));
  }, [props.searchText, props.data])

  return (
    <Box className={`${props.centerPagination ?? 'paginate-center'} align-pagination`}>
      {data.length > itemsPerPage &&
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
      }
    </Box>
  )
};

export default Paginate;
