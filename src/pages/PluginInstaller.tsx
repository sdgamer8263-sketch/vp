import React, { useState } from "react";
import { Download, Search, CheckCircle, Package, Star } from "lucide-react";

export const PluginInstaller = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [installedPlugins, setInstalledPlugins] = useState<number[]>([]);

  const plugins = [
    {
      id: 1,
      name: "EssentialsX",
      description: "The essential plugin for Spigot servers.",
      downloads: "10M+",
      rating: 4.8,
      category: "Admin Tools",
    },
    {
      id: 2,
      name: "Vault",
      description: "Permissions, Chat, & Economy API.",
      downloads: "8M+",
      rating: 4.9,
      category: "API",
    },
    {
      id: 3,
      name: "WorldEdit",
      description: "In-game voxel map editor.",
      downloads: "15M+",
      rating: 4.9,
      category: "World Management",
    },
    {
      id: 4,
      name: "LuckPerms",
      description: "Advanced permissions plugin.",
      downloads: "5M+",
      rating: 4.9,
      category: "Permissions",
    },
    {
      id: 5,
      name: "ClearLag",
      description: "Reduce lag on your server.",
      downloads: "4M+",
      rating: 4.5,
      category: "Optimization",
    },
    {
      id: 6,
      name: "GriefPrevention",
      description: "Prevent griefing and protect land.",
      downloads: "3M+",
      rating: 4.7,
      category: "Protection",
    },
  ];

  const filteredPlugins = plugins.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const installPlugin = (id: number) => {
    setInstalledPlugins([...installedPlugins, id]);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Package className="text-purple-500" size={32} />
            Plugin Installer
          </h1>
          <p className="text-neutral-400">
            Search and install Spigot/Paper plugins directly to your server with
            one click.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-neutral-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search plugins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => {
          const isInstalled = installedPlugins.includes(plugin.id);
          return (
            <div
              key={plugin.id}
              className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl hover:border-white/20 transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Package size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {plugin.name}
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                      {plugin.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 text-sm flex-1 mb-6">
                {plugin.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Download size={14} /> {plugin.downloads}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" /> {plugin.rating}
                  </span>
                </div>

                {isInstalled ? (
                  <div className="flex items-center gap-2 text-green-400 font-medium text-sm px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle size={16} /> Installed
                  </div>
                ) : (
                  <button
                    onClick={() => installPlugin(plugin.id)}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                  >
                    Install
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
