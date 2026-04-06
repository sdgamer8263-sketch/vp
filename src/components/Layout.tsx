import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div
      className="flex h-screen overflow-hidden font-sans text-white bg-gray-900"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay to darken the background slightly */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      <div className="relative z-10 flex w-full h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
