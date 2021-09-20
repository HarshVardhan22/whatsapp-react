import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
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
      <SearchOutlined/>
          <input type="text" placeholder = "Search or start a new chat" />
      </div>
         
      </div>
      <div className="sidebar__chats"></div>
    </div>
  );
};

export default Sidebar;
