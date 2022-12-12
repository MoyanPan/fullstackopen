const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require("../models/blog")
const inintialBlogs = [
    {
    "title": "something",
    "author": "something",
    "url": "asoigfjasiog",
    "likes": 3,
    "id": "631ea916bd612f2b1c66b9a2"
    },
    {
    "title": "how to react",
    "author": "fso",
    "url": "google.com",
    "likes": 5000,
    "id": "63293db3235bc65877102aaa"
    },
    {
    "title": "master of information technology",
    "author": "uoa",
    "url": "google.com",
    "likes": 3200,
    "id": "63293dd5235bc65877102aae"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(inintialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(inintialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(inintialBlogs[2])
    await blogObject.save()
  })

describe('total likes', () => {
    test("all blogs are returned as a json data", async() => {
        await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/)
    },100000)
    
    test("check if the id is defined", async() => {
        const blogs =  await Blog.find({})
        expect(blogs[0]._id).toBeDefined();
    })

    test("test sucessefully posted a data ", async() => {
        await api.post("/api/blogs").send({
            "title":"coded by moyan",
            "author":"moyan",
            "url":"google.com",
            "likes":"2"
        }).expect(201)
        expect({"author":"moyan"}).toBeDefined()
    })

    test("delete a note by id", async() => {
        await api.delete("/api/blogs/uoa").expect(200)
    })

    test("update a blog by title & author", async() => {
        const blog = {
            "title":"something",
            "author":"something",
            "url":"NONE",
            "likes":"-1"
        }
        await api.post("/api/blogs/update").send(blog).expect(200)
    })


    afterAll(() =>{
        mongoose.connection.close()
    })
  })



