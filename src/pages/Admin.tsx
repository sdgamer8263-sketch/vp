import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Save,
  Users,
  Palette,
  MessageSquare,
  Shield,
  CheckCircle,
} from "lucide-react";

export const Admin = () => {
  const {
    role,
    viewMode,
    theme,
    setTheme,
    discordSettings,
    setDiscordSettings,
  } = useAppContext();
  const [localTheme, setLocalTheme] = useState(theme);
  const [localDiscord, setLocalDiscord] = useState(discordSettings);
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setTheme(localTheme);
    setDiscordSettings(localDiscord);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Admin Settings</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage panel configuration, themes, and integrations.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border border-white/10"
          style={{ backgroundColor: theme.primary }}
        >
          {saved ? (
            <CheckCircle size={20} className="animate-pulse" />
          ) : (
            <Save size={20} />
          )}
          <span>{saved ? "Saved Successfully" : "Save Changes"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Theme Customization */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center space-x-3">
            <Palette size={20} className="text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Theme Customization
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={localTheme.primary}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, primary: e.target.value })
                  }
                  className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={localTheme.primary}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, primary: e.target.value })
                  }
                  className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={localTheme.secondary}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, secondary: e.target.value })
                  }
                  className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={localTheme.secondary}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, secondary: e.target.value })
                  }
                  className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Sidebar Background
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={localTheme.sidebar}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, sidebar: e.target.value })
                  }
                  className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={localTheme.sidebar}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, sidebar: e.target.value })
                  }
                  className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Discord Bot Settings */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center space-x-3">
            <MessageSquare size={20} className="text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">
              Discord Bot Integration
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Suspension Notification Channel ID
              </label>
              <input
                type="text"
                value={localDiscord.suspendChannel}
                onChange={(e) =>
                  setLocalDiscord({
                    ...localDiscord,
                    suspendChannel: e.target.value,
                  })
                }
                placeholder="e.g. 123456789012345678"
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50 outline-none font-mono text-sm"
              />
              <p className="text-xs text-gray-400">
                Channel where bot sends alerts when a server is suspended.
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Renewal Notification Channel ID
              </label>
              <input
                type="text"
                value={localDiscord.renewalChannel}
                onChange={(e) =>
                  setLocalDiscord({
                    ...localDiscord,
                    renewalChannel: e.target.value,
                  })
                }
                placeholder="e.g. 987654321098765432"
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50 outline-none font-mono text-sm"
              />
              <p className="text-xs text-gray-400">
                Channel where bot sends server expiration warnings.
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Renewal Warning Days
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={localDiscord.renewalDaysWarning}
                onChange={(e) =>
                  setLocalDiscord({
                    ...localDiscord,
                    renewalDaysWarning: parseInt(e.target.value) || 7,
                  })
                }
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50 outline-none"
              />
              <p className="text-xs text-gray-400">
                Number of days before expiration to send the warning.
              </p>
            </div>
          </div>
        </div>

        {/* Role Management (Mock) */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden md:col-span-2">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center space-x-3">
            <Users size={20} className="text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              Role-Based Access Control (RBAC)
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-300 mb-6">
              Define permissions for different user roles. Admins have access to
              all features, including this settings panel. Standard users only
              see their servers and tickets.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 font-semibold text-gray-300">
                      Permission
                    </th>
                    <th className="pb-3 font-semibold text-gray-300 text-center">
                      Admin
                    </th>
                    <th className="pb-3 font-semibold text-gray-300 text-center">
                      Standard
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="py-3 text-gray-400">View Servers</td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 text-gray-400">Manage Tickets</td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 text-gray-400">Access Admin Panel</td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-gray-600">-</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 text-gray-400">Customize Theme</td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-gray-600">-</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">
                      Configure Discord Bot
                    </td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-gray-600">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Installation Script */}
        <div className="bg-black/50 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden md:col-span-2">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield size={20} className="text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">
                One-Line Installation Command
              </h3>
            </div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "bash <(curl -s https://raw.githubusercontent.com/sdgamer8263-sketch/my/main/install.sh)",
                )
              }
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-medium transition-colors border border-white/10"
            >
              Copy Command
            </button>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-400 mb-4">
              Run this command on your Pterodactyl server to install the custom
              theme without errors. It automatically handles memory issues
              during the build process.
            </p>
            <div className="bg-black/80 p-4 rounded-lg font-mono text-sm text-green-400 overflow-x-auto border border-white/5">
              <code>
                bash &lt;(curl -s
                https://raw.githubusercontent.com/sdgamer8263-sketch/my/main/install.sh)
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
