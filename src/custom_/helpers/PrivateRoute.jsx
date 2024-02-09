import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
  const info = localStorage.getItem('info')
  const type = JSON.parse(info)?.type
  const path = useLocation().pathname

  if (info === null && !path.includes('/reset-password') && !path.includes('/feedback')) {
    return <Navigate to="/login" />
  } else if (info !== null && path.includes('/reset-password')) {
    return <Navigate to="/" />
  } else if (info !== null && path.includes('/feedback-form')) {
    return <Navigate to="/" />
  } else if (type !== 1 && path.includes('/ticketTypes')) {
    return <Navigate to="/" />
  } else if (type === 3 && path.includes('/users')) {
    return <Navigate to="/" />
  }

  return children
}
