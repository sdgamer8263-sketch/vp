import React from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ArrowLeft, Clock } from "lucide-react";
import { ServerConsole } from "./ServerConsole";
import { ServerNav } from "../components/ServerNav";
import { PluginInstaller } from "./PluginInstaller";
import { ModInstaller } from "./ModInstaller";
import { AddonInstaller } from "./AddonInstaller";
import { VersionChanger } from "./VersionChanger";
import { ResourcePackManager } from "./ResourcePackManager";
import { EggChanger } from "./EggChanger";
import { FileManager } from "./FileManager";
import { Databases } from "./Databases";
import { Schedules } from "./Schedules";
import { Users } from "./Users";
import { Backups } from "./Backups";
import { Network } from "./Network";
import { Startup } from "./Startup";
import { Settings } from "./Settings";
import { Players } from "./Players";
import { ServerManager } from "./ServerManager";

export const ServerView = () => {
  const { id } = useParams<{ id: string }>();
  const { servers } = useAppContext();
  const server = servers.find((s) => s.id === id);

  if (!server)
    return (
      <div className="p-8 text-center text-gray-500">Server not found</div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 bg-white/10 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            {server.name}
            <span
              className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                server.status === "running"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {server.status.toUpperCase()}
            </span>
          </h2>
          <div className="flex items-center space-x-3 mt-1">
            <p className="text-sm text-gray-400">{server.id}</p>
            {server.autoSuspendDate && (
              <span className="flex items-center text-xs text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                <Clock size={12} className="mr-1" />
                Auto-suspends: {new Date(server.autoSuspendDate).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <ServerNav serverId={server.id} />

      <Routes>
        <Route index element={<ServerConsole server={server} />} />
        <Route path="files" element={<FileManager />} />
        <Route path="databases" element={<Databases />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="users" element={<Users />} />
        <Route path="backups" element={<Backups />} />
        <Route path="network" element={<Network />} />
        <Route path="startup" element={<Startup />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Custom Theme Routes */}
        <Route path="players" element={<Players />} />
        <Route path="manager" element={<ServerManager />} />
        <Route path="plugins" element={<PluginInstaller />} />
        <Route path="mods" element={<ModInstaller />} />
        <Route path="addons" element={<AddonInstaller />} />
        <Route path="versions" element={<VersionChanger />} />
        <Route path="resource-packs" element={<ResourcePackManager />} />
        <Route path="eggs" element={<EggChanger />} />
      </Routes>
    </div>
  );
};
