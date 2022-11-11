import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const NavBar = () => {
  const history = useNavigate()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history('/')
  }
  return (
    <nav>
    <div className="nav-wrapper green  z-depth-5 ">
      <span  className="brand-logo margin5 ">Logo</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to='links'> Link</NavLink></li>
        <li><NavLink  to='detail'>Detail</NavLink></li>
        <li><button className="margin10 btn" onClick={logoutHandler}>Log Out</button></li>
      </ul>
    </div>
  </nav>
        
  )

}