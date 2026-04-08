import React from "react";
import { NavLink } from "react-router-dom";
import {
  Terminal,
  Folder,
  Database,
  Calendar,
  Users,
  Archive,
  Network,
  PlayCircle,
  Settings as SettingsIcon,
  Users as PlayersIcon,
  Server as ManagerIcon
} from "lucide-react";

export const ServerNav = ({ serverId }: { serverId: string }) => {
  const navs = [
    { name: "Console", path: `/server/${serverId}`, icon: <Terminal size={18} /> },
    { name: "File Manager", path: `/server/${serverId}/files`, icon: <Folder size={18} /> },
    { name: "Databases", path: `/server/${serverId}/databases`, icon: <Database size={18} /> },
    { name: "Schedules", path: `/server/${serverId}/schedules`, icon: <Calendar size={18} /> },
    { name: "Users", path: `/server/${serverId}/users`, icon: <Users size={18} /> },
    { name: "Backups", path: `/server/${serverId}/backups`, icon: <Archive size={18} /> },
    { name: "Network", path: `/server/${serverId}/network`, icon: <Network size={18} /> },
    { name: "Startup", path: `/server/${serverId}/startup`, icon: <PlayCircle size={18} /> },
    { name: "Settings", path: `/server/${serverId}/settings`, icon: <SettingsIcon size={18} /> },
    { name: "Players", path: `/server/${serverId}/players`, icon: <PlayersIcon size={18} /> },
    { name: "Manager", path: `/server/${serverId}/manager`, icon: <ManagerIcon size={18} /> },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 mb-6 border-b border-white/10 hide-scrollbar">
      {navs.map((nav) => (
        <NavLink
          key={nav.name}
          to={nav.path}
          end={nav.path === `/server/${serverId}`}
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              isActive
                ? "bg-white/20 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] border border-white/20"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`
          }
        >
          {nav.icon}
          <span>{nav.name}</span>
        </NavLink>
      ))}
    </div>
  );
};
