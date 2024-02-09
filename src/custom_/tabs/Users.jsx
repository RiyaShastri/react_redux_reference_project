import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'src/custom_/components_/Table'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUser,
  deleteUser,
  editUser,
  getAddedByUsers,
  getUserById,
  getUserRoles,
  getUsers,
} from 'src/custom_/redux/actions/users.actions'
import { toast } from 'react-toastify'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilMenu, cilPeople, cilPlus } from '@coreui/icons'

const Users = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(false)
  const [editId, setEditId] = useState(null)
  // const [userRole, setUserRole] = useState([])
  const [userRoleInput, setUserRoleInput] = useState()
  const dispatch = useDispatch()
  const type = JSON.parse(localStorage.getItem('info'))?.type
  const [filter, setFilter] = useState({
    userRoleId: '',
    addedBy: '',
  })
  const addedByUsers = useSelector((state) => state.users.addedByUsers)
  const userRole = useSelector((state) => state.users.userRoles)

  const userColumns = [
    // {
    //   name: 'No.',
    //   id: 'UserNo',
    //   cell: (row, index) => index + 1,
    //   width: '60px',
    // },
    {
      name: <CIcon icon={cilPeople} />,
      cell: (row) => (
        <img
          alt="Profile"
          src={row?.avatar ? `http://192.168.100.89:4004/avatar/${row?.avatar}` : ''}
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ),
      width: '70px',
    },
    {
      name: 'Name',
      selector: (row) => row.firstName + ' ' + row.lastName,
      sortable: true,
      sortField: 'name',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Role',
      selector: (row) => row.roletype?.role,
      sortable: true,
      sortField: 'role',
    },
    {
      name: 'Added By',
      selector: (row) => row.added?.firstName + ' ' + row.added?.lastName,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <CButton
            color="white"
            onClick={(e) => {
              e.preventDefault()
              navigate('/users/view-user/' + row.id)
            }}
          >
            <CIcon icon={cilMenu} />
          </CButton>
          &nbsp;
          <CButton
            color="white"
            onClick={(e) => {
              e.preventDefault()
              setVisible(true)
              setEditId(row.id)
              onEditUser(row.id)
            }}
          >
            <CIcon icon={cilPencil} />
          </CButton>
          &nbsp;
          <CButton
            color="white"
            onClick={(e) => {
              e.preventDefault()
              setEditId(row.id)
              onDeleteUser(row.id)
            }}
          >
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
      width: '150px',
    },
  ]

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const onEditUser = async (id) => {
    await dispatch(getUserById(id))
      .then((res) => {
        setValue('firstName', res.data?.firstName)
        setValue('middleName', res.data?.middleName)
        setValue('lastName', res.data?.lastName)
        setValue('email', res.data?.email)
        setValue('mobileNo', res.data?.mobileNo)
        setValue('employeeCode', res.data?.employeeCode)
        setValue('designation', res.data?.designation)
        setUserRoleInput(res.data?.userRoleId)
      })
      .catch((err) => console.log('err :>> ', err))
  }

  const onDeleteUser = async (id) => {
    await dispatch(deleteUser(id))
      .then((res) => {
        console.log('res :>> ', res)
        toast.success(res.message)
      })
      .catch((err) => console.log('err :>> ', err))
    setEditId(null)
  }

  const onSubmit = (data) => {
    if (type === 1) {
      data.userRoleId = parseInt(userRoleInput)
    }
    if (editId) {
      dispatch(editUser(editId, data))
        .then((res) => {
          toast.success(res.message)
        })
        .catch((err) => console.log('err', err))
      setEditId(null)
    } else {
      dispatch(addUser(data))
        .then((res) => {
          // console.log('res', res)
          toast.success(res.message)
        })
        .catch((err) => console.log('err', err))
    }
    reset()
    setVisible(false)
    setEditId(null)
  }

  // const getUserRole = async () => {
  //   baseAPI
  //     .get('/_userRole')
  //     .then((res) => {
  //       setUserRole(res.data?.data)
  //       console.log('res.data.data :>> ', res.data.data)
  //     })
  //     .catch((err) => console.log('err', err))
  // }

  useEffect(() => {
    if (addedByUsers?.length === 0) {
      dispatch(getAddedByUsers())
    }
    if (userRole?.length === 0) {
      dispatch(getUserRoles())
    }
  }, [dispatch, addedByUsers, userRole])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            {type === 1 ? 'User List' : 'Agent List'}
            <CButton
              color="primary"
              className="btn-sm float-end"
              onClick={() => {
                setVisible(true)
              }}
            >
              <CIcon icon={cilPlus} />
              &nbsp;
              {type === 1 ? 'Add User' : 'Add Agent'}
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CForm style={{ display: 'flex' }}>
              <CFormInput
                className="m-2"
                style={{ flex: 3 }}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearch(e.target.value)}
              />
              <CFormSelect
                name="select"
                className="m-2"
                style={{ flex: 3 }}
                value={filter.userRoleId}
                onChange={(e) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      userRoleId: parseInt(e.target.value),
                    }
                  })
                }}
              >
                <option>-- Select User Role --</option>
                {userRole?.map((d) => (
                  <option value={d.id} key={d.id}>
                    {d.role}
                  </option>
                ))}
              </CFormSelect>
              <CFormSelect
                name="select"
                className="m-2"
                style={{ flex: 3 }}
                value={filter.addedBy}
                onChange={(e) => {
                  setFilter((prev) => {
                    return {
                      ...prev,
                      addedBy: parseInt(e.target.value),
                    }
                  })
                }}
              >
                <option>-- Select Added By --</option>
                {addedByUsers?.map((d) => (
                  <option value={d.id} key={d.id}>
                    {d.firstName + ' ' + d.lastName}
                  </option>
                ))}
              </CFormSelect>
            </CForm>
            <Table
              find={{ search: search }}
              filters={{ filters: filter }}
              columns={userColumns}
              getDataSuccess={getUsers}
              API="/_user"
              //   status={status}
            />
          </CCardBody>
        </CCard>

        <CModal
          visible={visible}
          onClose={() => {
            setVisible(false)
            setEditId(null)
            reset()
          }}
          className="modal-lg"
        >
          <CModalHeader
            onClose={() => {
              setVisible(false)
              setEditId(null)
              reset()
            }}
          >
            <h5 style={{ margin: 0 }}>
              {editId ? 'Edit ' : 'Add '}
              {type === 1 ? 'User' : 'Agent'}
            </h5>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <CFormLabel>First Name</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="First Name"
                      autoComplete="name"
                      value={register.firstName}
                      {...register('firstName', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.firstName && <p className="errors">{errors.firstName.message}</p>}

                  <CFormLabel>Middle Name</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Middle Name"
                      autoComplete="name"
                      value={register.middleName}
                      {...register('middleName', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.middleName && <p className="errors">{errors.middleName.message}</p>}

                  <CFormLabel>Last Name</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Last Name"
                      autoComplete="name"
                      value={register.lastName}
                      {...register('lastName', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.lastName && <p className="errors">{errors.lastName.message}</p>}

                  <CFormLabel>Email</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Email"
                      autoComplete="name"
                      value={register.email}
                      {...register('email', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.email && <p className="errors">{errors.email.message}</p>}
                </div>
                &nbsp; &nbsp; &nbsp;
                <div style={{ flex: 1 }}>
                  <CFormLabel>Contact Number</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Contact Number"
                      autoComplete="name"
                      value={register.mobileNo}
                      {...register('mobileNo', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.mobileNo && <p className="errors">{errors.mobileNo.message}</p>}

                  <CFormLabel>Employee Code</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Employee Code"
                      autoComplete="name"
                      value={register.employeeCode}
                      {...register('employeeCode', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.employeeCode && <p className="errors">{errors.employeeCode.message}</p>}

                  <CFormLabel>Designation</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Designation"
                      autoComplete="name"
                      value={register.designation}
                      {...register('designation', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.designation && <p className="errors">{errors.designation.message}</p>}

                  {type === 1 ? (
                    <>
                      <CFormLabel>User Role</CFormLabel>
                      <CFormSelect
                        name="select"
                        className="mb-3"
                        value={userRoleInput}
                        onChange={(e) => {
                          setUserRoleInput(e.target.value)
                          // getSubCategories(state)
                        }}
                      >
                        <option>-- Select User Role --</option>
                        {userRole?.map((d) => (
                          <option value={d.id} key={d.id}>
                            {d.role}
                          </option>
                        ))}
                      </CFormSelect>
                    </>
                  ) : null}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CButton
                  color="secondary"
                  className="m-2"
                  onClick={() => {
                    setVisible(false)
                    setEditId(null)
                    reset()
                  }}
                >
                  Close
                </CButton>
                <CButton color="primary" className="m-2" type="submit">
                  Save Changes
                </CButton>
              </div>
            </CForm>
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default Users
