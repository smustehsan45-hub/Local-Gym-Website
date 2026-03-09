import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export const Register=()=>{
    const URL="http://localhost:4000/api/auth/register"
       const [user,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });
    const navigate=useNavigate()
    const {storetokenInLs}=useAuth();
    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name
        let value=e.target.value
        setUser({
            ...user,
            [name]:value
        })
    }
     // form submission
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(user)   
        try {
            
            const response=await fetch(URL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            })
            const res_data=await response.json();
            console.log("data from server",res_data)
            if(response.ok){
                // store the token in local storage
                storetokenInLs(res_data.token)
               
               setUser({ username:"",email:"",phone:"",password:"",}) ;
               toast.success("Registration Successfull")
               navigate("/")
            }else{
                toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)
            }
            console.log(response)
        } 
        catch (error) {
            console.log("register",error)
        }
    }
    return (
        <>
        <section>
        <main>
            <div className="section-registration">
                <div className="container">
                    {/* registration form */}
                    <div className="registration-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
                        <h1 className="main-heading mb-3">registration form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username"  placeholder="username" id="username" required autoComplete="off" value={user.username} onChange={handleInput}/>
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email"  placeholder="enter your email" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="phone">phone</label>
                                <input type="number" name="phone"  placeholder="enter your phone" id="phone" required autoComplete="off" value={user.phone} onChange={handleInput}/>
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password"  placeholder="enter your password" id="password" required autoComplete="off" value={user.password} onChange={handleInput}/>
                            </div>
                            <br />

                            <button type="submit" className="btn btn-submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
        </>
    )
}