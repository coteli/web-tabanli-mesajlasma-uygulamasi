//Kullanıcıların uygulamaya girişinin tasarlandığı giriş sayfası bileşenidir.
//Uygulamada kullanıcı bilgisi bulunmuyorsa bu sayfaya yönlendirilir ve Google hesabı ile giriş yapması beklenir.

import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue(); //Google hesabı ile giriş sağlanır ve kullanıcı ataması yapılır. 
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
          <h1>Mesajlaşma</h1>
          <h1>Uygulamasına Giriş</h1>
        </div>
        <Button onClick={signIn}>Google ile Giriş Yap</Button> {/* Kullanıcı butona tıklayarak giriş işlemini başlatır. */}
      </div>
    </div>
  );
}
export default Login;

