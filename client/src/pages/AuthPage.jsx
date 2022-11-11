import { useEffect, useState } from 'react'
import './style.css'
import { useHttp } from './../hooks/http.hook';
import { useMessage } from './../hooks/messageHook';
import { useContext } from 'react';
import { AuthContext } from './../context/authContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({email:'', password: ''})
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  useEffect(() => {
    message(error)
    clearError()
  
  }, [error, message, clearError])
  

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (error) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (error) {}
  }
  return (
    
    <div className="row">
      <div className="col s6 offset-s3  ">
        <h1 > </h1>
      <div style={{marginTop: '120px'}} className="card green lighten- opacity5 z-depth-5 ">
        <div className="card-content white-text">
          <span className="card-title">Autorization</span>
        </div>
        
        <div className="margin10 input-field lighten-1  ">
          <input style={{background: '#fff', borderRadius: '6px', paddingLeft: '2px'}} value={form.email} onChange={changeHandler} placeholder='Email' id="email" name='email' type="email" className="validate white-text"/>
        </div>
        <div className="margin10 input-field lighten-1 ">
          <input style={{background: '#fff', borderRadius: '6px', paddingLeft: '2px', margin: "0px auto"}} value={form.password} onChange={changeHandler} placeholder='password' id="password" name='password' type="password" className="validate white-text"/>
        </div>
        
        <div className="card-action ">
    <button  onClick={loginHandler} className="margin5 btn yellow darken-4 "> LOG iN</button>
    <button onClick={registerHandler} disabled={loading} className="margin5 btn grey lighten-1 black-text "> Registration</button>
        </div>
      </div>
      </div>
    </div>
  )
}