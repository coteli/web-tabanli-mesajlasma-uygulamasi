//Uygulamanın ana ekranındaki ana bileşenlerden olan kenar barı bileşenidir.

import React, { useState, useEffect } from "react";
import { ExitToApp } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import KenarBariOdalar from "./KenarBariOdalar";
import vt, { yetki } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

import "./KenarBari.css";

function KenarBari() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  //Sohbet odalarının veri tabanındaki id'lerine göre listelenmesi
  useEffect(() => {
    const unsubscribe = vt.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = () => {
    //Uygulamadan çıkış fonksiyonu
    yetki
      .signOut() //Google yetkilendirme işlemini sonlandırır
      .then((result) => {
        dispatch({
          //Bileşende set edilmiş olan kullanıcıyı siler
          type: actionTypes.DELETE_USER,
          user: null,
        });
      }) // Çıkış işlemi sırasında hata yakalanırsa, hata mesajı verir.
      .catch((error) => alert(error.message));
  };

  return (
    <div className="kenarbari">
      <div className="kenarbari__bas">
        {" "}
        {/* Kullanıcı bilgilerinin gösterildiği bölüm */}
        <Avatar src={user?.photoURL} />
        <span>{user.displayName}</span>
        <div className="kenarbari__bassag">
          <IconButton title="Çıkış" onClick={signOut}>
            {" "}
            {/* Uygulamadan çıkış butonu */}
            <ExitToApp />
          </IconButton>
        </div>
      </div>
      <div className="kenarbari__odalar">
        {" "}
        <KenarBariOdalar yeniOda /> {/* Sohbet odalarının listelendiği bölüm */}
        {rooms.map((room) => (
          <KenarBariOdalar name={room.data.name} key={room.id} id={room.id} />
        ))}
      </div>
    </div>
  );
}
export default KenarBari;
