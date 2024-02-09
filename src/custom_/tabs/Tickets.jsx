import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '../redux/actions/tickets.actions'
import { getTicketTypesNames } from '../redux/actions/ticketTypes.actions'
import { getAgents } from '../redux/actions/users.actions'
import { formatDate, formatTime } from '../pages_/TimelinePage'
import Table from '../components_/Table'
import {
  CBadge,
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

const Tickets = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const agents = useSelector((state) => state.users.agents)
  const ticketTypesNames = useSelector((state) => state.ticketTypes.ticketTypesNames)
  const [filter, setFilter] = useState({
    agentId: '',
    status: '',
    ticketTypeId: '',
  })

  const statusNames = [
    { name: 'unassigned' },
    { name: 'todo' },
    { name: 'in-progress' },
    { name: 'back-log' },
    { name: 'closed' },
  ]

  const ticketColumns = [
    // {
    //   name: 'No.',
    //   id: 'TicketTypeNo',
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
      name: 'Raised Date',
      selector: (row) => formatTime(row.createdAt) + ' - ' + formatDate(row.createdAt),
      minWidth: '240px',
    },
    {
      name: 'Status',
      cell: (row) =>
        row.status === 'todo' ? (
          <CBadge className="text-bg-primary">{row.status}</CBadge>
        ) : row.status === 'in-progress' ? (
          <CBadge className="text-bg-warning">{row.status}</CBadge>
        ) : row.status === 'closed' ? (
          <CBadge className="text-bg-success">{row.status}</CBadge>
        ) : (
          <CBadge className="text-bg-dark">{row.status}</CBadge>
        ),
      // width: '90px',
    },
    {
      name: 'Type',
      selector: (row) => row.type.name,
      // width: '100px',
    },
    {
      name: 'Assigned By',
      selector: (row) =>
        row.moderator ? row.moderator.firstName + ' ' + row.moderator?.lastName : '-',
    },
    {
      name: 'Agent',
      selector: (row) => (row.agent ? row.agent.firstName + ' ' + row.agent?.lastName : '-'),
    },
    {
      name: 'View',
      cell: (row) => (
        <CButton
          color="white"
          onClick={(e) => {
            e.preventDefault()
            navigate('/tickets/view-ticket/' + row.id)
          }}
        >
          <CIcon icon={cilMenu} />
        </CButton>
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
          <CCardHeader>Tickets List</CCardHeader>
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
                style={{ flex: 3 }}
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

              <CFormSelect
                name="select"
                className="m-2"
                style={{ flex: 3 }}
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
                style={{ flex: 3 }}
                value={filter.status}
                onChange={(e) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      status: e.target.value,
                    }
                  })
                }}
              >
                <option>-- Select Status --</option>
                {statusNames?.map((d, i) => (
                  <option value={d.id} key={i}>
                    {d.name}
                  </option>
                ))}
              </CFormSelect>
            </CForm>
            <Table
              find={{ search: search }}
              filters={{ filters: filter }}
              columns={ticketColumns}
              getDataSuccess={getTickets}
              API="/_ticket"
              //   status={status}
            />
          </CCardBody>
        </CCard>

        {/* <CModal
          visible={visible}
          onClose={() => {
            setVisible(false)
            reset()
          }}
          className="modal-lg"
        >
          <CModalHeader
            onClose={() => {
              setVisible(false)
              reset()
            }}
          >
            <h5 style={{ margin: 0 }}>Add Ticket</h5>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <CFormLabel>Name</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Ticket Name"
                      autoComplete="name"
                      value={register.ticketName}
                      {...register('ticketName', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.ticketName && <p className="errors">{errors.ticketName.message}</p>}

                  <CFormLabel>Description</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Description"
                      autoComplete="name"
                      value={register.description}
                      {...register('description', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.description && <p className="errors">{errors.description.message}</p>}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CButton
                  color="secondary"
                  className="m-2"
                  onClick={() => {
                    setVisible(false)
                    reset()
                  }}
                >
                  Close
                </CButton>
                <CButton color="primary" className="m-2" type="submit">
                  Save Changes
                </CButton>
              </div>
            </CForm>
          </CModalBody>
        </CModal> */}
      </CCol>
    </CRow>
  )
}

export default Tickets
