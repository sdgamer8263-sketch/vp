import React, { useState } from "react";
import { Calendar, Plus, Play, Trash2, Clock, Check } from "lucide-react";

export const Schedules = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => setIsCreating(false), 2000);
  };

  const schedules = [
    { id: 1, name: "Daily Backup", cron: "0 0 * * *", nextRun: "in 4 hours", status: "active" },
    { id: 2, name: "Weekly Restart", cron: "0 4 * * 0", nextRun: "in 3 days", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="text-purple-500" size={28} />
            Schedules
          </h2>
          <p className="text-sm text-gray-400 mt-1">Automate server tasks like restarts and backups.</p>
        </div>
        <button 
          onClick={handleCreate}
          disabled={isCreating}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
            isCreating
              ? "bg-green-600 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              : "bg-purple-600 hover:bg-purple-500 border border-purple-500/50 shadow-[0_0_10px_rgba(147,51,234,0.3)]"
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
              <span>New Schedule</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Cron Expression</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Next Run</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-gray-200 font-medium">{schedule.name}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono bg-black/20 rounded px-2">{schedule.cron}</td>
                  <td className="px-6 py-4 text-gray-400 flex items-center gap-2">
                    <Clock size={14} className="text-purple-400" />
                    {schedule.nextRun}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Run Now">
                        <Play size={16} />
                      </button>
                      <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors" title="Delete">
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
