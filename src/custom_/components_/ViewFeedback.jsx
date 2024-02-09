import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getFeedbackById } from '../redux/actions/feedbacks.action'
import { getTicketById } from '../redux/actions/tickets.actions'
import TicketDetails from './TicketDetails'
import Timeline from './Timeline'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleLeft, cilStar } from '@coreui/icons'

const ViewFeedback = () => {
  // const { id } = useParams()
  const { ticketId } = useLocation().state
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [details, setDetails] = useState()
  const [feedbackDetails, setFeedbackDetails] = useState()

  useEffect(() => {
    dispatch(getFeedbackById(ticketId))
      .then((res) => {
        setFeedbackDetails(res.data)
      })
      .catch((err) => console.log('err', err))
    dispatch(getTicketById(ticketId))
      .then((res) => {
        setDetails(res.data)
      })
      .catch((err) => console.log('err', err))
  }, [dispatch, ticketId])

  const handleStars = () => {
    let r = []
    for (let i = 0; i < feedbackDetails?.rating; i++) {
      r.push(<CIcon icon={cilStar} className="text-warning" key={i} />)
    }
    return r
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            View Feedback
            <CButton
              color="success"
              className="btn-sm float-end"
              onClick={() => navigate('/feedbacks')}
            >
              <CIcon icon={cilArrowCircleLeft} /> Back
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CRow className="mb-2">
                <CCol md={2}>
                  <b>Rating</b>
                </CCol>
                <CCol>{handleStars()}</CCol>
              </CRow>
              <CRow className="mb-2">
                <CCol md={2}>
                  <b>Message</b>
                </CCol>
                <CCol>{feedbackDetails?.feedback}</CCol>
              </CRow>
            </CRow>
            <hr />
            <TicketDetails details={details} />
            {/* <hr />
            <Link to={'/timeline/' + ticketId}>
              <CButton color="warning">View Timeline</CButton>
            </Link> */}
            <hr />
            <Timeline ticketId={ticketId} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewFeedback
