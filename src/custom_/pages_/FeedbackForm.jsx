import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { baseAPI } from '../helpers/BaseApi'

const FeedbackForm = () => {
  const { t } = useParams()
  const [flag, setFlag] = useState(false)
  const [error, setError] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const ratingChanged = (newRating) => {
    setRating(newRating)
    setError(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (rating !== 0) {
      const d = {
        rating,
        feedback,
        token: t,
      }
      baseAPI
        .post('/ticket/feedback', d)
        .then((res) => {
          console.log('res', res)
          setFlag(true)
        })
        .catch((err) => console.log('err', err))
    } else {
      setError(true)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {flag ? (
                    <>
                      <h3>Your feedback has been recorded!</h3>
                      <Link to="/login">
                        <CButton color="link" className="px-0">
                          Login
                        </CButton>
                      </Link>
                    </>
                  ) : (
                    <CForm onSubmit={onSubmit}>
                      <h1>Feedback</h1>
                      <hr />
                      <div className="d-flex justify-content-center">
                        <ReactStars
                          count={5}
                          onChange={ratingChanged}
                          size={50}
                          activeColor="#ffd700"
                        />
                      </div>
                      {error && <p className="errors">Rating is required!</p>}
                      <CFormLabel className="mt-2">Message</CFormLabel>
                      <CFormTextarea
                        placeholder="Write Message"
                        className="mb-4"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <CButton color="primary" className="px-4" type="submit">
                        Submit
                      </CButton>
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

export default FeedbackForm
