import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserById } from '../redux/actions/users.actions'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const ViewUser = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    dispatch(getUserById(id))
      .then((res) => {
        setUserDetails(res.data)
      })
      .catch((err) => console.log('err', err))
  }, [dispatch, id])

  return (
    <CRow>
      <CCol md={9} className="m-auto">
        <CCard className="mb-4">
          <CCardHeader>View User</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={5}>
                <div
                  className="mb-3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt="Profile"
                    src={
                      userDetails?.avatar
                        ? `http://192.168.100.89:4004/avatar/${userDetails?.avatar}`
                        : ''
                    }
                    style={{
                      width: '200px',
                      height: '200px',
                      // borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </CCol>
              <CCol md={7}>
                <CRow className="mb-2">
                  <CCol md={4}>
                    <b>Name</b>
                  </CCol>
                  <CCol>
                    {userDetails?.firstName +
                      ' ' +
                      userDetails?.middleName +
                      ' ' +
                      userDetails?.lastName}
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol md={4}>
                    <b>Email</b>
                  </CCol>
                  <CCol>{userDetails?.email}</CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol md={4}>
                    <b>Contact No.</b>
                  </CCol>
                  <CCol>{userDetails?.mobileNo}</CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol md={4}>
                    <b>Employee Code</b>
                  </CCol>
                  <CCol>{userDetails?.employeeCode}</CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol md={4}>
                    <b>Designation</b>
                  </CCol>
                  <CCol>{userDetails?.designation}</CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol md={4}>
                    <b>Role</b>
                  </CCol>
                  <CCol>
                    {userDetails?.userRoleId === 1
                      ? 'Admin'
                      : userDetails?.userRoleId === 2
                      ? 'Moderator'
                      : 'Agent'}
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewUser
