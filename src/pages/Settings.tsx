import React, { useState } from "react";
import { Settings as SettingsIcon, Server, RefreshCw, Trash2, Key, Check } from "lucide-react";

export const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isReinstalling, setIsReinstalling] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const handleReinstall = () => {
    setIsReinstalling(true);
    setTimeout(() => setIsReinstalling(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <SettingsIcon className="text-gray-400" size={28} />
            Settings
          </h2>
          <p className="text-sm text-gray-400 mt-1">Manage server settings and SFTP details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Server size={20} className="text-blue-400" />
            Server Details
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Server Name</label>
            <input 
              type="text" 
              defaultValue="My Minecraft Server"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isSaving 
                ? "bg-green-600 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
                : "bg-blue-600 hover:bg-blue-500 border border-blue-500/50 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
            }`}
          >
            {isSaving ? (
              <>
                <Check size={16} className="animate-pulse" />
                Saved Successfully
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Key size={20} className="text-purple-400" />
            SFTP Details
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Server Address</label>
              <div className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 font-mono">
                sftp://192.168.1.100:2022
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Username</label>
              <div className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 font-mono">
                admin.12345678
              </div>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors">
              Launch SFTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
