import React, { useState } from "react";
import { Network as NetworkIcon, Plus, Trash2, Globe, Check } from "lucide-react";

export const Network = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => setIsCreating(false), 2000);
  };

  const allocations = [
    { id: 1, ip: "192.168.1.100", port: 25565, isPrimary: true, alias: "play.myserver.com" },
    { id: 2, ip: "192.168.1.100", port: 25566, isPrimary: false, alias: "" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <NetworkIcon className="text-cyan-500" size={28} />
            Network
          </h2>
          <p className="text-sm text-gray-400 mt-1">Manage allocations and ports for your server.</p>
        </div>
        <button 
          onClick={handleCreate}
          disabled={isCreating}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
            isCreating
              ? "bg-green-600 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              : "bg-cyan-600 hover:bg-cyan-500 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
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
              <span>Create Allocation</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">IP Address</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Port</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Alias</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {allocations.map((alloc) => (
                <tr key={alloc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-200 font-mono">{alloc.ip}</span>
                      {alloc.isPrimary && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                          Primary
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-mono">{alloc.port}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {alloc.alias ? (
                      <span className="flex items-center gap-1"><Globe size={14} /> {alloc.alias}</span>
                    ) : (
                      <span className="text-gray-600 italic">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {!alloc.isPrimary && (
                        <button className="text-xs font-medium text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded hover:bg-cyan-500/10 transition-colors">
                          Make Primary
                        </button>
                      )}
                      <button className={`p-1.5 rounded transition-colors ${alloc.isPrimary ? "text-gray-600 cursor-not-allowed" : "text-red-400 hover:text-red-300 hover:bg-red-500/10"}`} disabled={alloc.isPrimary} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
