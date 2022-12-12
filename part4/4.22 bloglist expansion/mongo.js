const mongoose = require('mongoose')
  
const mongoUrl = `mongodb+srv://moyanpan:${process.env.password}@freestackopen.c4vqjau.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)

Blog.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})




