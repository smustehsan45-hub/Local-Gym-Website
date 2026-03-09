// auth.jsx
import { useEffect, createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const[token,setToken]=useState(localStorage.getItem("token"))
   const [user,setUser]=useState("")
    const[isLoading, setIsLoading]=useState(true)
  const [services, setServices] = useState([]);
   const authorizationToken=`Bearer ${token}`

  // store token in ls
  const storetokenInLs=(storeToken)=>{
    setToken(storeToken)
    localStorage.setItem("token",storeToken)
    // Fetch user data after storing token
    if (storeToken) {
      userAuthentication(storeToken)
    }
  }

  // agr token hai to isLoggedin true warna false
  const isLoggedIn = Boolean(token);
  console.log("isLoggedin ",isLoggedIn)

// tackling the logout functionality
const LogoutUser=()=>{
    setToken("");
    setUser("")
    localStorage.removeItem("token")
}

// jwt authentication - to get the currently loggedin  user data
const userAuthentication=async (authToken = token)=>{
    if (!authToken) {
      setUser("")
      setIsLoading(false)
      return
    }
    
    try {
        setIsLoading(true)
        const response = await fetch("http://localhost:4000/api/auth/user",{
            method:"GET",
            headers:{
                Authorization: `Bearer ${authToken}`,
            }
        })
        if(response.ok){
            const data=await response.json();
            console.log("user data",data.userData)
            setUser(data.userData)
          
        }else{
            console.error("error fetching user data")
            setUser("")
        }
    }
     catch (error) {
        console.log("Error fetching user data", error)
        setUser("")
    }finally {
    setIsLoading(false); // ✅ always run this after try/catch
  }
}

  // Fetch services data
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/data/services", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Services:", data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    userAuthentication();
  }, [token]);

  // ✅ Send an object with services
  return (
    <AuthContext.Provider value={{ authorizationToken,services,isLoggedIn,LogoutUser,storetokenInLs,user,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
