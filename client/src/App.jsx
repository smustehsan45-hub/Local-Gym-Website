 import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/Home";
import {Service} from "./pages/Service"
import {Contact} from "./pages/Contact"
import {Register} from "./pages/Register"
import {Login} from "./pages/Login"
import {Booking} from "./pages/Booking"
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/Layouts/Admin-Layout";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminBookings } from "./pages/Admin-Booking";
 
 const App=()=>{
return(
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/booking" element={<Booking/>} />
    <Route path="/service" element={<Service/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/logout" element={<Logout/>} />

      <Route path="/admin" element={<AdminLayout />}>
       <Route path="users" element={<AdminUsers />} />
     <Route path="users/:id/edit" element={<AdminUpdate />} />  
    <Route path="contacts" element={<AdminContacts />} />
    <Route path="bookings" element={<AdminBookings />} />
    </Route>
  </Routes>
  <Footer />
  </BrowserRouter>
)
}

export default App;