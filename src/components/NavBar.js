import React from "react"
import { Link } from "react-router-dom"
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie'



const Navbar = () => {
  const [token, setToken, deleteToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);

  const logout = (event) => {
    console.log('Logout')
    deleteToken(['psa-token'])
    deleteToken(['psa-name'])
  }


  return (
    <>
      <nav>
        <div>
          {ResponseUsername['psa-name'] ? ResponseUsername['psa-name'] : null}
        </div>
        <div>
          <Link to='/'>Home</Link> {"  "}
          {!ResponseUsername['psa-name'] ? <Link to='/login'>Login</Link> : null}{"  "}
          <Link to='/schedule'>Schedule</Link> {"  "}
        </div>
        <div>
          {ResponseUsername['psa-name'] ?
            <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
            : null}
        </div>
      </nav>
    </>
  )
}

export default Navbar