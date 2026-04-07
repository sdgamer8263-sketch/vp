import React, { useState } from "react";
import { Archive, Plus, Download, Trash2, RotateCcw, Lock, Unlock, Check } from "lucide-react";

export const Backups = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => setIsCreating(false), 2000);
  };

  const backups = [
    { id: 1, name: "Auto-backup", date: "Oct 24, 2023 14:30", size: "1.2 GB", isLocked: true },
    { id: 2, name: "Before update", date: "Oct 20, 2023 09:15", size: "1.1 GB", isLocked: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Archive className="text-yellow-500" size={28} />
            Backups
          </h2>
          <p className="text-sm text-gray-400 mt-1">Create and restore server backups.</p>
        </div>
        <button 
          onClick={handleCreate}
          disabled={isCreating}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
            isCreating
              ? "bg-green-600 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              : "bg-yellow-600 hover:bg-yellow-500 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.3)]"
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
              <span>Create Backup</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {backups.map((backup) => (
          <div key={backup.id} className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                  <Archive size={20} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {backup.name}
                    {backup.isLocked && <Lock size={14} className="text-gray-400" />}
                  </h3>
                  <span className="text-xs text-gray-400">{backup.date}</span>
                </div>
              </div>
              <div className="text-sm font-mono text-gray-300 bg-black/40 px-2 py-1 rounded border border-white/5">
                {backup.size}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t border-white/10">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Download">
                <Download size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Restore">
                <RotateCcw size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title={backup.isLocked ? "Unlock" : "Lock"}>
                {backup.isLocked ? <Unlock size={18} /> : <Lock size={18} />}
              </button>
              <button className={`p-2 rounded-lg transition-colors ${backup.isLocked ? "text-gray-600 cursor-not-allowed" : "text-red-400 hover:text-red-300 hover:bg-red-500/10"}`} disabled={backup.isLocked} title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
