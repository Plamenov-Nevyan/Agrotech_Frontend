import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import {Home} from "./components/Home/Home"
import {Login} from "./components/Login/Login"
import {Catalogue} from "./components/Catalogue/Catalogue"
function App() {
  return (
    <div>
      <Header />
     <Home />
     <Login />
     <Catalogue />
     <Footer />
    </div>
  );
}

export default App;
