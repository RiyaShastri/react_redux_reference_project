import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersByRoleId } from '../redux/actions/users.actions'
import { useForm } from 'react-hook-form'
import Table from '../components_/Table'
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
import {
  addTicketType,
  deleteTicketType,
  editTicketType,
  getTicketTypeById,
  getTicketTypes,
} from '../redux/actions/ticketTypes.actions'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

const TicketTypes = () => {
  const dispatch = useDispatch()
  const usersByRoleId = useSelector((state) => state.users.usersByRoleId)
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState({
    addedBy: '',
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const ticketTypeColumns = [
    // {
    //   name: 'No.',
    //   id: 'TicketTypeNo',
    //   cell: (row, index) => index + 1,
    //   width: '80px',
    // },
    {
      name: 'Type',
      selector: (row) => row.name,
      sortable: true,
      sortField: 'name',
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Added By',
      selector: (row) => row.admin?.firstName + ' ' + row.admin?.lastName,
      sortable: true,
      sortField: 'addedBy',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <CButton
            color="white"
            onClick={(e) => {
              e.preventDefault()
              setVisible(true)
              setEditId(row.id)
              onEditTicketType(row.id)
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
              onDeleteTicketType(row.id)
            }}
          >
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
      // width: '150px',
    },
  ]

  useEffect(() => {
    dispatch(getUsersByRoleId(1))
  }, [dispatch])

  const onSubmit = (data) => {
    data.name = data.ticketName
    delete data.ticketName
    if (editId) {
      dispatch(editTicketType(editId, data))
        .then((res) => {
          toast.success(res.message)
        })
        .catch((err) => console.log('err', err))
      setEditId(null)
    } else {
      dispatch(addTicketType(data))
        .then((res) => {
          toast.success(res.message)
        })
        .catch((err) => console.log('err', err))
    }
    reset()
    setVisible(false)
    setEditId(null)
  }

  const onEditTicketType = async (id) => {
    await dispatch(getTicketTypeById(id))
      .then((res) => {
        setValue('ticketName', res.data?.name)
        setValue('description', res.data?.description)
      })
      .catch((err) => console.log('err', err))
  }

  const onDeleteTicketType = async (id) => {
    await dispatch(deleteTicketType(id))
      .then((res) => {
        toast.success(res.message)
      })
      .catch((err) => console.log('err', err))
    setEditId(null)
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            Ticket Types List
            <CButton
              color="primary"
              className="btn-sm float-end"
              onClick={() => {
                setVisible(true)
              }}
            >
              <CIcon icon={cilPlus} />
              &nbsp;Add Ticket Type
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
                style={{ flex: 2 }}
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
                {usersByRoleId?.map((d) => (
                  <option value={d.id} key={d.id}>
                    {d.firstName + ' ' + d.lastName}
                  </option>
                ))}
              </CFormSelect>
            </CForm>
            <Table
              find={{ search: search }}
              filters={{ filters: filter }}
              columns={ticketTypeColumns}
              getDataSuccess={getTicketTypes}
              API="/_tickettype"
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
              Agent
            </h5>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <CFormLabel>Name</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Ticket Name"
                      autoComplete="name"
                      value={register.ticketName}
                      {...register('ticketName', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.ticketName && <p className="errors">{errors.ticketName.message}</p>}

                  <CFormLabel>Description</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Description"
                      autoComplete="name"
                      value={register.description}
                      {...register('description', {
                        required: 'This field is required',
                      })}
                    />
                  </CInputGroup>
                  {errors.description && <p className="errors">{errors.description.message}</p>}
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

export default TicketTypes
