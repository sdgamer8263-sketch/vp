import React from "react";
import { Users, UserMinus, UserPlus, Shield } from "lucide-react";

export const Players = () => {
  const players = [
    { name: "Steve", uuid: "1234-5678-9012", role: "Admin", online: true },
    { name: "Alex", uuid: "9876-5432-1098", role: "Player", online: true },
    { name: "Notch", uuid: "1111-2222-3333", role: "Player", online: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Player Manager</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center space-x-2">
            <UserPlus size={18} />
            <span>Whitelist Player</span>
          </button>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 font-semibold text-gray-300">Player Name</th>
              <th className="px-6 py-4 font-semibold text-gray-300">UUID</th>
              <th className="px-6 py-4 font-semibold text-gray-300">Role</th>
              <th className="px-6 py-4 font-semibold text-gray-300">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {players.map((player, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-white font-medium flex items-center space-x-3">
                  <img src={`https://minotar.net/avatar/${player.name}/32`} alt={player.name} className="w-8 h-8 rounded" />
                  <span>{player.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{player.uuid}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    player.role === "Admin" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}>
                    {player.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center space-x-2 ${player.online ? "text-green-400" : "text-gray-500"}`}>
                    <div className={`w-2 h-2 rounded-full ${player.online ? "bg-green-400" : "bg-gray-500"}`}></div>
                    <span>{player.online ? "Online" : "Offline"}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/10 transition-colors" title="Make OP">
                    <Shield size={16} />
                  </button>
                  <button className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/20 transition-colors" title="Kick/Ban">
                    <UserMinus size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
