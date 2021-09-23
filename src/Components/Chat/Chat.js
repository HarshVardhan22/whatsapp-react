import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Chat.css";
const Chat = () => {
  //!we are uisng random seed to fill the avatar but it should be the same seed which
  //! chat room was clicked had to work on this
  //avatars.dicebar API has 2 parameter after /api
  // we have set the first one to HUMAN so that we can have both genders
  // while for the second one we want it to be random so to do that we are using useEffect and the state seed
const [inputMsg,setInputMsg] = useState("")
  const [seed, setSeed] = useState(1234);
  
  const {roomId} = useParams();

  const handleSubmit = (e) => {
      e.preventDefault();
      setInputMsg("");
  }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
          <div className="chat__headerInfo">
            <h3>Room Name</h3>
            <p>Last seen at.. </p>
          </div>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
      {/* messages */}
          <p className="chat__message">
          <span className="chat__name">Name</span>Message bodyddddddddddddddddddddddddddddddddddd <span className="chat__time">03:52</span></p>
          <p className="chat__message">
          <span className="chat__name">Name</span>Message body <span className="chat__time">03:52</span></p>
          <p className="chat__message">
          <span className="chat__name">Name</span>Message body <span className="chat__time">03:52</span></p>
      </div>
      <div className="chat__footer">
          <InsertEmoticon/>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Type a message" value={inputMsg} onChange={(e)=>{setInputMsg(e.target.value)}} />
              {/* <button type="submit">Send a message</button> */}
          </form>
      </div>
    </div>
  );
};

export default Chat;
