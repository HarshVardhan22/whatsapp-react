import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import "./Sidebar.css";
import db from "../../Firebase";
import SidebarChat from "./SidebarChat/SidebarChat";
const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    //since getDocs is fetching from DB we need an async-await system here
    //syntax for async await in useEffect : 
    //(async()=>{..body })()
    (async () => {
      const q = query(collection(db, "rooms"));
      const querySnapshot = await getDocs(q);
      setRooms(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    })();

    // db.collection('rooms').onSnapshot(snapshot=>(
    //   setRooms(snapshot.docs.map(doc=>({
    //     id: doc.id,
    //     data: doc.data(),
    //   })))
    // ))
  }, [rooms]);
  console.log(rooms)
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://avatars.dicebear.com/api/human/1234.svg" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            {" "}
            <Chat />
          </IconButton>
          <IconButton>
            {" "}
            <MoreVert />
          </IconButton>
        </div>
        
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
      <SidebarChat addNewChat/>
      {rooms.map((item) => {
          return <SidebarChat key={item.data.id} name={item.data.name}/>
        })}
      </div>
    </div>
  );
};

export default Sidebar;
 