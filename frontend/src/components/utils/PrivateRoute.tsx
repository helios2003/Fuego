import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token')
  if (isAuthenticated) {
    return children; 
  }
  return <Navigate to="/" />
}