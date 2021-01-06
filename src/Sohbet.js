//Sohbet alanını oluşturan bileşendir.

import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { InsertEmoticon, MoreVert } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import vt from "./firebase";
import firebase from "firebase";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Sohbet.css";

function Sohbet() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  //Sohbet odası adı ve mesajları veri tabanından çeker
  useEffect(() => {
    if (roomId) {
      vt.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      vt.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  //Mesaj gönderme fonksiyonu
  const mesajGonder = (e) => {
    e.preventDefault();

    vt.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="sohbet">
      <div className="sohbet__bas">
        <Avatar src={`http://avatars.dicebear.com/api/bottts/${roomId}.svg`} />
        <div className="sohbet__basbilgi">
          <h3>{roomName}</h3>
          <p>
            Son mesaj zamanı:{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString()}
          </p>
        </div>
        <div className="sohbet__bassag">
          <MoreVert />
        </div>
      </div>
      <ScrollToBottom className="sohbet__govde">
        {" "}
        <div>
          {/*Mesajları listeler */}
          {messages.map((message) => (
            <p
              className={`sohbet__mesaj ${
                message.name === user.displayName && "sohbet__sahip" //Oturum sahibi ile diğer kullanıcıların gönderdiği mesajların
                //ayrı biçimlerde listelenmesini sağlar
              }`}
            >
              <span className="sohbet__isim">
                {message.name}
                {/* mesaj gönderenin ismini yazdırır */}
              </span>
              {message.message}
              {/* Gönderilen mesajı yazdırır */}
              <span className="sohbet__zaman">
                {new Date(message.timestamp?.toDate()).toLocaleString()}
                {/* Gönderilen mesajın tarih ve saatini yazdırır */}
              </span>
            </p>
          ))}
        </div>
      </ScrollToBottom>
      <div className="sohbet__alt">
        <InsertEmoticon />
        <form>
          {" "}
          {/* Mesaj yazma alanı */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            type="text"
          />
          <button onClick={mesajGonder} type="submit">
            Mesajı Gönder!
          </button>
        </form>
      </div>
    </div>
  );
}
export default Sohbet;
