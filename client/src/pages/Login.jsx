import { useState } from "react"
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import{toast} from "react-toastify"
import "./Login.css";


const URL="http://localhost:4000/api/auth/login"
export const Login =()=>{
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...user,
            [name]:value,
        })
    }
    const navigate=useNavigate()
    const {storetokenInLs}=useAuth();  
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch(URL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            })
            console.log("login form",response)
            const res_data=await response.json();
             if(response.ok){
                // alert("Login successfull")
                 storetokenInLs(res_data.token)
                // localStorage.setItem("token",res_data.token)
               setUser({ email:"",password:"",}) ;  
               toast.success("Login Successfull")
               navigate("/")
            }else{
             toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)
                console.log("invalid credentials")
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    return(
    <>
     <section>
        <main>
            <div className="section-registration">
                <div className="container">
                    {/* registration form */}
                    <div className="registration-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
                        <h1 className="main-heading mb-3">Login form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email"  placeholder="enter your email" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                            </div>
                          
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password"  placeholder="enter your password" id="password" required autoComplete="off" value={user.password} onChange={handleInput}/>
                            </div>
                            <br />

                            <button type="submit" className="btn btn-submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
)
}