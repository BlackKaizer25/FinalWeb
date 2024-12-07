import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ManageUsers from "./components/ManageUser";
import Evaluation from "./components/Evaluation";
import Accounts from "./components/Accounts";
import Analytics from "./components/Analytics";
import Layout from "./components/Layout"; // Import the Layout component.
import Settings from "./components/Settings";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login (No Sidebar) */}
        <Route path="/" element={<Login />} />

        {/* Routes with Sidebar */}
        <Route
          path="/manage-users"
          element={
            <Layout>
              <ManageUsers />
            </Layout>
          }
          
        />
        <Route
          path="/evaluation"
          element={
            <Layout>
              <Evaluation />
            </Layout>
          }
        />
        <Route
          path="/accounts"
          element={
            <Layout>
              <Accounts />
            </Layout>
          }
        />
        {/* Route for Analytics */}
        <Route
          path="/analytics"
          element={
            <Layout>
              <Analytics /> {/* Render the Analytics component here */}
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings /> {/* Render the Analytics component here */}
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home /> {/* Render the Analytics component here */}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
