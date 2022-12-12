import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Loginform from './components/loginform'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      const temp = blogs.sort(function(a,b){return a.likes - b.likes})
      setBlogs(temp)
    }

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

  return (
    <>
    {user === null ? <><h1>log in to application</h1>
    <h1>{message}</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          required = "required"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          required = "required"
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
      <Togglable buttonLabel = "create a new blog">
        <Loginform setMessage = {setMessage} setBlogs = {setBlogs} blogs = {blogs}/>
      </Togglable>
      <br></br>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>}
    </>
  )
}

export default App
