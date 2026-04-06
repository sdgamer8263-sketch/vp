import React from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ArrowLeft } from "lucide-react";
import { ServerConsole } from "./ServerConsole";
import { ServerNav } from "../components/ServerNav";
import { SubdomainManager } from "./SubdomainManager";
import { PluginInstaller } from "./PluginInstaller";
import { ModInstaller } from "./ModInstaller";
import { AddonInstaller } from "./AddonInstaller";
import { VersionChanger } from "./VersionChanger";
import { ResourcePackManager } from "./ResourcePackManager";
import { EggChanger } from "./EggChanger";

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
          className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            {server.name}
            <span
              className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                server.status === "running"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {server.status.toUpperCase()}
            </span>
          </h2>
          <p className="text-sm text-gray-500">{server.id}</p>
        </div>
      </div>

      <ServerNav serverId={server.id} />

      <Routes>
        <Route index element={<ServerConsole />} />
        <Route
          path="files"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              File Manager (Coming Soon)
            </div>
          }
        />
        <Route
          path="databases"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              Databases (Coming Soon)
            </div>
          }
        />
        <Route
          path="schedules"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              Schedules (Coming Soon)
            </div>
          }
        />
        <Route
          path="users"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              Users (Coming Soon)
            </div>
          }
        />
        <Route
          path="backups"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              Backups (Coming Soon)
            </div>
          }
        />
        <Route
          path="network"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              Network (Coming Soon)
            </div>
          }
        />
        <Route
          path="startup"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              Startup (Coming Soon)
            </div>
          }
        />
        <Route
          path="settings"
          element={
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
              Settings (Coming Soon)
            </div>
          }
        />
        
        {/* Custom Theme Routes */}
        <Route path="subdomains" element={<SubdomainManager />} />
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
