import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedbacks } from '../redux/actions/feedbacks.action'
import { getAgents } from '../redux/actions/users.actions'
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
import { cilMenu, cilStar } from '@coreui/icons'

const Feedbacks = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const agents = useSelector((state) => state.users.agents)
  const [filter, setFilter] = useState({
    rating: 0,
    agentId: '',
  })
  const userType = JSON.parse(localStorage.getItem('info')).type

  const rating = [1, 2, 3, 4, 5]

  const feedbackColumns = [
    // {
    //   name: 'No.',
    //   id: 'ReviewNo',
    //   cell: (row, index) => index + 1,
    //   width: '60px',
    // },
    {
      name: 'User Name',
      selector: (row) => row.ticket?.firstName + ' ' + row.ticket?.lastName,
      sortable: true,
      sortField: 'name',
    },
    {
      name: 'Ticket Title',
      selector: (row) => row.ticket?.title,
    },
    userType !== 3 && {
      name: 'Agent',
      selector: (row) => row.agent?.firstName + ' ' + row.agent?.lastName,
    },
    {
      name: 'Date',
      selector: (row) => formatTime(row.updatedAt) + ' - ' + formatDate(row.updatedAt),
      minWidth: '240px',
    },
    {
      name: 'Rating',
      cell: (row) => {
        let r = []
        for (let i = 0; i < row.rating; i++) {
          r.push(<CIcon icon={cilStar} className="text-warning" key={i} />)
        }
        return r
      },
      minWidth: '110px',
    },
    {
      name: 'View',
      cell: (row) => (
        <>
          <CButton
            color="white"
            onClick={(e) => {
              e.preventDefault()
              navigate('/feedbacks/view-feedback/' + row.id, { state: { ticketId: row.ticketId } })
            }}
          >
            <CIcon icon={cilMenu} />
          </CButton>
        </>
      ),
      minWidth: '70px',
    },
  ]

  useEffect(() => {
    if (agents.length === 0) {
      dispatch(getAgents())
    }
  }, [dispatch, agents])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Feedback List</CCardHeader>
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
                value={filter.rating}
                onChange={(e) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      rating: parseInt(e.target.value),
                    }
                  })
                }}
              >
                <option>-- Select Rating --</option>
                {rating?.map((d) => (
                  <option value={d} key={d}>
                    {d}
                  </option>
                ))}
              </CFormSelect>

              {userType !== 3 ? (
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
              ) : null}
            </CForm>
            <Table
              find={{ search: search }}
              filters={{ filters: filter }}
              columns={feedbackColumns}
              getDataSuccess={getFeedbacks}
              API="/_feedbacks"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Feedbacks
