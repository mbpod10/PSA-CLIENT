import React from "react"
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie'


const Schedule = () => {
  const [token, setToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);

  return (
    <>
      <h1>Schedule</h1>
    </>
  )
}

export default Schedule