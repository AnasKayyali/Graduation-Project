import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    return(
        localStorage.getItem('token') ? <Navigate to="/"/> : <Outlet/>  
    )
}

export default PrivateRoutes