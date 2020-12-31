import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PageNotFound from "./Components/Routes/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UserContext from "./Components/Context/UserContext";
import Footer from "./Components/Ui/Footer";
import NavBar from "./Components/Ui/NavBar";
import config from "./Components/firebase/config";
import Home from "./Components/Routes/Home";
import Signup from "./Components/Routes/Signup";
import Signin from "./Components/Routes/Signin";
var firebase = require("firebase/app");
require("firebase/auth");

//init firebase
firebase.initializeApp(config);

//toast config
toast.configure({
  autoClose: 2000,
  draggable: true,
});

const App = () => {
  const [user, setUser] = React.useState(null);
  return (
    <Router>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Signin" component={Signin} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact component={PageNotFound} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
