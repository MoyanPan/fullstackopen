import { useState, useEffect} from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"


const Login = (res) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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
          res.setLogin(true)
        } catch (exception) {
          console.log(exception)
        }
      }
    return(
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
    </form>
    
    )
}

export default Login
