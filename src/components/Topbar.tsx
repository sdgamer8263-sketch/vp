import React from "react";
import { useAppContext } from "../context/AppContext";
import { User, Bell, Settings } from "lucide-react";

export const Topbar = () => {
  const { role, viewMode, setViewMode, theme } = useAppContext();

  return (
    <div className="h-16 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-6">
        {role === "Admin" && (
          <div className="flex items-center space-x-2 bg-black/40 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setViewMode("user")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "user"
                  ? "bg-white/20 shadow-sm text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              User View
            </button>
            <button
              onClick={() => setViewMode("admin")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "admin"
                  ? "bg-white/20 shadow-sm text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Admin View
            </button>
          </div>
        )}

        <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
          <button className="text-gray-300 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              style={{ backgroundColor: theme.primary }}
            >
              {role === "Admin" ? "A" : "U"}
            </div>
            <span className="text-sm font-medium text-gray-200">{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
