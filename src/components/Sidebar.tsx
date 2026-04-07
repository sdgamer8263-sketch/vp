import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Server,
  Settings,
  Ticket,
  Shield,
  LogOut,
  Terminal,
  Globe,
  Package,
  Box,
  Layers,
  Image as ImageIcon,
  Puzzle,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const Sidebar = () => {
  const { role, theme, viewMode } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const serverIdMatch = location.pathname.match(/\/server\/([^\/]+)/);
  const serverId = serverIdMatch ? serverIdMatch[1] : null;

  const isServerRelatedPage = !!serverId;

  const navItems = [
    { name: "Servers", path: "/", icon: <Server size={20} /> },
    { name: "Tickets", path: "/tickets", icon: <Ticket size={20} /> },
  ];

  if (isServerRelatedPage && serverId) {
    navItems.splice(
      1,
      0,
      { name: "Subdomains", path: `/server/${serverId}/subdomains`, icon: <Globe size={20} /> },
      { name: "Plugins", path: `/server/${serverId}/plugins`, icon: <Package size={20} /> },
      { name: "Mods", path: `/server/${serverId}/mods`, icon: <Box size={20} /> },
      { name: "Addons", path: `/server/${serverId}/addons`, icon: <Puzzle size={20} /> },
      { name: "Versions", path: `/server/${serverId}/versions`, icon: <Layers size={20} /> },
      {
        name: "Resource Packs",
        path: `/server/${serverId}/resource-packs`,
        icon: <ImageIcon size={20} />,
      },
      { name: "Egg Changer", path: `/server/${serverId}/eggs`, icon: <Settings size={20} /> }
    );
  }

  if (role === "Admin" && viewMode === "admin") {
    navItems.push({
      name: "Admin Settings",
      path: "/admin",
      icon: <Shield size={20} />,
    });
  }

  return (
    <div className="w-64 h-screen flex flex-col text-white transition-colors duration-300 border-r border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="p-6 flex items-center space-x-3 border-b border-white/10">
        <Terminal size={28} style={{ color: theme.primary }} />
        <span className="text-xl font-bold tracking-wider">PTERODACTYL</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] border border-white/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`
            }
          >
            <div
              style={{
                color:
                  item.path === window.location.pathname
                    ? theme.primary
                    : "inherit",
              }}
            >
              {item.icon}
            </div>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div
          onClick={() => navigate("/login")}
          className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white cursor-pointer rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};
