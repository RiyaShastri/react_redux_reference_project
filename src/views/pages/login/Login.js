import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { baseAPI } from 'src/custom_/helpers/BaseApi'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    await baseAPI
      .post('/login', data)
      .then((res) => {
        // console.log('res', res)
        // toast.success(res.data.message)
        localStorage.setItem('info', JSON.stringify({ token: res.data.token, type: res.data.type }))
        navigate('/')
      })
      .catch((err) => {
        console.log('err :>> ', err)
        toast.error(err.response.data.message)
        if (err.response.status === 409) {
          setValue('username', '')
          setValue('password', '')
        }
      })
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="username"
                        value={register.username}
                        {...register('username', { required: 'This field is required' })}
                      />
                    </CInputGroup>
                    {errors.username && <p className="errors">{errors.username.message}</p>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={register.password}
                        {...register('password', { required: 'This field is required' })}
                      />
                    </CInputGroup>
                    {errors.password && <p className="errors">{errors.password.message}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/reset-password/link">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Facing Any Issue?</h2>
                    <p>
                      Generate a support ticket to Narola Support group and your problem will be
                      resolved as soon as possible.
                    </p>
                    <Link to="/create-ticket">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Generate Support Ticket
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
