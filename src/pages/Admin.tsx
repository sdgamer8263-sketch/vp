import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Save,
  Users,
  Palette,
  MessageSquare,
  Shield,
  CheckCircle,
  Image as ImageIcon,
  Globe,
  Cloud,
  Link as LinkIcon,
  Upload
} from "lucide-react";

export const Admin = () => {
  const {
    role,
    viewMode,
    theme,
    setTheme,
    discordSettings,
    setDiscordSettings,
    socialMedia,
    setSocialMedia
  } = useAppContext();
  const [localTheme, setLocalTheme] = useState(theme);
  const [localDiscord, setLocalDiscord] = useState(discordSettings);
  const [localSocial, setLocalSocial] = useState(socialMedia);
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
    setSocialMedia(localSocial);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'backgroundUrl' | 'logoUrl' | 'faviconUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalTheme({ ...localTheme, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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

        {/* Branding & Images */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center space-x-3">
            <ImageIcon size={20} className="text-pink-400" />
            <h3 className="text-lg font-semibold text-white">
              Branding & Images
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Custom Background
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={localTheme.backgroundUrl || ""}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, backgroundUrl: e.target.value })
                  }
                  placeholder="https://example.com/bg.jpg"
                  className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-pink-500/50 outline-none font-mono text-sm"
                />
                <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg flex items-center justify-center transition-colors">
                  <Upload size={18} className="text-gray-300" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'backgroundUrl')} />
                </label>
              </div>
              <p className="text-xs text-gray-400">
                Provide a URL or upload an image.
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Custom Logo
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={localTheme.logoUrl || ""}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, logoUrl: e.target.value })
                  }
                  placeholder="https://example.com/logo.png"
                  className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-pink-500/50 outline-none font-mono text-sm"
                />
                <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg flex items-center justify-center transition-colors">
                  <Upload size={18} className="text-gray-300" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logoUrl')} />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Custom Favicon
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={localTheme.faviconUrl || ""}
                  onChange={(e) =>
                    setLocalTheme({ ...localTheme, faviconUrl: e.target.value })
                  }
                  placeholder="https://example.com/favicon.ico"
                  className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-pink-500/50 outline-none font-mono text-sm"
                />
                <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg flex items-center justify-center transition-colors">
                  <Upload size={18} className="text-gray-300" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'faviconUrl')} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Settings */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center space-x-3">
            <LinkIcon size={20} className="text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              Social Media Links
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(localSocial).map(([platform, data]) => (
              <div key={platform} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300 capitalize">
                    {platform}
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={data.enabled}
                      onChange={(e) =>
                        setLocalSocial({
                          ...localSocial,
                          [platform]: { ...data, enabled: e.target.checked },
                        })
                      }
                    />
                    <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <input
                  type="text"
                  value={data.url}
                  onChange={(e) =>
                    setLocalSocial({
                      ...localSocial,
                      [platform]: { ...data, url: e.target.value },
                    })
                  }
                  disabled={!data.enabled}
                  placeholder={`https://${platform}.com/yourpage`}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-green-500/50 outline-none font-mono text-sm disabled:opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Subdomain & Cloudflared Setup */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center space-x-3">
            <Globe size={20} className="text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">
              Subdomain & Cloudflared
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <Globe size={16} />
                <span>Base Domain for Subdomains</span>
              </label>
              <input
                type="text"
                placeholder="example.com"
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-cyan-500/50 outline-none font-mono text-sm"
              />
              <p className="text-xs text-gray-400">
                Users will be able to create subdomains like `server.example.com`.
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <Cloud size={16} />
                <span>Cloudflare API Token</span>
              </label>
              <input
                type="password"
                placeholder="••••••••••••••••"
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-cyan-500/50 outline-none font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Cloudflare Zone ID
              </label>
              <input
                type="text"
                placeholder="Zone ID"
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-cyan-500/50 outline-none font-mono text-sm"
              />
            </div>
            <button className="w-full px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors font-medium">
              Test Connection
            </button>
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
                    <td className="py-3 text-gray-400">View Own Servers</td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 text-gray-400">View All Servers</td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-gray-600">-</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 text-gray-400">Create Server</td>
                    <td className="py-3 text-center text-green-400">
                      <CheckCircle size={18} className="mx-auto" />
                    </td>
                    <td className="py-3 text-center text-gray-600">-</td>
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
                Blueprint Extension Installation
              </h3>
            </div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "blueprint -install glasstheme",
                )
              }
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-medium transition-colors border border-white/10"
            >
              Copy Command
            </button>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-400 mb-4">
              This theme is built as a proper Blueprint Extension. Run this command on your Pterodactyl server to install it automatically.
            </p>
            <div className="bg-black/80 p-4 rounded-lg font-mono text-sm text-green-400 overflow-x-auto border border-white/5">
              <code>
                blueprint -install glasstheme
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
