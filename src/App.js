import './App.css';
import { useParams } from 'react-router';
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/Sidebar/Sidebar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
function App() {
  return (
    <div className="app">
     <div className="app__body">
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
     
       
     </div>
    </div>
  );
}

export default App;
