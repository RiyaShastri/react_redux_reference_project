import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseAPI } from '../helpers/BaseApi'
import { CBadge, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight } from '@coreui/icons'

export function formatDate(string) {
  var options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(string).toLocaleDateString([], options)
}
export function formatTime(string) {
  var options = { hour: '2-digit', minute: '2-digit' }
  return new Date(string).toLocaleTimeString([], options)
}

const TimelineLi = ({ item }) => {
  // const d = new Date(item.time)
  // const x = `${d.toLocaleTimeString()} - ${d.toDateString()}`
  return (
    <li className="mt-4">
      <>
        {item.activityName === 'Ticket Generated.' ? (
          <CBadge className="text-bg-primary">{item.activityName}</CBadge>
        ) : item.activityName === 'Assign to the agent.' ||
          item.activityName ===
            "Agent side's work is done, Needs approval from higher authorities." ? (
          <CBadge className="text-bg-warning">{item.activityName}</CBadge>
        ) : item.activityName === 'Ticket Status changed.' ||
          item.activityName === 'Comment Added.' ? (
          <CBadge className="text-bg-info">{item.activityName}</CBadge>
        ) : item.activityName === 'Ticket Resolved.' ? (
          <CBadge className="text-bg-success">{item.activityName}</CBadge>
        ) : (
          <CBadge className="text-bg-dark">{item.activityName}</CBadge>
        )}
      </>
      <hr />
      <small>
        {formatTime(item.createdAt)} - {formatDate(item.createdAt)}
      </small>
      {item.activityName === 'Ticket Generated.' ? null : (
        <>
          {item.oldStatus ? (
            <div className="bg-dark w-75 p-2 rounded text-capitalize text-white mt-2">
              <small>
                {item.oldStatus}&nbsp;
                {item.oldStatus === 'unassigned' ? (
                  <>
                    <CIcon icon={cilArrowRight} />
                    &nbsp; Assigned &nbsp;
                    <CIcon icon={cilArrowRight} />
                    &nbsp;
                    {item.ticket.agent.firstName + ' ' + item.ticket.agent.lastName}
                  </>
                ) : null}
                &nbsp;
                <CIcon icon={cilArrowRight} />
                &nbsp;
                {item.newStatus}
              </small>
            </div>
          ) : null}
          {item.comment ? (
            <p className="w-75 bg-light p-2 mt-2 rounded">
              <b>Comment</b>
              <br />
              {item.comment}
            </p>
          ) : null}
        </>
      )}
    </li>
  )
}

const Timeline = ({ ticketId }) => {
  const { id } = useParams()
  const [timelineItems, setTimelineItems] = useState()

  useEffect(() => {
    baseAPI
      .get('/ticket/timeline/' + (ticketId ? ticketId : id))
      .then((res) => {
        // console.log('res.data.data', res.data.data)
        setTimelineItems(res.data.data)
      })
      .catch((err) => console.log('err :>> ', err))
  }, [id, ticketId])

  return (
    <CRow className="mt-3">
      <CCol md={12}>
        <ul className="timeline">
          {timelineItems?.map((item) => (
            <TimelineLi key={item.id} item={item} />
          ))}
        </ul>
      </CCol>
    </CRow>
  )
}

export default Timeline
