import React ,{useState} from "react";
import AuthContext from './Context/AuthContext';
import { BrowserRouter as Router, Switch, Route ,  Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import CalendarTodo from './Components/CalendarTodo';


function App() {
  const tokenString = sessionStorage["token"] || localStorage["token"] || null;
  const [isLoggedIn,setIsLoggedIn] = useState(tokenString !=null);
  const [token,setToken] = useState(tokenString);
  const [email,setEmail] = useState(sessionStorage["email"] || localStorage["email"] || null);
  const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem("todos"))?.filter(function (item) {
    return (item.userEmail == email);
  }) || []);

  return (
    <AuthContext.Provider value={{allTodos,setAllTodos,token,setToken,isLoggedIn,setIsLoggedIn,email,setEmail}}>
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Logout">
          <Logout />
        </Route>
        <Route path="/CalendarTodo">
          <CalendarTodo allTodos={allTodos}  />
        </Route>
        <Route path="/">
          {isLoggedIn ? <Home /> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;