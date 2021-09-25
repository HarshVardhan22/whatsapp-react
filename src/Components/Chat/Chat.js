import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import {
  collection,
  addDoc,
  query,
  orderBy,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import db from "../../Firebase";
import "./Chat.css";

import { useStateValue } from "../../redux/StateProvider";

const Chat = () => {
  //! we are using random seed to fill the avatar but it should be the same seed which
  //! chat room was clicked had to work on this
  //avatars.dicebar API has 2 parameter after /api
  // we have set the first one to HUMAN so that we can have both genders
  // while for the second one we want it to be random so to do that we are using useEffect and the state seed
  const [inputMsg, setInputMsg] = useState("");
  const [seed, setSeed] = useState(1234);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  const messageAtEnd= useRef(null);

  const scrollToBottom = () => {
    messageAtEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    const docRef = await addDoc(
      collection(db, "rooms", `${roomId}`, "messages"),
      {
        message: inputMsg,
        name: user.displayName,
        timestamp: new Date().toLocaleString(),
        createdAt: Timestamp.now(),
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setInputMsg("");
    fetchRoomFromFirebase();
    fetchMessagesFromFirebase();
   
  };

  const fetchRoomFromFirebase = async () => {
   
    const q = query(collection(db, "rooms"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      if (doc.id === `${roomId}`) setRoomName(doc.data().name);
    });
  };
  const fetchMessagesFromFirebase = async () => {
   
    setMessages([]);
    const q = query(
      collection(db, "rooms", `${roomId}`, "messages"),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);
  
    
    // querySnapshot.docs.map((doc) => {
    //   setMessages((prevState) => [...prevState, doc.data()]);
    // });

    //* to improve the performance isntaed of updating the state multiple times
    //* storing the data in array and then pushing it to the state 
    let tempMessageArray = [];
    querySnapshot.docs.map((doc) => tempMessageArray.push(doc.data()))
    setMessages(tempMessageArray);
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
  },[]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          ></Avatar>
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            {messages[messages.length - 1]?.timestamp ? (
              <p>Last active at {messages[messages.length - 1]?.timestamp} </p>
            ) : (
              <p>No activity yet! </p>
            )}
          </div>
        </div>
        <div className="chat__headerRight">
          {/* <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton> */}
          <h3>{}</h3>
        </div>
      </div>
      <div className="chat__body">
        {/* messages */}
        {messages?.map((msgs, index) => (
          <p key={index} className={`chat__message ${msgs.name === user.displayName && "chat__reciever"}`}>
            <span className="chat__name">{msgs.name}</span>
            {msgs.message}
            <span className="chat__time">{msgs.timestamp}</span>
          </p>
        ))}
      </div>
      <div ref={messageAtEnd}></div>
      
      <div className="chat__footer" >
        {/* <InsertEmoticon /> */}
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
