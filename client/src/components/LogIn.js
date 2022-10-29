import React from 'react'
import Axios from 'axios'
import { UserContext } from '../context/User'

function Login() {

  const emailRef = React.createRef(null)
  const passwordRef = React.createRef(null)
  const [statusText, setStatusText] = React.useState('')

  const handleClick = (e, setUser) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!(email && password)) {
      setStatusText('Invalid email or password')
      return
    }

    Axios.post('http://localhost:4000/user/login', { email, password }).then(resp => {
      if (resp.status !== 200) {
        setStatusText(':( sorry')
        return
      }
      console.log("/login response from axios: ", resp.data)
      setUser(resp.data.user)
    })

  }

  return (
    <UserContext.Consumer >
      {({ setUser }) => {
        return <form>
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" ref={emailRef} />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" ref={passwordRef} />

          <br />
          <button className='button-primary' onClick={(e) => handleClick(e, setUser)}>Log in</button>

          <br />
          <div>{statusText}</div>
        </form>
      }}
    </UserContext.Consumer>
  )
}

export default Login