//Kenar barı bileşeninin alt bileşenidir. Yeni oda ekleme seçeneği ve listelenen odalardan her birini oluşturur.

import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState("");

  //Sohbet odalarının bilgilerinin veri tabanından çekilmesi
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  //Yeni oda oluşturma fonksiyonu
  const createChat = () => {
    const roomName = prompt("Yeni oda için bir isim girin...");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}> {/* Listelenen sohbet odalarına id'lerine göre link tanımlama */}
      <div className="sidebarChat"> {/* Sohbet bilgileri: avatar, isim ve son mesaj */}
        <Avatar src={`http://avatars.dicebear.com/api/bottts/${id}.svg`}/> 
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p> 
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">     
      <h4>Oda Eklemek İçin Tıklayınız!</h4>
    </div>
  );
}
export default SidebarChat;

