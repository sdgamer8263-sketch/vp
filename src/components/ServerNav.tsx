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
  ];

  return (
    <div className="flex space-x-1 overflow-x-auto pb-2 mb-6 border-b border-gray-200 hide-scrollbar">
      {navs.map((nav) => (
        <NavLink
          key={nav.name}
          to={nav.path}
          end={nav.path === `/server/${serverId}`}
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors ${
              isActive
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
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
