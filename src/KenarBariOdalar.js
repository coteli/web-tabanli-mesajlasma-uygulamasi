//Kenar barı bileşeninin alt bileşenidir. Yeni oda ekleme seçeneği ve listelenen odalardan her birini oluşturur.

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import vt from "./firebase";

import "./KenarBariOdalar.css";

function KenarBariOdalar({ yeniOda, id, name }) {
  const [messages, setMessages] = useState("");

  //Sohbet odalarının bilgilerinin veri tabanından çekilmesi
  useEffect(() => {
    if (id) {
      vt.collection("rooms") // Veri tabanındaki rooms kolleksiyonunu seçer
        .doc(id)
        .collection("messages") // Veri tabanındaki messages kolleksiyonunu seçer
        .orderBy("timestamp", "desc") // Veri tabanından alınan bilgileri tarihe göre azalan sıralar
        .onSnapshot((
          snapshot // Veri tabanından gelen mesajları map fonksiyonu ile sıralar
        ) => setMessages(snapshot.docs.map((doc) => doc.data())));
    }
  }, [id]);

  //Yeni oda oluşturma fonksiyonu
  const odaOlustur = () => {
    const roomName = prompt("Yeni oda için bir isim girin...");
    if (roomName) {
      vt.collection("rooms").add({
        // Girilen yeni oda ismini veri tabanına ekler
        name: roomName,
      });
    }
  };

  return !yeniOda ? (
    <Link to={`/rooms/${id}`}>
      {" "}
      {/* Listelenen sohbet odalarına id'lerine göre link tanımlama */}
      <div className="kenarbariodalar">
        {" "}
        {/* Sohbet bilgileri: avatar, isim ve son mesaj */}
        <Avatar src={`http://avatars.dicebear.com/api/bottts/${id}.svg`} />
        {/* Odaların listelenmesi sırasında iyi ve ayırtedici 
        görünmesi için online avatar üreten bir siteden avatar çekilmiştir*/}
        <div className="kenarbariodalar__bilgi">
          <h2>{name}</h2>
          {/* Odanın adı yazdırılır */}
          <p>{messages[0]?.message}</p>
          {/* Gönderilen en son mesaj yazdırılır */}
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={odaOlustur} className="kenarbariodalar">
      <h4>Oda Eklemek İçin Tıklayınız!</h4>
    </div>
  );
}
export default KenarBariOdalar;
