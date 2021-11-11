import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Candidates from "./components/Candidates";
import JobApplication from "./components/JobApplication";
import AdminLogin from "./components/AdminLogin";
import AdminLogout from "./components/AdminLogout";
import useToken from "./useToken";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

function App() {
  const { setToken } = useToken();

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route
          path="/candidates"
          component={() => <Candidates setToken={setToken} />}
        />

        <Route path="/job/application" component={JobApplication} />

        <Route
          path="/admin/login"
          component={() => <AdminLogin setToken={setToken} />}
        />

        <Route
          path="/admin/logout"
          component={() => <AdminLogout setToken={setToken} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
