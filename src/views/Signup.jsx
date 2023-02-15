import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"

export default function Signup() {

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [errors, setErrors] = useState()
  const {setUsernya, setTokennya} = useStateContext()
  
  function onSubmit(ev) {
    ev.preventDefault()
    

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    }
    console.log(payload)    
    
    axiosClient.post('/signup', payload)
    .then(({data}) => {
      setUsernya(data.user)
      setTokennya(data.token)
    })
    .catch(err => {
      const response = err.response
      if(response && response.status == 422) {
        // console.log(response.data.errors)

        setErrors(response.data.errors)
      }
    })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Signup for a new account
          </h1>
          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>}
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password"/>
          <button className="btn btn-block">Sign Up</button>
          <p className="message">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}