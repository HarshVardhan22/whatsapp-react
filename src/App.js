import './App.css';
import React, {useState} from "react"
import { useParams } from 'react-router';
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/Sidebar/Sidebar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Login from './Components/Login/Login';
import { useStateValue } from './redux/StateProvider';
function App() {
  const[{user},dispatch] = useStateValue();
  return (
    <div className="app">
    {!user?(<Login/>):(<div className="app__body">
     <Router>
     <Sidebar/>
       <Switch>  
         <Route path="/rooms/:roomId">
         <Chat/>
         </Route>
         <Route path ="/" >
         <Chat/>
         </Route>
       </Switch>
     </Router>
     
       
     </div>)}
     
    </div>
  );
}

export default App;
