import {Route, Routes, Link} from "react-router-dom"
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import {Home} from "./components/Home/Home"
import {Login} from "./components/Login/Login"
import {Catalogue} from "./components/Catalogue/Catalogue"
import { Create } from "./components/Create/Create";
import {Details} from "./components/Details/Details"
import {Notifications} from "./components/Notifications/Notifications"

function App() {
  return (
    <div>
    <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details" element={<Details />} />
          <Route path="/notifications" element={<Notifications />} />
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
