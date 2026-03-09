import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../../store/auth"

export const AdminLayout=()=>{
    const {user,isLoading}=useAuth()
   console.log("admin user",user)
    if(isLoading){
        return <h1>Loading ...</h1>
    }
    if(!user.isAdmin){
        return <Navigate to="/" />
    }
    return <>
    <header>
        <div className="container">
            <nav>
                <ul>
                    <li> <NavLink to="/admin/users">users</NavLink> </li>
                    <li><NavLink to="/admin/contacts">contacts</NavLink></li>
                    <li> <NavLink to="/service">services</NavLink></li>
                     <li><NavLink to="/admin/bookings">Bookings</NavLink></li>
                    <li><NavLink to="/">home</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
    <Outlet />
    </>
}