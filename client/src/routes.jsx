import { Route, Routes} from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = isAuthenticated => {

  if ( isAuthenticated){
    return (
      <Routes>
        <Route path='/links' element={<LinksPage/>}/>   
        
        {/* <Route path='/create' element={<CreatePage/>} />    */}
        <Route path='/*' element={<CreatePage/>} />  
        {/* <Route path="/" element={<Navigate replace to="/" />} />  */}
        
        <Route path='/detail/:id' element={<DetailPage/>} />

      </Routes>
    )
  }
  return (
    <Routes>
      <Route path='/*' element={<AuthPage/>}>
      </Route>
    </Routes>
  )
}