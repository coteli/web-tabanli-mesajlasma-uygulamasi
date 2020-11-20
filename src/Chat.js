//Sohbet alanını oluşturan bileşendir.

import { Avatar } from "@material-ui/core";
import { InsertEmoticon, MoreVert } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  //Sohbet odası adı ve mesajları veri tabanından çeker
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  //Mesaj gönderme fonksiyonu
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`http://avatars.dicebear.com/api/bottts/${roomId}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Son mesaj zamanı:{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <MoreVert />
        </div>
      </div>
      <ScrollToBottom className="chat__body"> {/*Mesajları listeler */}
        <div>
          {messages.map((message) => (
            <p
              className={`chat__message ${
                message.name === user.displayName && "chat__reciever"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toLocaleString()}
              </span>
            </p>
          ))}
        </div>
      </ScrollToBottom>
      <div className="chat__footer">
        <InsertEmoticon />
        <form> {/* Mesaj yazma alanı */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Mesajı Gönder!
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
