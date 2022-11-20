const express =require("express");
const app=express();
const mongoose=require("mongoose");
const authenticationRoute=require('./routes/auth');
const  userRoute=require('./routes/users');
const  postRoute=require('./routes/posts');
const catRoutes=require('./routes/categories');
const multer=require('multer');
var cors = require('cors')
const path=require('path');

app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")));

const dotenv=require('dotenv');
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })
    .then(console.log("connected to the database")).catch((err)=>console.log(err));

const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"images")
    },
    filename:(req,file,cd)=>{
        cd(null,req.body.name)
    }
});
const upload=multer({
    storage:storage
});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file Has been uploaded");
})



app.use("/api/auth",authenticationRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",catRoutes);

app.listen("5000",()=>{
    console.log("backend is running on port 5000");
})

