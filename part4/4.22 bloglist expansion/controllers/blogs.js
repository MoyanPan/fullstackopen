const blogsRouter = require("express").Router()
const { response } = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


blogsRouter.get('/', async (request, response) => {
    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    //   })
    const blogs = await Blog.find({}).populate('user',('user',{username:1,name:1,id:1}))
    response.json(blogs)
  })
  
blogsRouter.post('/', async(request, response) => {
  const body = request.body
  const user = await User.findById(request.decodedToken.id)
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
    user:request.founduser._id
  })
  const savedBlog = await blog.save()
  request.founduser.blogs = request.founduser.blogs.concat(savedBlog._id)
  await request.founduser.save()
  response.json(savedBlog)

  })

blogsRouter.delete("/:id", async(request,response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    if( request.founduser.id.toString() === blog.user.toString()){
      Blog.deleteOne(blog).then(deletedBlog => {
        response.json(deletedBlog)
        response.status(200)
      })
    }else{
      response.status(401).json({error:"you dont have permission to delete this blog!"})
    }
  }else{
    response.status(401).json({error:"blog doesnt exist."})
  }

})


blogsRouter.post("/update",(req,res) =>{
  let blog = req.body
  Blog.findOneAndUpdate({title:blog.title,author:blog.author},{$set:{url:blog.url,likes:blog.likes}}).then(result =>{
    res.status(200).json(result).end()
  }
  ).catch(error => {console.log(error)})
})


  module.exports = blogsRouter