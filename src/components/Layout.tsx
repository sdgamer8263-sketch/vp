import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const Layout = () => {
  const { theme } = useAppContext();

  useEffect(() => {
    if (theme.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = theme.faviconUrl;
    }
  }, [theme.faviconUrl]);

  return (
    <div
      className="flex h-screen overflow-hidden font-sans text-white bg-gray-900"
      style={{
        backgroundImage: theme.backgroundUrl ? `url("${theme.backgroundUrl}")` : 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
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
