
import './App.css';
import { useRoutes } from './routes';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './context/authContext';

import 'materialize-css';
import { NavBar } from './components/navBar';
import { Loader } from './components/Loader';

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready) {
    return <Loader/>
  }
  return (
    <div className='background'>
      
    <AuthContext.Provider  value={{token, login, logout, userId, isAuthenticated}}>
      {isAuthenticated && <NavBar/>}
    <div className="container"> 
     {routes}
    </div>
    </AuthContext.Provider>

    </div>

  )
}

export default App;
