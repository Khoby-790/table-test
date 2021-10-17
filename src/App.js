import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";


function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id', // accessor is the "key" in the data
        width: 50,
      },
      {
        Header: 'Title',
        accessor: 'title',
        width: 200,
        Cell: ({ value, row }) => {
          // here you can use value to render cell 
          // with value of dataProperty
          // or you can access all other row data properties 
          // from row.original
          // for example:
          return (
            <span className="font-light truncate">
              {value}
            </span>
          );
        }
      },
      {
        Header: 'Body',
        accessor: 'body',
        width: 200,
        Cell: ({ value, row }) => {
          // here you can use value to render cell 
          // with value of dataProperty
          // or you can access all other row data properties 
          // from row.original
          // for example:
          return (
            <span className="font-light truncate">
              {value}
            </span>
          );
        }
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    state: { globalFilter, pageSize, pageIndex },
    setGlobalFilter,

    // Pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

  } = tableInstance

  return (
    <div className="px-20  flex justify-center items-center flex-col py-30 dark:bg-gray-700 h-screen overflow-y-scroll w-screen">
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div className="flex w-full justify-between items-center my-3 sm:rounded-lg">
        <div className="">
          <select className="border border-gray-300 p-2" value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        </div>
        <GlobalFilter setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} />
      </div>
      {/* republican79@12 */}
      <div class="flex flex-col w-full">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 dark:border-gray-200 sm:rounded-none">
              <table class="min-w-full divide-y divide-gray-200" {...getTableProps({ className: "min-w-full divide-y divide-gray-200" })}>
                <thead class="bg-gray-100">
                  {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                      // Apply the header row props
                      <tr {...headerGroup.getHeaderGroupProps({ className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" })}>
                        {// Loop over the headers in each row
                          headerGroup.headers.map(column => (
                            // Apply the header cell props
                            <th {...column.getHeaderProps(column.getSortByToggleProps({ className: "px-6 py-3 w-36 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }))}>
                              {// Render the header
                                column.render('Header')}
                            </th>
                          ))}
                      </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps({ className: "bg-white divide-y divide-gray-200" })}>
                  {// Loop over the table rows
                    page.map(row => {
                      // Prepare the row for display
                      prepareRow(row)
                      return (
                        // Apply the row props
                        <tr {...row.getRowProps({ className:"odd:bg-gray-50 hover:odd:bg-gray-100"})}>
                          {// Loop over the rows cells
                            row.cells.map(cell => {
                              // Apply the cell props
                              return (
                                <td {...cell.getCellProps({ className: "px-6 py-4 overflow-ellipsis	 flex-wrap w-1/3 text-sm font-medium text-gray-900" })}>
                                  {// Render the cell contents
                                    cell.render('Cell')}
                                </td>
                              )
                            })}
                        </tr>
                      )
                    })}
                </tbody>

              </table>
              {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
              <nav class="bg-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                <div class="hidden sm:block">
                  <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium mx-2">{pageSize * pageIndex + 1}</span>
                    to
                    <span class="font-medium mx-2">{pageSize * pageIndex + pageSize}</span>
                    of
                    <span class="font-medium mx-2">{pageSize * pageOptions.length}</span>
                    results
                  </p>
                </div>
                <div class="flex-1 flex justify-between sm:justify-end">
                  <button onClick={() => previousPage()} disabled={!canPreviousPage} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button onClick={() => nextPage()} disabled={!canNextPage} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </nav>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
