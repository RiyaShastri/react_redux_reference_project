import React, { useState } from 'react'
import { CButton, CCol, CRow } from '@coreui/react'
import { baseURL } from '../helpers/BaseApi'
import { formatDate, formatTime } from '../pages_/TimelinePage'
import CIcon from '@coreui/icons-react'
import { cilFile } from '@coreui/icons'

const TicketDetails = ({ details }) => {
  const [flag, setFlag] = useState(false)

  return (
    <div>
      <CRow>
        <CCol>
          <CRow className="mb-2">
            <CCol md={4}>
              <b>Name</b>
            </CCol>
            <CCol>{details?.firstName + ' ' + details?.lastName}</CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={4}>
              <b>Email</b>
            </CCol>
            <CCol>{details?.email}</CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={4}>
              <b>Contact No.</b>
            </CCol>
            <CCol>{details?.mobileNo}</CCol>
          </CRow>
        </CCol>
        <CCol>
          <CRow className="mb-2">
            <CCol md={4}>
              <b>Title</b>
            </CCol>
            <CCol>{details?.title}</CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={4}>
              <b>Agent</b>
            </CCol>
            <CCol>
              {details?.agent ? details?.agent.firstName + ' ' + details?.agent.lastName : '-'}
            </CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={4}>
              <b>Assigned By</b>
            </CCol>
            <CCol>
              {details?.moderator
                ? details?.moderator.firstName + ' ' + details?.moderator.lastName
                : '-'}
            </CCol>
          </CRow>
        </CCol>
        <CRow className="mb-2">
          <CCol md={2}>
            <b>Raised Date</b>
          </CCol>
          <CCol>{formatTime(details?.createdAt) + ' - ' + formatDate(details?.createdAt)}</CCol>
        </CRow>
      </CRow>
      <hr />
      <CRow className="mt-3">
        <CCol md={2}>
          <b>Description</b>
        </CCol>
        <CCol>
          <span>{details?.description}</span>
        </CCol>
      </CRow>
      {details?.documents.length !== 0 ? (
        <CRow className="mt-3">
          <hr />
          <CCol>
            <CButton color="light" className="btn-sm" onClick={() => setFlag(!flag)}>
              {flag ? (
                'Close'
              ) : (
                <>
                  <CIcon icon={cilFile} />
                  &nbsp;See Documents
                </>
              )}
            </CButton>
          </CCol>
          {flag ? (
            <CCol className="d-flex gap-4" md={10}>
              {details?.documents?.map((doc, i) => (
                <div key={i} className="d-grid mr-2">
                  <img
                    className="img img-thumbnail m-1"
                    src={'http://192.168.100.89:4004/file/' + doc}
                    style={{ width: '160px', height: '150px', objectFit: 'cover' }}
                    alt="AAA"
                  />
                  <CButton
                    className="primary"
                    onClick={(e) => {
                      window.open(baseURL + '/downloadDocs/' + doc, '_blank')
                    }}
                  >
                    Download
                  </CButton>
                </div>
              ))}
            </CCol>
          ) : null}
        </CRow>
      ) : null}
    </div>
  )
}

export default TicketDetails
