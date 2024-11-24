import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ManageUsers from "./components/ManageUser";
import Evaluation from "./components/Evaluation";
import Accounts from "./components/Accounts";
import Layout from "./components/Layout"; // Import the Layout component.

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
      </Routes>
    </Router>
  );
}

export default App;
