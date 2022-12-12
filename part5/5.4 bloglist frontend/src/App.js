import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from "./components/Login"
import loginService from "./services/login"


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState([[],[],[]])
  const [message, setMessage] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        "loggedNoteappUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage("wrong username or password")
      console.log(exception)
    }
  }

  const handleBlogPost = async(event) => {
    event.preventDefault();
    const blogObject = {
      title : blog[0],
      author: blog[1],
      url:blog[2],
      likes:0
    }
    blogService.create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
    setMessage(`a new blog ${blog[0]}! by ${blog[1]} added`)
    setBlog([[],[],[]])
  }
  
  const handleBlogChange = (number,event) => {
    let copy = [...blog];
    copy[number] = event.target.value;
    setBlog(copy);
  }

  return (
    <>
    {user === null ? <><h1>log in to application</h1>
    <h1>{message}</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form></> :     
    <div>
    <h2>blogs</h2>
    <h1>{message}</h1>
    <h3>{user.name} logged in <button onClick={() => {
      window.localStorage.clear();
      window.location.reload();
      }}
    >
      log out
      </button></h3>
      <div>
      <h3>create new</h3>
      <form onSubmit={handleBlogPost}>
      <div>
        title:
          <input
          type="text"
          name="title"
          value = {blog[0]}
          onChange={(event) => handleBlogChange(0,event)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          name="author"
          value = {blog[1]}
          onChange={(event) => handleBlogChange(1,event)}
        />
        </div>
        <div>
        url
          <input
          type="text"
          name="url"
          value = {blog[2]}
          onChange={(event) => handleBlogChange(2,event)}
        />
      </div>
      <button type="submit">login</button>
    </form>
      </div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>}
    </>
  )
}

export default App
