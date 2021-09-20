import { Avatar } from '@mui/material'
import React, {useState,useEffect} from 'react'
import "./SidebarChat.css"
const SidebarChat = ({addNewChat}) => {

    //avatars.dicebar API has 2 parameter after /api
    // we have set the first one to HUMAN so that we can have both genders
    // while for the second one we want it to be random so to do that we are using useEffect and the state seed

    const [seed,setSeed] = useState(1234);
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

    //THIS creates new room or chat
    
    const createChat = () => {
        const roomName = prompt("Please enter the room name");
        if(roomName){
            //...do something
        }
    }

    //if addNewChat prop is passed then it will render a div with oPTION
    //TO CREATE A NEW ROOM  
    return !addNewChat?(
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
            <h3>Room Name</h3>
            <p>Last message..</p>
            </div>
           
        </div>
    ):(
        <div onClick={createChat} className="sidebarChat"><h2>Add New Chat</h2></div>
    )
}

export default SidebarChat
