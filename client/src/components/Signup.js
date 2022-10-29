import React from 'react'
import Axios from 'axios'
import { UserContext } from '../context/User'
import { Link, Route, Routes } from 'react-router-dom'
import LoginTrial from './LoginTrial'
import './form.css'

function Signup() {
    <Routes>
        <Route path="/login" element={<LoginTrial />} />
    </Routes>

    const nameRef = React.createRef(null)
    const emailRef = React.createRef(null)
    const passwordRef = React.createRef(null)
    const cnf_passwordRef = React.createRef(null)
    const [statusText, setStatusText] = React.useState('')
    const [successStatusText, setSuccessStatusText] = React.useState('')

    const signupHandleClick = (e, setUser) => {
        e.preventDefault()
        const full_name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const cnf_password = cnf_passwordRef.current.value
        if (!(full_name)) {
            setStatusText('Please enter name')
            return
        }
        if (!(email)) {
            setStatusText('Please enter email')
            return
        }
        if (!(password)) {
            setStatusText('Please enter password')
            return
        }
        if (!(cnf_password)) {
            setStatusText('Please enter password again')
            return
        }
        if (password !== cnf_password) {
            setStatusText('Passwords should be same')
            return
        }

        Axios.post('http://localhost:4000/user/add', { full_name, email, password }).then(resp => {
            if (resp.status !== 200) {
                setStatusText(':( sorry')
                return
            }
            console.log("/login response from axios: ", resp.data)
            setUser(resp.data.user)
            setSuccessStatusText('User Added Successfully')
        })

    }

    return (
        <UserContext.Consumer >
            {({ setUser }) => {
                return <form className='formContainer'>
                    <label htmlFor="full_name">Full Name: </label>
                    <input type="text" name="full_name" ref={nameRef} />
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" ref={emailRef} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" ref={passwordRef} />
                    <label htmlFor="password">Confirm Password: </label>
                    <input type="password" name="cnf_password" ref={cnf_passwordRef} />
                    

                    <br />
                    <button className='btn' onClick={(e) => signupHandleClick(e, setUser)}>Submit</button>
                    &nbsp;&nbsp;
                    <Link to="/login">
                        <button className='btn'>
                            back to login
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

export default Signup