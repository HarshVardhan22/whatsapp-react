import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { collection, query, doc, getDocs } from "firebase/firestore";
import db from "../../Firebase";
import "./Chat.css";

const Chat = () => {
  //!we are using random seed to fill the avatar but it should be the same seed which
  //! chat room was clicked had to work on this
  //avatars.dicebar API has 2 parameter after /api
  // we have set the first one to HUMAN so that we can have both genders
  // while for the second one we want it to be random so to do that we are using useEffect and the state seed
  const [inputMsg, setInputMsg] = useState("");
  const [seed, setSeed] = useState(1234);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputMsg("");
  };

  const fetchRoomFromFirebase = async () => {
    const q = query(collection(db, "rooms"));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      if (doc.id === `${roomId}`) setRoomName(doc.data().name);
    });
  };
  const fetchMessagesFromFirebase = async () => {
    const q = query(collection(db, "rooms", `${roomId}`, "messages"));
    const querySnapshot = await getDocs(q);
    (querySnapshot.docs.map((doc) => {
      setMessages((prevState)=>[...prevState,doc.data()])
    }))
  };

  useEffect(() => {
    if (roomId) {
      //fetch the data from room Id and select the room name -> setRoomName(room namefound)
      fetchRoomFromFirebase();
      fetchMessagesFromFirebase();
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  console.log(messages);
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          ></Avatar>
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
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
        {messages?.map((msgs,index) => (
          <p key={index} className="chat__message">
          <span className="chat__name">{msgs.name}</span>{msgs.message}
          <span className="chat__time">{new Date(msgs.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
      </div>
     
      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={inputMsg}
            onChange={(e) => {
              setInputMsg(e.target.value);
            }}
          />
          
        </form>
      </div>
    </div>
  );
};

export default Chat;
