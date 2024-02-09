import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './custom_/helpers/PrivateRoute'
import { ResetPasswordLink } from './custom_/pages_/ResetPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ResetPassword = React.lazy(() => import('./custom_/pages_/ResetPassword'))
const CreateTicket = React.lazy(() => import('./custom_/pages_/CreateTicket'))
const Timeline = React.lazy(() => import('./custom_/pages_/TimelinePage'))
const FeedbackForm = React.lazy(() => import('./custom_/pages_/FeedbackForm'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/create-ticket"
              name="Create Ticket Page"
              element={<CreateTicket />}
            />
            <Route exact path="/timeline/:id" name="Timeline Page" element={<Timeline />} />
            <Route
              exact
              path="/feedback-form/:t"
              name="Feedback Page"
              element={
                <PrivateRoute>
                  <FeedbackForm />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/reset-password/:t"
              name="Reset Password Page"
              element={
                <PrivateRoute>
                  <ResetPassword />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/reset-password/link"
              name="Reset Password Link Page"
              element={
                <PrivateRoute>
                  <ResetPasswordLink />
                </PrivateRoute>
              }
            />
            {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
            {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
            {/* <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
            <Route
              path="*"
              name="Home"
              element={
                <PrivateRoute>
                  <DefaultLayout />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
