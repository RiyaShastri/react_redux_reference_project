import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketDetails from '../components_/TicketDetails'
import { baseAPI } from '../helpers/BaseApi'
import {
  // CAccordion,
  // CAccordionBody,
  // CAccordionHeader,
  // CAccordionItem,
  CBadge,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import Timeline from '../components_/Timeline'

export function formatDate(string) {
  var options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(string).toLocaleDateString([], options)
}
export function formatTime(string) {
  var options = { hour: '2-digit', minute: '2-digit' }
  return new Date(string).toLocaleTimeString([], options)
}

const TimelinePage = () => {
  const { id } = useParams()
  const [details, setDetails] = useState()

  useEffect(() => {
    baseAPI
      .get('/ticket/' + id)
      .then((res) => {
        setDetails(res.data.data)
      })
      .catch((err) => console.log('err :>> ', err))
  }, [id])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CCardGroup>
              <CCard className="p-4 mt-5">
                <CCardBody>
                  <h2>Ticket #{id}</h2>
                  <div style={{ position: 'absolute', top: '40px', left: '200px' }}>
                    {details?.status === 'todo' ? (
                      <CBadge className="text-bg-primary">{details?.status}</CBadge>
                    ) : details?.status === 'in-progress' ? (
                      <CBadge className="text-bg-warning">{details?.status}</CBadge>
                    ) : details?.status === 'close' ? (
                      <CBadge className="text-bg-success">{details?.status}</CBadge>
                    ) : (
                      <CBadge className="text-bg-dark">{details?.status}</CBadge>
                    )}
                  </div>
                  <hr />
                  <CRow>
                    <CCol md={12}>
                      {/* <CAccordion flush>
                        <CAccordionItem>
                          <CAccordionHeader>View Ticket Details</CAccordionHeader>
                          <CAccordionBody>
                            <TicketDetails details={details} />
                          </CAccordionBody>
                        </CAccordionItem>
                      </CAccordion> */}
                      <TicketDetails details={details} />
                    </CCol>
                  </CRow>
                  <hr />
                  <Timeline />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default TimelinePage
