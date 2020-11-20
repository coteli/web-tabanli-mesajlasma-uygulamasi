//Uygulamanın ana ekranındaki ana bileşenlerden olan kenar barı bileşenidir.

import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db, { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Sidebar() {
  const [rooms, setRooms] = useState([]);  
  const [{ user }, dispatch ] = useStateValue();

  //Sohbet odalarının veri tabanındaki id'lerine göre listelenmesi
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe()
    }
  }, []);

  //Uygulamadan çıkış fonksiyonu
  const signOut = () => {
    auth.signOut().then((result) => {
      dispatch({
        type: actionTypes.DELETE_USER,
        user: null,
      });
    })
    .catch((error) => alert(error.message));
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header"> {/* Kullanıcı bilgilerinin gösterildiği bölüm */}
        <Avatar src={user?.photoURL}/> 
        <span>{user.displayName}</span> 
        <div className="sidebar__headerRight">        
          <IconButton title="Çıkış" onClick={signOut}> {/* Uygulamadan çıkış butonu */}
            <ExitToApp/>
          </IconButton>       
        </div>
      </div>
      <div className="sidebar__chats"> {/* Sohbet odalarının listelendiği bölüm */}
        <SidebarChat addNewChat />
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}
export default Sidebar;

