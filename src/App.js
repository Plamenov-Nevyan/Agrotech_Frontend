import { socket, SocketContext } from "./contexts/socketContext";
import { useState, useEffect } from "react";
import { useSessionStorage} from "./hooks/useSessionStorage";
import {useShoppingCart} from "./hooks/useShoppingCart"
import {Route, Routes} from "react-router-dom"
import { authContext } from "./contexts/authContext";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import {Home} from "./components/Home/Home"
import {Login} from "./components/Login/Login"
import {Catalogue} from "./components/Catalogue/Catalogue"
import { Create} from "./components/Create_Edit/Create";
import { Edit} from "./components/Create_Edit/Edit";
import {Details} from "./components/Details/Details"
import {AllNotifications} from "./components/AllNotifications/AllNotifications"
import { MyProfile } from "./components/Profile/MyProfile/MyProfile";
import { Chat } from "./components/Chat/Chat";



function App() {
  const [storedBrowserData, setToStorage, clearFromStorage] = useSessionStorage()
  const [items, createCart, addToCart, removeFromCart] = useShoppingCart()
 
  const [authData, setAuthData] = useState(storedBrowserData.session)

  const onUserSignUp_SignIn = (userData) => {
    setToStorage('session', userData)
    createCart()
  }
  const onUserLogout = () => clearFromStorage('session')

  useEffect(() => {
    setAuthData(oldData => {return storedBrowserData.session !== null ? {...storedBrowserData.session} : null})
  }, [storedBrowserData])

  return (
    <authContext.Provider value={{onUserSignUp_SignIn,authData, onUserLogout}}>
    <div>
    <SocketContext.Provider value={{socket}}>
    <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:publicationId" element={<Edit />} />
          <Route path="/catalogue/details/:publicationId" element={<Details />} />
          <Route path="/notifications/see-all/:userId" element={<AllNotifications />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/all-messages" element={<Chat />} />
      </Routes>
     <Footer />
     </SocketContext.Provider>
    </div>
    </authContext.Provider>
  );
}

export default App;
