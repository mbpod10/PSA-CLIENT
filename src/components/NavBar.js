import React from "react"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <nav>
        <Link to='/'>Home</Link> {"  "}
        <Link to='/login'>Login</Link>
      </nav>
    </>
  )
}

export default Login