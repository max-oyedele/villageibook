import ReactPaginate from 'react-paginate';

const Paginate = (props) => {
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      previousClassName={`${props.itemOffset < 2 ? 'paginate-disabled' : ''} previouse-disabled`}
      nextClassName={`${props.isLast ? 'paginate-disabled' : ''} next-disabled`}
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
