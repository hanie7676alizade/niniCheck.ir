import React from "react"
import { Pagination } from "react-bootstrap"

const BasicPagination = props => {
    const offset = Math.floor(props.totalLinks / 2)
    const start =
        props.currentPage - offset > 0 ? props.currentPage - offset : 1
    const end =
        props.currentPage + offset <= props.totalPages
            ? props.currentPage + offset
            : props.totalPages
    let items = []

    for (let page = start; page <= end; page++) {
        items.push(
            <Pagination.Item
                onClick={() => {
                    props.onChangePage(page)
                }}
                key={page}
                active={page === props.currentPage}
            >
                {page}
            </Pagination.Item>
        )
    }

    let startPagination = null
    if (props.currentPage > 1) {
        startPagination = (
            <React.Fragment>
                {props.currentPage > offset + 1 ? (
                    <Pagination.First
                        onClick={() => {
                            props.onChangePage(1)
                        }}
                    />
                ) : null}
                <Pagination.Prev
                    onClick={() => {
                        props.onChangePage(props.currentPage - 1)
                    }}
                />
                {props.currentPage > offset + 1 ? (
                    <Pagination.Ellipsis />
                ) : null}
            </React.Fragment>
        )
    }

    let endPagination = null
    if (props.currentPage < props.totalPages) {
        endPagination = (
            <React.Fragment>
                {props.currentPage < props.totalPages - offset ? (
                    <Pagination.Ellipsis />
                ) : null}
                <Pagination.Next
                    onClick={() => {
                        props.onChangePage(props.currentPage + 1)
                    }}
                />
                {props.currentPage < props.totalPages - offset ? (
                    <Pagination.Last
                        onClick={() => {
                            props.onChangePage(props.totalPages)
                        }}
                    />
                ) : null}
            </React.Fragment>
        )
    }

    const paginationBasic = (
        <div>
            {props.totalPages > 1 ? (
                <Pagination className="p-0 my-3 justify-content-center">
                    {startPagination}
                    {items}
                    {endPagination}
                </Pagination>
            ) : null}
        </div>
    )
    return paginationBasic
}

export default BasicPagination
