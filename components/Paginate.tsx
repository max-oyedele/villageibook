import ReactPaginate from 'react-paginate';

const Paginate = (props) => {
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.handlePageClick}
      containerClassName={'pagination'}
      renderOnZeroPageCount={null}
      pageCount={props.pageCount}
      activeClassName={'active'}
    />
  )
};

export default Paginate;
