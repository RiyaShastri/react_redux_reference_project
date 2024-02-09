import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTicketTypesNames } from '../redux/actions/ticketTypes.actions'
import { useForm } from 'react-hook-form'
import { baseAPI } from '../helpers/BaseApi'
import { toast } from 'react-toastify'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CRow,
} from '@coreui/react'

const MAX_COUNT = 5

const CreateTicket = () => {
  const navigate = useNavigate()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)
  const dispatch = useDispatch()
  const ticketTypes = useSelector((state) => state.ticketTypes.ticketTypesNames)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (ticketTypes?.length === 0) {
      dispatch(getTicketTypesNames())
    }
  }, [dispatch, ticketTypes])

  const handleFileEvent = (f) => {
    const chosenFiles = Array.prototype.slice.call(f)
    handleUploadFiles(chosenFiles)
  }

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles]
    let limitExceeded = false
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
        if (uploaded.length === MAX_COUNT) setFileLimit(true)
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files!`)
          setFileLimit(false)
          limitExceeded = true
          return true
        }
      }
      return false
    })
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  const onSubmit = async (data) => {
    data.ticketTypeId = parseInt(data.type)
    delete data.type
    // console.log('uploadedFiles :>> ', uploadedFiles)
    data.docs = uploadedFiles
    console.log('data', data)
    const formData = new FormData()
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(key, val)
        })
      } else {
        formData.append(key, value)
      }
      // formData.append(key, value)
    })
    // console.log('data.docs', data.docs)
    // await baseAPI
    await baseAPI({
      url: '/ticket',
      method: 'post',
      multipartForm: true,
      data: formData,
    })
      // .post('/ticket', data, { multipartForm: true })
      .then((res) => {
        console.log('res', res)
        toast.success(res.data?.message)
        navigate('/')
      })
      .catch((err) => console.log('err', err))
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create Ticket</h2>
                    <p className="text-medium-emphasis">Generate a support ticket for your issue</p>
                    <hr />

                    <CRow>
                      <CCol>
                        <CRow>
                          <CCol>
                            <CFormLabel>First Name</CFormLabel>
                            <CInputGroup className="mb-3">
                              <CFormInput
                                autoComplete="firstName"
                                value={register.firstName}
                                {...register('firstName', { required: 'This field is required' })}
                              />
                            </CInputGroup>
                            {errors.firstName && (
                              <p className="errors">{errors.firstName.message}</p>
                            )}

                            <CFormLabel>Last Name</CFormLabel>
                            <CInputGroup className="mb-3">
                              <CFormInput
                                autoComplete="lastName"
                                value={register.lastName}
                                {...register('lastName', { required: 'This field is required' })}
                              />
                            </CInputGroup>
                            {errors.lastName && <p className="errors">{errors.lastName.message}</p>}
                          </CCol>
                          <CCol>
                            <CFormLabel>Email</CFormLabel>
                            <CInputGroup className="mb-3">
                              <CFormInput
                                autoComplete="email"
                                value={register.email}
                                {...register('email', {
                                  required: 'This field is required',
                                  pattern: {
                                    value: /^[a-z0-9.]+@[a-z.]+.[a-z]+$/,
                                    message: 'Email(abc@xyz.co)',
                                  },
                                })}
                              />
                            </CInputGroup>
                            {errors.email && <p className="errors">{errors.email.message}</p>}

                            <CFormLabel>Contact No</CFormLabel>
                            <CInputGroup className="mb-3">
                              <CFormInput
                                autoComplete="mobileNo"
                                value={register.mobileNo}
                                {...register('mobileNo', {
                                  required: 'This field is required',
                                  pattern: {
                                    value: /^\d{10}$/,
                                    message: 'Contact number should be 10 digits',
                                  },
                                })}
                              />
                            </CInputGroup>
                            {errors.mobileNo && <p className="errors">{errors.mobileNo.message}</p>}
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol>
                            <CFormLabel>Title</CFormLabel>
                            <CInputGroup className="mb-3">
                              <CFormInput
                                autoComplete="title"
                                value={register.title}
                                {...register('title', { required: 'This field is required' })}
                              />
                            </CInputGroup>
                            {errors.title && <p className="errors">{errors.title.message}</p>}

                            <CFormLabel>Description</CFormLabel>
                            <CInputGroup className="mb-3">
                              {/* <CFormInput
                                autoComplete="description"
                                value={register.description}
                                {...register('description', { required: 'This field is required' })}
                              /> */}
                              <CFormTextarea
                                autoComplete="description"
                                value={register.description}
                                {...register('description', { required: 'This field is required' })}
                              />
                            </CInputGroup>
                            {errors.description && (
                              <p className="errors">{errors.description.message}</p>
                            )}
                            <CRow>
                              <CCol>
                                <CFormLabel>Ticket Type</CFormLabel>
                                <CFormSelect
                                  name="select"
                                  className="mb-3"
                                  style={{ flex: 3 }}
                                  value={register.type}
                                  {...register('type', {
                                    required: 'This field is required',
                                  })}
                                  //   value={typeInput}
                                  //   onChange={(e) => {
                                  //     setTypeInput(e.target.value)
                                  //     console.log(e.target.value)
                                  //   }}
                                >
                                  <option value="">-- Select Ticket Type --</option>
                                  {ticketTypes?.map((d) => (
                                    <option value={d.id} key={d.id}>
                                      {d.name}
                                    </option>
                                  ))}
                                </CFormSelect>
                                {errors.type && <p className="errors">{errors.type.message}</p>}
                              </CCol>
                              <CCol>
                                <CFormLabel>Upload Documents</CFormLabel>
                                <CInputGroup className="mb-3">
                                  <CFormInput
                                    type="file"
                                    placeholder="File Name"
                                    multiple
                                    name="docs"
                                    id="files"
                                    // {...register('docs', {
                                    //   required: 'This field is required',
                                    // })}
                                    onChange={(e) => handleFileEvent(e.target.files)}
                                    disabled={fileLimit}
                                  />
                                </CInputGroup>
                                <div>
                                  {uploadedFiles.map((file) => (
                                    <span key={file.lastModified}>{file.name} &nbsp;</span>
                                  ))}
                                </div>
                              </CCol>
                            </CRow>

                            {/* <CFormInput
                          type="file"
                          placeholder="File Name"
                          autoComplete="name"
                          name="files"
                          multiple
                          id="files"
                          {...register('files', {
                            required: 'This field is required',
                          })}
                        /> */}
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Submit
                        </CButton>
                        <Link to="/login">
                          <CButton color="warning" className="px-4 mx-3">
                            Cancel
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default CreateTicket
