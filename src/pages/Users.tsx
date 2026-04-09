import React, { useState } from "react";
import { Users as UsersIcon, Plus, Trash2, Edit2, Shield, Check } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const Users = () => {
  const { role, users: appUsers } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => setIsCreating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <UsersIcon className="text-orange-500" size={28} />
            Users
          </h2>
          <p className="text-sm text-gray-400 mt-1">View all registered users.</p>
        </div>
        {role === "Admin" && (
          <button 
            onClick={handleCreate}
            disabled={isCreating}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
              isCreating
                ? "bg-green-600 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                : "bg-orange-600 hover:bg-orange-500 border border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
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
                <span>New User</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">User</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Role</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Joined</th>
                {role === "Admin" && (
                  <th className="px-6 py-4 font-semibold text-gray-300 text-sm text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="text-sm">
              {appUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 text-orange-400 font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-gray-200 font-medium">{user.username}</div>
                        <div className="text-gray-500 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <span className="bg-black/40 px-2 py-1 rounded text-xs border border-white/5">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {user.createdAt}
                  </td>
                  {role === "Admin" && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
