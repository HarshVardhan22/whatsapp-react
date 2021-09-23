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

  const fetchFromFirebase = async () => {
    const q = query(collection(db, "rooms"));
    const querySnapshot = await getDocs(q);
    setRooms(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  } 
  useEffect(() => {
    fetchFromFirebase();
    console.log("hi")
  }, []);

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
          return <SidebarChat id ={item.id} key={item.id} name={item.data.name}/>
        })}
      </div>
    </div>
  );
};

export default Sidebar;
 