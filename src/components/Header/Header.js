import "./css/navbar.css"
import { Navbar } from "./Navbar/Navbar";

export const Header = (props) => {
    return(
        <>
        <div className="header">
        <h1>My Website</h1>
        <p>Resize the browser window to see the effect.</p>
      </div>
      <Navbar />
      </>
)
}