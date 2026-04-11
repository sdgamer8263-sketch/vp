import React from "react";
import { Shield, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const PterodactylAdmin = () => {
  const { role, viewMode } = useAppContext();

  if (role !== "Admin" || viewMode !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <Shield size={64} className="mx-auto text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
          <p className="text-gray-500">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 bg-white/10 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-white">Pterodactyl Admin</h2>
          <p className="text-sm text-gray-400 mt-1">
            Actual Pterodactyl Panel Administration
          </p>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-12 text-center flex flex-col items-center justify-center">
        <Shield size={64} className="text-red-400 mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Pterodactyl Admin Area
        </h3>
        <p className="text-gray-400 max-w-lg mb-8">
          In a real production environment, clicking the "Pterodactyl Admin" button would redirect you to the actual Pterodactyl administrative interface (usually located at <code>/admin</code> on your domain).
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium hover:bg-red-500/30 transition-colors"
        >
          <span>Go to Real Pterodactyl Admin</span>
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};
