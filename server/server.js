require("dotenv").config()
const express=require("express")
const cors=require("cors")
const app=express();
const errorMiddleware=require("./middlwares/error-middleware")
const authRoute=require("./router/auth-router")
const contactRoute=require("./router/contact-router")
const serviceRoute=require("./router/service-router")
const adminRoute=require("./router/admin-router")
const connectDb=require("./utils/db")
const bookingRoute = require("./router/booking-router");

const PORT=4000;

// Set JWT secret if not in environment variables
if (!process.env.JWT_SECRET_KEY) {
    process.env.JWT_SECRET_KEY = "your_super_secret_jwt_key_here_2024";
}

// lets tackle cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, DELETE, POST, PUT, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/form",contactRoute)
app.use("/api/data",serviceRoute)

// booking
app.use("/api/booking", bookingRoute);

// admin route
app.use("/api/admin",adminRoute)
app.use(errorMiddleware)
connectDb().then(()=>{

    app.listen(PORT,()=>{
        console.log("server is running at PORT :", PORT)
    })
})