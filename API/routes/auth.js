const router=require("express").Router();
const bcrypt=require('bcrypt');

const User=require("../models/User");

//Register
router.post("/register",async(req,res)=>{
     try {

        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpassword,
        })

        const user=await newUser.save();
        res.status(200).json(user);
        
     } catch (error) {
        res.status(500).json(error);
     }
})


//LOGIN

router.post("/login",async(req,res)=>{
    try {
        const user= await User.findOne({
            username:req.body.username
        })
        if (user!=null) {
            const validated =await bcrypt.compare(req.body.password,user.password);
            console.log("validated value ",validated);
            if (!validated) {
                !validated && res.status(400).json("wrong credentials");
            }else{
                const { password, ...others } = user._doc;
                res.status(200).json(others);
            }
        }else{
            !user && res.status(400).json("wrong credentials");
        }
        
        console.log(user);
       

        
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;