//Kullanıcıların uygulamaya girişinin tasarlandığı giriş sayfası bileşenidir.
//Uygulamada kullanıcı bilgisi bulunmuyorsa bu sayfaya yönlendirilir ve Google hesabı ile giriş yapması beklenir.

import React from "react";
import { Button } from "@material-ui/core";
import { yetki, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

import "./Giris.css";

function Giris() {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue(); //Google hesabı ile giriş sağlanır ve kullanıcı ataması yapılır.
  const signIn = () => {
    yetki //Firebase Google yetkilendirme fonksiyonu
      .signInWithPopup(provider) // Açılır Pencereden giriş yapılmasını sağlayan fonksiyon.
      .then((result) => {
        dispatch({
          //Kullanıcı bilgilerinin bu bileşende set edilmesini sağlar.
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message)); // İşlemin yürütülmesi sırasında hata yakalanırsa, hata mesajı verir.
  };
  return (
    <div className="giris">
      <div className="giris__container">
        <img src="/giris.png" alt="" />
        <div className="giris_text">
          <h1>Mesajlaşma</h1>
          <h1>Uygulamasına Giriş</h1>
        </div>
        <Button onClick={signIn}>Google ile Giriş Yap</Button>{" "}
        {/* Kullanıcı butona tıklayarak giriş işlemini başlatır. */}
      </div>
    </div>
  );
}
export default Giris;
