export const LoginForm = () => {
    return (
        <>
        <form>
      <input
        type="text"
        id="email"
        className="fadeIn second"
        name="email"
        placeholder="Your email.."
      />
      <input
        type="text"
        id="password"
        className="fadeIn third"
        name="password"
        placeholder="Your password.."
      />
      <input type="submit" className="fadeIn fourth" defaultValue="Log In" value= "Login" />
    </form>
    <div id="formFooter">
      <a className="underlineHover" href="#">
        Forgot Password?
      </a>
    </div>
    </>
    )
}