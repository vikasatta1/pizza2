import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';
type PaginationPropsType = {
    onChangePage:(num:number)=>void
    currentPage:number
}
const Pagination:React.FC<PaginationPropsType> = ({onChangePage,currentPage}) => {

    return (
        <div>
            <ReactPaginate
                className={style.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(event)=>onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
            />
        </div>
    );
};

export default Pagination;