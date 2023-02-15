import { Link } from "react-router-dom"

export default function Signup() {

  const onSubmit = (ev) => {
    ev.preventDefault()
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Signup for a new account
          </h1>
          <input type="text" placeholder="Full Name"/>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <input type="password" placeholder="Confirm Password"/>
          <button className="btn btn-block">Sign Up</button>
          <p className="message">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}