import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { ServerView } from "./pages/ServerView";
import { Tickets } from "./pages/Tickets";
import { Users } from "./pages/Users";
import { Admin } from "./pages/Admin";
import { PterodactylAdmin } from "./pages/PterodactylAdmin";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="server/:id/*" element={<ServerView />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="users" element={<Users />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/pterodactyl" element={<PterodactylAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
