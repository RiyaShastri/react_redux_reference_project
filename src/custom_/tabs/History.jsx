import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getResolvedTickets } from '../redux/actions/tickets.actions'
import { getAgents } from '../redux/actions/users.actions'
import { getTicketTypesNames } from '../redux/actions/ticketTypes.actions'
import Table from '../components_/Table'
import { formatDate, formatTime } from '../pages_/TimelinePage'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

const History = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const agents = useSelector((state) => state.users.agents)
  const ticketTypesNames = useSelector((state) => state.ticketTypes.ticketTypesNames)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({
    agentId: '',
    ticketTypeId: '',
  })

  const historyColumns = [
    // {
    //   name: 'No.',
    //   id: 'ReviewNo',
    //   cell: (row, index) => index + 1,
    //   width: '60px',
    // },
    {
      name: 'Name',
      selector: (row) => row.firstName + ' ' + row.lastName,
      // sortable: true,
      // sortField: 'name',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Ticket Title',
      selector: (row) => row.title,
    },
    {
      name: 'Type',
      selector: (row) => row.type?.name,
    },
    {
      name: 'Agent',
      selector: (row) => row.agent?.firstName + ' ' + row.agent?.lastName,
    },
    {
      name: 'Raised Date',
      selector: (row) => formatTime(row.createdAt) + ' - ' + formatDate(row.createdAt),
      minWidth: '240px',
    },
    {
      name: 'Closed Date',
      selector: (row) =>
        formatTime(row.TicketStatusChanges[0].createdAt) +
        ' - ' +
        formatDate(row.TicketStatusChanges[0].createdAt),
      minWidth: '240px',
    },
    {
      name: 'View',
      cell: (row) => (
        <>
          <CButton
            color="white"
            onClick={(e) => {
              e.preventDefault()
              navigate('/tickets/view-ticket/' + row.id)
            }}
          >
            <CIcon icon={cilMenu} />
          </CButton>
        </>
      ),
      width: '70px',
    },
  ]

  useEffect(() => {
    if (ticketTypesNames.length === 0) {
      dispatch(getTicketTypesNames())
    }
    if (agents.length === 0) {
      dispatch(getAgents())
    }
  }, [dispatch, ticketTypesNames, agents])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Ticket history</CCardHeader>
          <CCardBody>
            <CForm style={{ display: 'flex' }}>
              <CFormInput
                className="m-2"
                style={{ flex: 3 }}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearch(e.target.value)}
              />

              <CFormSelect
                name="select"
                className="m-2"
                style={{ flex: 2 }}
                value={filter.ticketTypeId}
                onChange={(e) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      ticketTypeId: parseInt(e.target.value),
                    }
                  })
                }}
              >
                <option>-- Select Ticket Type --</option>
                {ticketTypesNames?.map((d) => (
                  <option value={d.id} key={d.id}>
                    {d.name}
                  </option>
                ))}
              </CFormSelect>

              <CFormSelect
                name="select"
                className="m-2"
                style={{ flex: 2 }}
                value={filter.agentId}
                onChange={(e) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      agentId: parseInt(e.target.value),
                    }
                  })
                }}
              >
                <option>-- Select Agent --</option>
                {agents?.map((d) => (
                  <option value={d.id} key={d.id}>
                    {d.firstName + ' ' + d.lastName}
                  </option>
                ))}
              </CFormSelect>
            </CForm>
            <Table
              find={{ search: search }}
              filters={{ filters: filter }}
              columns={historyColumns}
              getDataSuccess={getResolvedTickets}
              API="/_history"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default History
