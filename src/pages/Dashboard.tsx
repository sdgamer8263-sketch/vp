import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  Play,
  Square,
  RefreshCw,
  TerminalSquare,
  X,
  Settings,
  Users,
  Shield,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { servers, theme, updateServerStatus, role, viewMode, users, currentUser, setServers } = useAppContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newServerName, setNewServerName] = useState("");
  const [newServerSoftware, setNewServerSoftware] = useState<any>("Paper");
  const [newServerSuspendDate, setNewServerSuspendDate] = useState("");

  const handleStart = (id: string) => {
    updateServerStatus(id, "running");
  };

  const handleStop = (id: string) => {
    updateServerStatus(id, "offline");
  };

  const handleRestart = (id: string) => {
    updateServerStatus(id, "offline");
    setTimeout(() => updateServerStatus(id, "running"), 2000);
  };

  const handleCreateServer = () => {
    if (!newServerName) return;
    
    const newServer = {
      id: `srv-${Date.now()}`,
      name: newServerName,
      ownerId: currentUser.id,
      software: newServerSoftware,
      status: "offline" as const,
      cpu: { used: 0, total: 100 },
      ram: { used: 0, total: 2048 },
      disk: { used: 0, total: 20000 },
      uptime: "0m",
      autoSuspendDate: newServerSuspendDate || undefined,
    };
    
    setServers([...servers, newServer]);
    setShowCreateModal(false);
    setNewServerName("");
    setNewServerSuspendDate("");
  };

  // Filter servers: Admin sees all, User sees only theirs
  const visibleServers = role === "Admin" && viewMode === "admin" ? servers : servers.filter(s => s.ownerId === currentUser.id);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Servers</h2>
          <p className="text-sm text-gray-400 mt-1">
            Total Users: {users.length}
          </p>
        </div>
        <div className="flex space-x-3">
          {role === "Admin" && viewMode === "admin" && (
            <>
              <a
                href="/admin" // Simulated link to actual pterodactyl admin
                className="px-4 py-2 rounded-lg text-white font-medium shadow-lg transition-all hover:opacity-90 border border-white/10 flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400"
              >
                <Shield size={18} />
                <span>Pterodactyl Admin</span>
              </a>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-lg text-white font-medium shadow-lg transition-all hover:opacity-90 border border-white/10"
                style={{ backgroundColor: theme.primary }}
              >
                Create Server
              </button>
            </>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Create New Server</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Server Name
                </label>
                <input
                  type="text"
                  value={newServerName}
                  onChange={(e) => setNewServerName(e.target.value)}
                  placeholder="My New Server"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Software
                </label>
                <select 
                  value={newServerSoftware}
                  onChange={(e) => setNewServerSoftware(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                >
                  <option value="Paper">Minecraft: Java Edition (Paper)</option>
                  <option value="Spigot">Minecraft: Java Edition (Spigot)</option>
                  <option value="Bukkit">Minecraft: Java Edition (Bukkit)</option>
                  <option value="Fabric">Minecraft: Java Edition (Fabric)</option>
                  <option value="Forge">Minecraft: Java Edition (Forge)</option>
                  <option value="Vanilla">Minecraft: Java Edition (Vanilla)</option>
                  <option value="Bedrock">Minecraft: Bedrock Edition</option>
                  <option value="Pocket Edition">Minecraft: Pocket Edition</option>
                  <option value="Node.js">Node.js App</option>
                  <option value="Python">Python Bot</option>
                  <option value="CS:GO">CS:GO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Auto Suspension Date (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={newServerSuspendDate}
                  onChange={(e) => setNewServerSuspendDate(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Server will be automatically suspended at this time.
                </p>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateServer}
                  className="px-4 py-2 rounded-lg text-white font-medium shadow-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: theme.primary }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleServers.map((server) => (
          <div
            key={server.id}
            className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${server.status === "running" ? "bg-green-400 text-green-400" : server.status === "suspended" ? "bg-red-400 text-red-400" : "bg-gray-400 text-gray-400"}`}
                ></div>
                <div>
                  <h3 className="font-semibold text-white truncate">
                    {server.name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-400 mt-0.5">
                    <Settings size={12} className="mr-1" />
                    {server.software}
                  </div>
                </div>
              </div>
              <Link
                to={`/server/${server.id}`}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <TerminalSquare size={20} />
              </Link>
            </div>

            {server.autoSuspendDate && (
              <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-5 py-2 flex items-center text-xs text-yellow-400">
                <Clock size={14} className="mr-2" />
                Auto-suspends on: {new Date(server.autoSuspendDate).toLocaleString()}
              </div>
            )}

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Cpu size={14} className="mr-1.5" /> CPU
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {server.cpu.used}%
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-1.5 border border-white/5">
                    <div
                      className="bg-blue-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                      style={{
                         width: `${(server.cpu.used / server.cpu.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Activity size={14} className="mr-1.5" /> RAM
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {(server.ram.used / 1024).toFixed(1)} GB
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-1.5 border border-white/5">
                    <div
                      className="bg-green-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                      style={{
                        width: `${(server.ram.used / server.ram.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/10">
                <div className="flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <HardDrive size={14} className="mr-1.5" /> Disk Usage
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-gray-200">
                    {(server.disk.used / 1024).toFixed(1)} GB /{" "}
                    {(server.disk.total / 1024).toFixed(1)} GB
                  </span>
                  <span className="text-xs text-gray-400">
                    {Math.round((server.disk.used / server.disk.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-1.5 mt-1 border border-white/5">
                  <div
                    className="bg-purple-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]"
                    style={{
                      width: `${(server.disk.used / server.disk.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 px-5 py-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">
                Uptime: {server.uptime}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStart(server.id)}
                  disabled={server.status === "running"}
                  className="p-1.5 bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Start"
                >
                  <Play size={16} />
                </button>
                <button
                  onClick={() => handleRestart(server.id)}
                  className="p-1.5 bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  title="Restart"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => handleStop(server.id)}
                  disabled={server.status === "offline"}
                  className="p-1.5 bg-white/5 border border-white/10 rounded-md text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Stop"
                >
                  <Square size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
