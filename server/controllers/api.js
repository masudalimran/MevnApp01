const postModel = require('../models/posts')
const fs = require('fs')

module.exports = class API {
    //fetch all methods
    static async fetchAllPosts(req, res){
        try {
           const posts = await postModel.find() 
           res.status(200).json(posts)
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
    //fetch posts by ID
    static async fetchPostById(req, res){
        const ID = req.params.postId
        try {
           const singlePost  =  await postModel.findById(ID)
           res.status(200).json(singlePost)
        } catch (error) {
            res.status(404).json({message: error.message})
        } 
    }
    //create a post
    static async createPost(req, res){
        const post = req.body
        const imgName = req.file.filename 
        post.image = imgName
        try {
           await postModel.create(post)
           res.status(201).json({message: 'Post Created Successfully'}) 
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    //Update post
    static async updatePost(req, res){
        const ID = req.params.postId
        let newImage = ''
        if(req.file){
            newImage = req.file.filename
            try {
              fs.unlinkSync('./uploads/img/'+req.body.oldImage)  
            } catch (error) {
                console.log(error);
            }
        }else{
            newImage = req.body.oldImage
        }
        const newPost = req.body
        newPost.image = newImage
        try {
           await postModel.findByIdAndUpdate(ID, newPost)
           res.status(200).json({message: "Post Updated Successfully"}) 
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
    //Delete post
    static async deletePost(req, res){
        const ID = req.params.postId
        try {
           const result = await postModel.findByIdAndDelete(ID)
           if(result.image != ''){
               try {
                  fs.unlinkSync('./uploads/img/'+result.image)
               } catch (error) {
                  console.log(error); 
               }
           } 
           res.status(200).json({message: "Post Deleted Successfully"})
        } catch (error) {
            res.status(404).json(error.message)
        } 
    }
}
