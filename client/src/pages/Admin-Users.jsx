import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import {Link} from "react-router-dom"
export const AdminUsers=()=>{
    const {authorizationToken}=useAuth()
    const [users,setUsers]=useState([])
    const getAllUsersData=async()=>{
        try {
            const response=await fetch("http://localhost:4000/api/admin/users",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                }
            })
            const data=await response.json()
            console.log("Fetched Data:", data);
            setUsers(data.users);
        } catch (error) {
            console.log(error)
        }
    }

    // delete user on delete button
    const deleteUser=async (id)=>{
         const response=await fetch(`http://localhost:4000/api/admin/users/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:authorizationToken,
                }
            })
            const data=await response.json()
            console.log("Users after delete", data);
            // to not refresh the page after delete
            if(response.ok){
                getAllUsersData()
            }
    }

    useEffect(()=>{
        getAllUsersData()
    },[])
    return <>
    <section className="admin-users-section">
        <div className="container">
            <h1>Admin User Data</h1>
             </div>
             <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete </th>
                        </tr>
                    </thead>
                    <tbody>

    {
    users.map((curUser,index)=>{
        return (
            <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td><Link className="btn" to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                <td><button className="btn" onClick={()=>deleteUser(curUser._id)}>Delete</button></td>
            </tr>
        )
    })}
                    </tbody>
                </table>
   </div>  
    </section>
    </> 
}