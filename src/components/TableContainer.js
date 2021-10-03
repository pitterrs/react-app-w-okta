import React, { useRef } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import {
  Table,
  Pagination,
  ListItem,
  Button,
  Form,
} from "@deere/ux.uxframe-react";
import { ReactComponent as ChevronRightIcon } from "@deere/ux.brand-foundations/icons/chevron_right.svg";
import { ReactComponent as ChevronLeftIcon } from "@deere/ux.brand-foundations/icons/chevron_left.svg";
import "../css/TableContainer.css";
import { SearchClearButton } from "@deere/ux.uxframe-react/lib/components/Search";
import classNames from "classnames";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  const filterInputClasses = classNames(
    "uxf-data-table-filter-input",
    value && "active"
  );

  const filterInput = useRef(null);

  const clearFilterContent = () => {
    setGlobalFilter("");
    setValue("");
    filterInput.current.focus();
  };

  return (
    <div role="search" aria-labelledby="filter-search-1">
      <Form.Label
        aria-label="Filter Results"
        className="uxf-data-table-filter-label"
        id="filter-search-1"
      >
        <Form.Control
          className={filterInputClasses}
          type="search"
          placeholder="Filter results"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          ref={filterInput}
        />
        <SearchClearButton
          onClick={clearFilterContent}
          ariaLabel="Clear search input"
        />
      </Form.Label>
    </div>
  );
}

export const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    state,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const startPage = rows.length ? pageIndex * pageSize + 1 : 0;
  const endPage = rows.length ? startPage + page.length - 1 : 0;

  const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  const getVisiblePages = (page, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 4 >= 0 && page > 3 && page + 2 < total) {
        return [1, page - 1, page, page + 1, page + 2, total];
      } else if (page % 4 >= 0 && page > 3 && page + 2 >= total) {
        return [1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  return (
    <>
      <div className="justify-content-center justify-content-sm-between align-items-center align-items-sm-stretch flex-column flex-sm-row d-flex py-3 px-3">
        <Form.Label className="uxf-data-table-page-select-label">
          Showing{" "}
          <Form.Control
            as="select"
            value={pageSize}
            onChange={onChangeInSelect}
            className="uxf-data-table-page-select custom-select custom-select-sm form-control form-control-sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Form.Control>{" "}
					results
				</Form.Label>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <Table {...getTableProps()} responsive>
        <caption className="sr-only">Employee List</caption>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  {...column.getSortByToggleProps({ title: "Toggle Sort" })}
                  className={`p-0 ${column.isSorted
                    ? column.isSortedDesc
                      ? "uxf-table-desc"
                      : "uxf-table-asc"
                    : ""
                    } ${column.canSort && "uxf-table-sort"}`}
                  aria-sort={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "descending"
                        : "ascending"
                      : "none"
                  }
                >
                  <Button
                    className="font-weight-bold font-size-sm d-flex text-left p-3 w-100"
                    size="sm"
                    variant=""
                  >
                    <span className="d-flex align-items-center pr-2 justify-content-between w-100 h-100">
                      {column.render("Header")}
                      {column.canSort && (
                        <span className="sr-only">
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ": Unsort rows"
                              : ": Sort rows in descending order"
                            : ": Sort rows in ascending order"}
                        </span>
                      )}
                    </span>
                  </Button>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          {!rows.length && (
            <tr>
              <td
                colSpan={headers.length}
                className="uxf-data-table-no-results"
              >
                No matching records found.
							</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="px-3 py-2 uxf-data-table-pagination">
        <Pagination
          pageResults={true}
          text={`${startPage} - ${endPage} of ${rows.length} Results`}
          ariaLabel="pagination navigation"
          className={`${!canPreviousPage && "uxf-pagination-mobile-first"} ${!canNextPage && "uxf-pagination-mobile-last"
            }`}
        >
          <Pagination.Item
            onClick={previousPage}
            aria-label="previous"
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon />
          </Pagination.Item>
          {rows.length ? (
            <ListItem className="uxf-pagination-mobile-page">
              Page {pageIndex + 1} of {pageOptions.length}
            </ListItem>
          ) : (
              ""
            )}
          <Pagination.Item onClick={previousPage} disabled={!canPreviousPage}>
            Previous
					</Pagination.Item>
          {getVisiblePages(pageIndex, pageCount).map(
            (singlePage, index, array) => {
              return (
                <React.Fragment key={singlePage}>
                  <Pagination.Item
                    onClick={() => gotoPage(singlePage - 1)}
                    active={pageIndex === singlePage - 1}
                  >
                    {(() => {
                      if (
                        array[array.length - 1] === singlePage &&
                        pageIndex < singlePage - 3 &&
                        array[array.length - 1] > 6
                      ) {
                        return `...${singlePage}`;
                      } else if (
                        array[0] === singlePage &&
                        pageIndex > singlePage + 2 &&
                        array[array.length - 1] > 6
                      ) {
                        return `${singlePage}...`;
                      } else {
                        return singlePage;
                      }
                    })()}
                  </Pagination.Item>
                </React.Fragment>
              );
            }
          )}
          <Pagination.Item onClick={nextPage} disabled={!canNextPage}>
            Next
					</Pagination.Item>
          <Pagination.Item
            onClick={nextPage}
            aria-label="next"
            disabled={!canNextPage}
          >
            <ChevronRightIcon />
          </Pagination.Item>
        </Pagination>
      </div>
    </>
  );
};
