import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="/giris.png"
          alt=""
        />
        <div className="login_text">
          <h1>Mesaj Yaz</h1>
          <h1>Uygulamasına Giriş</h1>
        </div>
        <Button onClick={signIn}>Google ile Giriş Yap</Button>
      </div>
    </div>
  );
}

export default Login;
