import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
  CInputGroup,
  CRow,
} from '@coreui/react'

const ResetPassword = () => {
  const { t } = useParams()
  const [flag, setFlag] = useState(false)
  const fPwdData = useSelector((state) => state.users.forgotPwdData)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      cPassword: '',
    },
  })

  const cpwd = watch('password')

  const onSubmit = async (data) => {
    const d = {
      password: data.password,
      resetPasswordToken: t,
      data: fPwdData,
    }
    baseAPI
      .post('/forgotPassword', d)
      .then((res) => {
        // console.log('res', res)
        toast.success(res.data?.message)
        setFlag(true)
      })
      .catch((err) => {
        console.log('err', err)
        toast.error(err.response?.data?.message)
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {flag ? (
                    <>
                      <h3>Your password has been reset!</h3>
                      <Link to="/login">
                        <CButton color="link" className="px-0">
                          Login
                        </CButton>
                      </Link>
                    </>
                  ) : (
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                      <h3 className="mb-4">Reset Password</h3>
                      <CFormLabel>Password</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Password"
                          autoComplete="password"
                          value={register.password}
                          {...register('password', {
                            required: 'This field is required',
                            pattern: {
                              value:
                                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*.-_]{8,25}$/,
                              message:
                                'Password(Uppercase, Lowercase, Number/SpecialChar and min 8 char)',
                            },
                          })}
                        />
                      </CInputGroup>
                      {errors.password && <p className="errors">{errors.password.message}</p>}

                      <CFormLabel>Confirm Password</CFormLabel>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          placeholder="Confirm Password"
                          autoComplete="current-password"
                          value={register.cPassword}
                          {...register('cPassword', {
                            required: 'This field is required',
                            validate: (value) => value === cpwd || 'The passwords do not match',
                          })}
                        />
                      </CInputGroup>
                      {errors.cPassword && <p className="errors">{errors.cPassword.message}</p>}
                      <CRow>
                        <CCol xs={6} className="text-right">
                          <CButton color="primary" className="px-4" type="submit">
                            Submit
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword

export const ResetPasswordLink = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    baseAPI
      .post('/forgotPasswordLink', data)
      .then((res) => {
        console.log('res', res)
        toast.success(res.data?.message)
        navigate('/login')
      })
      .catch((err) => {
        console.log('err', err)
        toast.error(err.response?.data?.message)
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="mb-4">Reset Password</h3>
                    <CFormLabel>Email</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="email"
                        placeholder="Email Id"
                        value={register.email}
                        {...register('email', {
                          required: 'This field is required',
                        })}
                      />
                    </CInputGroup>
                    {errors.email && <p className="errors">{errors.email.message}</p>}

                    <CRow>
                      <CCol xs={6} className="text-right">
                        <CButton color="primary" className="px-4" type="submit">
                          Submit
                        </CButton>
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
