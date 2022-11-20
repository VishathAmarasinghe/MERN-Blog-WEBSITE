const router=require("express").Router();
const bcrypt=require("bcrypt");
const User=require("../models/User");
const Post=require("../models/Post");

//create New Post
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body)
   
    try {
        const savedPost= await newPost.save();
        console.log(savedPost);
        res.status(200).json(savedPost);
        
    } catch (error) {
        res.status(500).json("error comming here "+error);
    }
})

//update Post

router.put("/:id",async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
            if (post.username===req.body.username) {
                try {
                    const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body,
                    },{
                        new:true
                    })
                    res.status(200).json(updatedPost);
                } catch (error) {
                    res.status(500).json(error);
                }
            }else{
                res.status(401).json("You can update only your post")
            }
            
        
    } catch (error) {
        res.status(500).json(error);
    }
})
//delete Post

router.delete("/:id",async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
            if (post.username===req.body.username) {
                try {
                    await post.delete();
                    res.status(200).json("post deleted ")
                } catch (error) {
                    res.status(500).json(error);
                }
            }else{
                res.status(401).json("You can delete only your post")
            }
            
        
    } catch (error) {
        res.status(500).json(error);
    }
})
//get post
router.get("/:id", async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get All post
router.get("/", async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try {
        let posts;
        if (username) {
            posts=await Post.find({username})
        }else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts= await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports=router;