import React, { useState, useEffect } from "react"
import axios from "axios"
import { useCookies } from 'react-cookie'
import moment from "moment";

const VerifyName = () => {
  const [token, setToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);
  const [ResponseID, setResponseID] = useCookies(['psa-id']);
  const [name, setName] = useCookies(['psa-full_name'])

  const [full_name, setFullName] = useState('')
  const [userID, setUserId] = useState(null)

  useEffect(() => {
    if (name['psa-full_name']) window.location.href = '/schedule';
  }, [name])

  const postName = () => {
    axios.post(`http://127.0.0.1:8000/clients/new_client/`,
      {
        user_id: `${token['psa-id']}`,
        full_name: full_name
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token['psa-token']}`
        }
      })
      .then((response) => {
        console.log(response.data)
        setName('psa-full_name', response.data.client.full_name)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>  Last One! Just Verify Your Name </h1>
        </header>
        <div className="login-container">
          <label htmlFor="full_name">Please Enter Full Name</label><br />
          <input id="full_name" type="text" placeholder="Full Name" value={full_name}
            onChange={evt => setFullName(evt.target.value)} />
          <button onClick={postName}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default VerifyName