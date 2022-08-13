import {useContext} from "react"
import {Navigate, Outlet} from "react-router-dom"
import {authContext} from "../../../contexts/authContext"

export const PrivateRoute = () => {
  const {_, authData, __} = useContext(authContext)

  if(!authData){
    return <Navigate to={"/login"} replace />
  }
  else {
    return <Outlet />
  }
}