import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'

// const Table = ({ find, API, columns, id, getDataSuccess, status }) => {
const Table = ({ find, API, columns, getDataSuccess, filters }) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const ticketTypes = useSelector((state) => state.ticketTypes.ticketTypes)
  const tickets = useSelector((state) => state.tickets.tickets)
  const resolvedTickets = useSelector((state) => state.tickets.resolvedTickets)
  const feedbacks = useSelector((state) => state.feedbacks)
  const [totalRows, setTotalRows] = useState(10)
  const [tableData, setTableData] = useState([])
  const [obj, setObj] = useState({
    search: '',
    perPage: 10,
    pageNo: 1,
    ...find,
    ...filters,
  })

  const getData = async () => {
    await dispatch(getDataSuccess(obj))
      .then((res) => {
        // console.log('res.data', res.data)
        setTableData(res?.data)
        setTotalRows(res?.Pagination?.TotalData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (API === '/_user') {
      if (Object.keys(users).length === 0) {
        getData()
      } else {
        setTableData(users.data)
        setTotalRows(users.Pagination?.TotalData)
      }
    } else if (API === '/_tickettype') {
      if (Object.keys(ticketTypes).length === 0) {
        getData()
      } else {
        setTableData(ticketTypes.data)
        setTotalRows(ticketTypes.Pagination?.TotalData)
      }
    } else if (API === '/_ticket') {
      if (Object.keys(tickets).length === 0) {
        getData()
      } else {
        setTableData(tickets.data)
        setTotalRows(tickets.Pagination?.TotalData)
      }
    } else if (API === '/_history') {
      if (Object.keys(resolvedTickets).length === 0) {
        getData()
      } else {
        setTableData(resolvedTickets.data)
        setTotalRows(resolvedTickets.Pagination?.TotalData)
      }
    } else if (API === '/_feedbacks') {
      if (Object.keys(feedbacks).length === 0) {
        getData()
      } else {
        setTableData(feedbacks.data)
        setTotalRows(feedbacks.Pagination?.TotalData)
      }
    }
    // eslint-disable-next-line
  }, [API])

  useEffect(() => {
    const timer = setTimeout(() => {
      getData()
    }, 500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [obj])

  useEffect(() => {
    setObj((prev) => {
      return {
        ...prev,
        ...find,
        ...filters,
      }
    })
  }, [find, filters])

  const handlePageChange = (page) => {
    setObj((prev) => {
      return {
        ...prev,
        pageNo: page,
      }
    })
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log('newPerPage', newPerPage)
    setObj((prev) => {
      return {
        ...prev,
        perPage: newPerPage,
      }
    })
  }

  const handleSort = (column, sortDirection) => {
    if (column.name === 'Name') {
      if (sortDirection === 'asc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              firstName: 'ASC',
            },
          }
        })
      } else if (sortDirection === 'desc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              firstName: 'DESC',
            },
          }
        })
      }
    } else if (column.name === 'Role') {
      if (sortDirection === 'asc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              userRoleId: 'ASC',
            },
          }
        })
      } else if (sortDirection === 'desc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              userRoleId: 'DESC',
            },
          }
        })
      }
    } else if (column.name === 'Type') {
      if (sortDirection === 'asc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              name: 'ASC',
            },
          }
        })
      } else if (sortDirection === 'desc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              name: 'DESC',
            },
          }
        })
      }
    } else if (column.name === 'Added By') {
      if (sortDirection === 'asc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              addedBy: 'ASC',
            },
          }
        })
      } else if (sortDirection === 'desc') {
        setObj((prev) => {
          return {
            ...prev,
            sortBy: {
              ...prev.sortBy,
              addedBy: 'DESC',
            },
          }
        })
      }
    }
  }

  const customStyles = {
    headCells: {
      style: {
        fontSize: '16px',
        // paddingLeft: '8px',
        // paddingRight: '8px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  }

  return (
    <DataTable
      columns={columns}
      data={tableData}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerRowsChange}
      paginationDefaultPage={obj.pageNo}
      paginationPerPage={obj.perPage}
      customStyles={customStyles}
      onSort={handleSort}
      sortServer
    />
  )
}

export default Table
