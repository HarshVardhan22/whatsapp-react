import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  Timestamp,
  getDocs
} from "firebase/firestore";
import db from "../../../Firebase";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

const SidebarChat = ({ fetchRoomsFromFirebase, addNewChat, name, id }) => {
  //avatars.dicebar API has 2 parameter after /api
  // we have set the first one to HUMAN so that we can have both genders
  // while for the second one we want it to be random so to do that we are using useEffect and the state seed
  const [messages, setMessages] = useState([]);
  const [seed, setSeed] = useState(1234);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    fetchMessagesFromFirebase();
    console.log("object")
  }, [id]);

  const fetchMessagesFromFirebase = async () => {
    setMessages([]);
    const q = query(
      collection(db, "rooms", `${id}`, "messages"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      setMessages((prevState) => [...prevState, doc.data()]);
    });
  };
  //* update/fetch msg-> read the last one -> show it


  //THIS creates new room or chat
  const createChat = async () => {
    const roomName = prompt("Please enter the room name");
    if (roomName) {
      //if the user enters a room name then we add that room to the firebase DB
      const docRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
        createdAt: Timestamp.now(),
      });
      fetchRoomsFromFirebase();
    }
  };

  //if addNewChat prop is passed then it will render a div with oPTION
  //TO CREATE A NEW ROOM
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h3>{name}</h3>
          {messages[0]?<p>{messages[0].message}</p>:<p>Start a conversation!</p>}
          
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
