import React from 'react'
import Axios from 'axios'
import { UserContext } from '../context/User'
import { Link } from 'react-router-dom'
import './form.css'

function LoginTrial() {

    const emailRef = React.createRef(null)
    const passwordRef = React.createRef(null)
    const [statusText, setStatusText] = React.useState('')
    const [successStatusText, setSuccessStatusText] = React.useState('')

    const loginHandleClick = (e, setUser) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if (!(email && password)) {
            setStatusText('Invalid email or password')
            return
        }

        Axios.post('http://localhost:4000/user/login', { email, password }).then(resp => {
            console.log(resp);
            if (resp.status !== 200) {
                setStatusText(':( sorry')
                return
            }
            console.log("/login response from axios: ", resp.data)
            setUser(resp.data.user)
            setSuccessStatusText('Logged in Successfully')
        })

    }

    return (
        <UserContext.Consumer >
            {({ setUser }) => {
                return <form className='formContainer'>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" ref={emailRef} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" ref={passwordRef} />

                    <br />
                    <button className='btn' onClick={(e) => loginHandleClick(e, setUser)}>Log in</button>
                    &nbsp;&nbsp;
                    <Link to="/signup">
                        <button className='btn'>
                            sign up
                        </button>
                    </Link>

                    <br />
                    <div style={{ color: "red" }}>{statusText}</div>
                    <div style={{ color: "green" }}>{successStatusText}</div>
                </form>
            }}
        </UserContext.Consumer>
    )
}

export default LoginTrial