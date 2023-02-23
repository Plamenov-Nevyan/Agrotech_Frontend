import styles from "./css/footer.module.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { authContext } from "../../contexts/authContext";
import { sendEmail } from "../../services/messageServices";
import { SmallLoadingSpinner } from "../SmallLoadingSpinner/SmallLoadingSpinner";
import { ErrorAlert } from "../Alerts/Error";
import { SuccessAlert } from "../Alerts/Success";

export const Footer = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    subject: "",
    content: "",
  });
  const [alertStates, setAlertStates] = useState({
    errors: [],
    success: "",
  });
  const [showSpinner, setShowSpinner] = useState(false);

  const { _, authData, __ } = useContext(authContext);

  const onChangeHandler = (e) => {
    setInputValues((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (event, sender, subject, content) => {
    event.preventDefault();
    console.log(`aa`)
    // if (sender && subject && content) {
    //   setShowSpinner(true);
    //   sendEmail(sender, subject, content)
    //     .then(() => {
    //       setInputValues((oldValues) => {
    //         return {
    //           email: "",
    //           subject: "",
    //           content: "",
    //         };
    //       });
    //       setShowSpinner(false);
    //       window.scrollTo({ top: 0, behavior: "smooth" });
    //       setAlertStates((oldStates) => {
    //         return {
    //           errors: [],
    //           success:
    //             "Email was sent successfully, we will reply as soon as possible !",
    //         };
    //       });
    //     })
    //     .catch((err) => {
    //       setShowSpinner(false);
    //       window.scrollTo({ top: 0, behavior: "smooth" });
    //       setAlertStates((oldStates) => {
    //         return {
    //           errors: [...oldStates.errors, err.message],
    //           success: "",
    //         };
    //       });
    //     });
    // }
  };

  const setEmailOnClick = () => {
    if (authData) {
      setInputValues((oldValues) => {
        return { ...oldValues, email: authData.email };
      });
    }
  };

  return (
    <>
      {alertStates.errors.length > 0 && (
        <ErrorAlert errors={alertStates.errors} />
      )}
      {alertStates.success && <SuccessAlert message={alertStates.success} />}
      {showSpinner && <SmallLoadingSpinner />}
      <footer className={styles["footer-distributed"]}>
        <div className={styles["footer-left"]}>
          <h3>
            Agro<span>Tech</span>
          </h3>
          <p className={styles["footer-links"]}>
            <Link to={"/"}>Home</Link>·<Link to={"/about"}>About</Link>·
            <Link to={"/faq"}>FAQ</Link>
          </p>
          <p className={styles["footer-company-name"]}>
            Agro-Tech Market © 2015
          </p>
          <div className={styles["footer-icons"]}>
            <a href="https://facebook.com" target="_blank">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://instagram.com" target="_blank">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className={styles["footer-right"]}>
          <p>Contact Us</p>
          <form onSubmit={(event) => onSubmitHandler(
                    event,
                    authData.email || inputValues.email,
                    inputValues.subject,
                    inputValues.content
                  )
                }
          >
            <input
              type="text"
              name="email"
              placeholder="Your email adress..."
              value={inputValues.email}
              onChange={(e) => onChangeHandler(e)}
              onClick={() => setEmailOnClick()}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject..."
              value={inputValues.subject}
              onChange={(e) => onChangeHandler(e)}
            />
            <textarea
              name="content"
              placeholder="Message..."
              value={inputValues.content}
              onChange={(e) => onChangeHandler(e)}
            />
            <button className={styles.send_btn}>
              Send
            </button>
          </form>
        </div>
      </footer>
    </>
  );
};
