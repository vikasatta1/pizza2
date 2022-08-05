import React from 'react';
import ReactPaginate from 'react-paginate';
//@ts-ignore
import style from './Pagination.module.scss';
type PaginationPropsType = {
    onChangePage:(num:any)=>void
}
const Pagination = ({onChangePage}:PaginationPropsType) => {

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

             /*   renderOnZeroPageCount={null}*/
            />
        </div>
    );
};

export default Pagination;