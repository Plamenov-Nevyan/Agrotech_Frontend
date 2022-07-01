export const RegisterForm = (props) => {
    return (<>
    <form>
    <input
    type="text"
    id="username"
    className="fadeIn second"
    name="username"
    placeholder="Your username.."
  />
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
    name="login"
    placeholder="Your password.."
  />
  <input
    type="text"
    id="confirmPass"
    className="fadeIn fourth"
    name="confirm"
    placeholder="Confirm your password.."
  />
  <input type="submit" className="fadeIn fourth" defaultValue="Log In" value="Register"/>
</form>
<div id="formFooter">
  <a className="underlineHover" href="#" onClick={props.loginRedirect}>
    Already have an account?
  </a>
</div>
</>)
}