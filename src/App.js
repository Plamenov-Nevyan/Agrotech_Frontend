import { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom"
import { authContext } from "./contexts/authContext";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import {Home} from "./components/Home/Home"
import {Login} from "./components/Login/Login"
import {Catalogue} from "./components/Catalogue/Catalogue"
import { Create } from "./components/Create/Create";
import {Details} from "./components/Details/Details"
import {Notifications} from "./components/Notifications/Notifications"
import { MyProfile } from "./components/Profile/MyProfile/MyProfile";


function App() {
  const [storedBrowserData, setToStorage, clearFromStorage] = useSessionStorage()

  const [authData, setAuthData] = useState(storedBrowserData.session)
 
  const onUserSignUp_SignIn = (userData) => setToStorage('session', userData)
  const onUserLogout = () => clearFromStorage('session')

  useEffect(() => {
    setAuthData(oldData => {return storedBrowserData.session !== null ? {...storedBrowserData.session} : null})
  }, [storedBrowserData])

  return (
    <authContext.Provider value={{onUserSignUp_SignIn,authData, onUserLogout}}>
    <div>
    <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/create" element={<Create />} />
          <Route path="/catalogue/details/:publicationId" element={<Details />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
     <Footer />
    </div>
    </authContext.Provider>
  );
}

export default App;
