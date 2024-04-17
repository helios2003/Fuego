import { useNavigate } from "react-router-dom"

interface PrivateRouteProps {
  Component: React.ComponentType
}

export default function PrivateRoute({ Component }: PrivateRouteProps) {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('token')

  return isAuthenticated ? <Component /> : navigate('/signin')
}
