import React, { useState } from "react";
import { Database, Plus, Trash2, Eye, Copy, Check } from "lucide-react";

export const Databases = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => setIsCreating(false), 2000);
  };

  const databases = [
    { id: 1, name: "s1_core", host: "192.168.1.100:3306", username: "u1_core", connections: "2/10" },
    { id: 2, name: "s1_plugins", host: "192.168.1.100:3306", username: "u1_plugins", connections: "0/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Database className="text-green-500" size={28} />
            Databases
          </h2>
          <p className="text-sm text-gray-400 mt-1">Manage MySQL databases for your server.</p>
        </div>
        <button 
          onClick={handleCreate}
          disabled={isCreating}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
            isCreating
              ? "bg-green-600 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              : "bg-green-600 hover:bg-green-500 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
          }`}
        >
          {isCreating ? (
            <>
              <Check size={16} className="animate-pulse" />
              <span>Created</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>New Database</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {databases.map((db) => (
          <div key={db.id} className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <Database size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{db.name}</h3>
                  <span className="text-xs text-gray-400">Connections: {db.connections}</span>
                </div>
              </div>
              <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-3 mt-6">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Endpoint</label>
                <div className="flex items-center bg-black/50 border border-white/10 rounded-lg px-3 py-2">
                  <span className="flex-1 text-sm text-gray-200 font-mono">{db.host}</span>
                  <button className="text-gray-400 hover:text-white transition-colors"><Copy size={14} /></button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Username</label>
                <div className="flex items-center bg-black/50 border border-white/10 rounded-lg px-3 py-2">
                  <span className="flex-1 text-sm text-gray-200 font-mono">{db.username}</span>
                  <button className="text-gray-400 hover:text-white transition-colors"><Copy size={14} /></button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Password</label>
                <div className="flex items-center bg-black/50 border border-white/10 rounded-lg px-3 py-2">
                  <span className="flex-1 text-sm text-gray-200 font-mono">••••••••••••</span>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white transition-colors"><Eye size={14} /></button>
                    <button className="text-gray-400 hover:text-white transition-colors"><Copy size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
