import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { GlobalMessage } from './entities/globalMessage';
import { GlobalLoading } from './entities/globalLoading';
import { useAppSelector } from './app/store/store';
import { useEffect, useRef, useState } from 'react';
import { LoaderSpinner } from './shared/ui/spinner';
import { LOGIN_ROUTE } from './app/router/routes';
import { userService, useUserActions } from './entities/user';
import { Nav } from './widgets/nav';

function App() {
  const {isLoading: globalIsLoading} = useAppSelector(s => s.globalLoadingReducer)
  const {globalMessage} = useAppSelector(s => s.globalMessageReducer)
  const {user} = useAppSelector(s => s.userReducer)
  const {setIsAuth} = useUserActions()
  const router = useNavigate()

  const isOne = useRef<boolean>(true)
  useEffect(() => {
    if(isOne.current){
      isOne.current = false;
      return
    }
    if(!user.isAuth){
      router(LOGIN_ROUTE.path)
    }
  }, [user.isAuth])

  const [isLoading, setIsLoading] = useState<boolean>(process.env.REACT_APP_USE_AUTH !== "false")

  const auth = async () => {
    try{
      setIsLoading(true)
      await userService.check()
      setIsAuth(true)
    } 
    catch(e){
      router(LOGIN_ROUTE.path) 
      console.log(e)
    }
    finally{
      setTimeout(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    if(process.env.REACT_APP_USE_AUTH === "false"){
      setIsAuth(true)
    }
    else{
      auth()
    }
  }, [])

  return (
    <div className="App">
      {
        isLoading
          ?
        <section className={"loader_main"}><LoaderSpinner /></section>
          :
        <>
          <header className="wrapper_main">
            <Nav />
          </header>
          <Outlet />
          { globalMessage.message && <GlobalMessage /> }
          { globalIsLoading && <GlobalLoading /> }
        </>
      }
    </div>
  );
}

export default App;
