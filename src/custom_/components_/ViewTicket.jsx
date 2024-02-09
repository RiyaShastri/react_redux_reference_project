import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersByRoleId } from '../redux/actions/users.actions'
import { getTicketById } from '../redux/actions/tickets.actions'
import { useNavigate, useParams } from 'react-router-dom'
import Timeline from './Timeline'
import TicketDetails from './TicketDetails'
import { baseAPI } from '../helpers/BaseApi'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleLeft, cilPen, cilSettings } from '@coreui/icons'

const ViewTicket = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [details, setDetails] = useState()
  const [agentId, setAgentId] = useState()
  const agents = useSelector((state) => state.users.usersByRoleId)
  const userType = JSON.parse(localStorage.getItem('info')).type
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState('')

  const statusNames = [{ name: 'in-progress' }, { name: 'back-log' }, { name: 'closed' }]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    dispatch(getUsersByRoleId(3))
    getData()
    // eslint-disable-next-line
  }, [dispatch])

  const getData = () => {
    dispatch(getTicketById(id))
      .then((res) => {
        setDetails(res.data)
      })
      .catch((err) => console.log('err :>> ', err))
  }

  const handleAssignAgent = () => {
    baseAPI
      .put('/ticket/assign/' + id, { agentId: agentId })
      .then((res) => {
        // console.log('res :>> ', res)
        toast.success(res.data.message)
        getData()
      })
      .catch((err) => console.log('err :>> ', err))
  }

  const onSubmit = (data) => {
    data.status = status
    baseAPI
      .post('/ticket/changeStatus/' + id, data)
      .then((res) => toast.success(res.data.message))
      .catch((err) => console.log('err', err))
    setStatus('')
    reset()
    setVisible(false)
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            View Ticket &nbsp;
            {details?.status === 'todo' ? (
              <CBadge className="text-bg-primary">{details?.status}</CBadge>
            ) : details?.status === 'in-progress' ? (
              <CBadge className="text-bg-warning">{details?.status}</CBadge>
            ) : details?.status === 'closed' ? (
              <CBadge className="text-bg-success">{details?.status}</CBadge>
            ) : (
              <CBadge className="text-bg-dark">{details?.status}</CBadge>
            )}
            <CButton
              color="success"
              className="btn-sm float-end"
              onClick={() =>
                details?.status === 'closed' ? navigate('/history') : navigate('/tickets')
              }
            >
              <CIcon icon={cilArrowCircleLeft} /> Back
            </CButton>
            {userType === 3 && (
              <>
                <CButton
                  color="warning"
                  className="btn-sm float-end mx-3"
                  onClick={() => setVisible(true)}
                >
                  <CIcon icon={cilSettings} /> / <CIcon icon={cilPen} />
                </CButton>
              </>
            )}
          </CCardHeader>
          <CCardBody>
            {!details?.agent ? (
              <>
                <CCol md={4}>
                  <CFormLabel>Assign Agent</CFormLabel>
                  <CFormSelect
                    name="select"
                    className="mb-2"
                    style={{ flex: 3 }}
                    value={agentId}
                    onChange={(e) => {
                      setAgentId(e.target.value)
                    }}
                  >
                    <option>-- Select Agent --</option>
                    {agents?.map((d) => (
                      <option value={d.id} key={d.id}>
                        {d.firstName + ' ' + d.lastName}
                      </option>
                    ))}
                  </CFormSelect>
                  <CButton className="mt-2" onClick={handleAssignAgent}>
                    Assign
                  </CButton>
                </CCol>
                <hr />
              </>
            ) : null}
            <TicketDetails details={details} />
            {/* <hr />
            <Link to={'/timeline/' + id}>
              <CButton color="warning">View Timeline</CButton>
            </Link> */}
            <hr />
            <Timeline ticketId={id} />
          </CCardBody>
        </CCard>

        <CModal
          visible={visible}
          onClose={() => {
            setVisible(false)
            reset()
          }}
          className="modal"
        >
          <CModalHeader
            onClose={() => {
              setVisible(false)
              reset()
            }}
          >
            <h5 style={{ margin: 0 }}>Add Comment or Change Status</h5>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CFormLabel>Current Status</CFormLabel>
              <br />
              {details?.status === 'todo' ? (
                <CBadge className="text-bg-primary">{details?.status}</CBadge>
              ) : details?.status === 'in-progress' ? (
                <CBadge className="text-bg-warning">{details?.status}</CBadge>
              ) : details?.status === 'closed' ? (
                <CBadge className="text-bg-success">{details?.status}</CBadge>
              ) : (
                <CBadge className="text-bg-dark">{details?.status}</CBadge>
              )}
              <br />

              <CFormSelect
                name="select"
                className="mb-2 mt-3"
                style={{ flex: 3 }}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                }}
              >
                <option>-- Change Status --</option>
                {statusNames?.map((d, i) => (
                  <option value={d.id} key={i}>
                    {d.name}
                  </option>
                ))}
              </CFormSelect>

              <CFormLabel className="mt-3">Comment</CFormLabel>
              <CFormTextarea
                placeholder="Write Comment"
                className="mb-2"
                value={register.comment}
                {...register('comment', {
                  required: 'This field is required',
                })}
              />
              {errors.comment && <p className="errors">{errors.comment.message}</p>}

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
                  Submit
                </CButton>
              </div>
            </CForm>
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default ViewTicket
