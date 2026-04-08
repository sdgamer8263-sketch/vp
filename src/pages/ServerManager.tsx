import React, { useState } from "react";
import { Server, Shield, RefreshCw, Trash2, Database, Globe } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const ServerManager = () => {
  const { theme } = useAppContext();
  const [isReinstalling, setIsReinstalling] = useState(false);

  const handleReinstall = () => {
    setIsReinstalling(true);
    setTimeout(() => setIsReinstalling(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Server Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="text-blue-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Server Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Server Name</label>
              <input type="text" defaultValue="My Server" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Server Description</label>
              <textarea defaultValue="A cool server" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24" />
            </div>
            <button className="px-4 py-2 rounded-lg text-white font-medium shadow-lg transition-all hover:opacity-90" style={{ backgroundColor: theme.primary }}>
              Save Details
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-red-500/20 overflow-hidden p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-red-400" size={24} />
              <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/5 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Reinstall Server</h4>
                  <p className="text-sm text-gray-400">Reinstalls the server to its base state.</p>
                </div>
                <button 
                  onClick={handleReinstall}
                  disabled={isReinstalling}
                  className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <RefreshCw size={18} className={isReinstalling ? "animate-spin" : ""} />
                  <span>{isReinstalling ? "Reinstalling..." : "Reinstall"}</span>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/5 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Delete Server</h4>
                  <p className="text-sm text-gray-400">Permanently delete this server and all data.</p>
                </div>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors flex items-center space-x-2">
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
