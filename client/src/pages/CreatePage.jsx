import { useState, useContext } from 'react';
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/authContext';
import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {
  let navigate = useNavigate();

 const auth = useContext(AuthContext)
  const [link, setLink] = useState('')
  const { request } = useHttp()
  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {Authorization: `Bearer ${auth.token}`})
        navigate(`/detail/${data.link._id}`)
      } catch (error) {

      }
    }
  }



  return (
    <div className="row">
      <div className=" col s8 offse-s2 margin5"></div>
      <div className="margin10 input-field ">
        <input value={link} onChange={e => setLink(e.target.value)} placeholder='Write your link' id="link" name='link' type="text" className="validate white-text" onKeyDown={pressHandler} />
      </div>
    </div>
  )
}