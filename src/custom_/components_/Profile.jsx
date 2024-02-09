import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilPencil } from '@coreui/icons'
import { getLoggedInUser } from '../redux/actions/users.actions'
import { baseAPI } from '../helpers/BaseApi'

const Profile = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const loggedInUserData = useSelector((state) => state.users.loggedInUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onImageUpload = async (data) => {
    const file = data.files[0]
    const details = {
      ...loggedInUserData,
      image: file,
    }
    console.log('details', details)
    // delete details.isDeleted
    // delete details.isActive
    // delete details.wrongAttempt
    // delete details.avatar
    // delete details._id
    await baseAPI
      .put(`/user/${loggedInUserData.id}`, details, {
        multipartForm: true,
      })
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
    setVisible(!visible)
    dispatch(getLoggedInUser())
  }

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  return (
    <CRow>
      <CCol md={9} className="m-auto">
        <CCard className="mb-4">
          <CCardHeader>Profile</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={4} className="m-auto">
                <div
                  // className="mb-3"
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
                      loggedInUserData?.avatar
                        ? `http://192.168.100.89:4004/avatar/${loggedInUserData?.avatar}`
                        : ''
                    }
                    style={{
                      width: '200px',
                      height: '200px',
                      // borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />

                  <CTooltip content="Change Profile Picture" placement="right">
                    <CButton
                      className="mt-3"
                      color="white"
                      onClick={() => {
                        setVisible(!visible)
                      }}
                    >
                      <CIcon icon={cilPencil} size="lg" />
                    </CButton>
                  </CTooltip>
                </div>
              </CCol>

              <CCol md={7} className="m-auto">
                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: '150px' }}>Name</CInputGroupText>
                  <CFormInput
                    value={
                      loggedInUserData?.firstName +
                      ' ' +
                      loggedInUserData?.middleName +
                      ' ' +
                      loggedInUserData?.lastName
                    }
                    readOnly
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: '150px' }}>Email</CInputGroupText>
                  <CFormInput value={loggedInUserData?.email + ''} readOnly />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: '150px' }}>Contact No</CInputGroupText>
                  <CFormInput value={loggedInUserData?.mobileNo + ''} readOnly />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: '150px' }}>Designation</CInputGroupText>
                  <CFormInput value={loggedInUserData?.designation + ''} readOnly />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: '150px' }}>Role</CInputGroupText>
                  <CFormInput value={loggedInUserData?.roletype?.role} readOnly />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: '150px' }}>Employee Code</CInputGroupText>
                  <CFormInput value={loggedInUserData?.employeeCode} readOnly />
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>Upload an image</CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit(onImageUpload)}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCloudUpload} />
                </CInputGroupText>
                <CFormInput
                  type="file"
                  placeholder="Image"
                  autoComplete="name"
                  name="files"
                  id="files"
                  {...register('files', { required: 'This field is required' })}
                />
              </CInputGroup>
              {errors.files && <p className="errors">{errors.files.message}</p>}

              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" className="m-2" type="submit">
                Upload
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default Profile
