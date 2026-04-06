import React, { useState } from "react";
import { Download, Search, CheckCircle, Puzzle, Star } from "lucide-react";

export const AddonInstaller = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [installedAddons, setInstalledAddons] = useState<number[]>([]);

  const addons = [
    {
      id: 1,
      name: "Bedrock Connect",
      description: "Allow Bedrock players to join Java servers.",
      downloads: "5M+",
      rating: 4.8,
      category: "Cross-play",
    },
    {
      id: 2,
      name: "GeyserMC",
      description:
        "A bridge between Minecraft: Bedrock Edition and Minecraft: Java Edition.",
      downloads: "10M+",
      rating: 4.9,
      category: "Cross-play",
    },
    {
      id: 3,
      name: "Floodgate",
      description:
        "Allows Bedrock accounts to bypass Java edition authentication.",
      downloads: "8M+",
      rating: 4.9,
      category: "Authentication",
    },
    {
      id: 4,
      name: "ViaVersion",
      description: "Allows newer clients to connect to older server versions.",
      downloads: "15M+",
      rating: 4.9,
      category: "Compatibility",
    },
    {
      id: 5,
      name: "ViaBackwards",
      description: "Allows older clients to connect to newer server versions.",
      downloads: "12M+",
      rating: 4.8,
      category: "Compatibility",
    },
    {
      id: 6,
      name: "PlaceholderAPI",
      description:
        "A plugin that allows you to use placeholders in other plugins.",
      downloads: "20M+",
      rating: 4.9,
      category: "API",
    },
  ];

  const filteredAddons = addons.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const installAddon = (id: number) => {
    setInstalledAddons([...installedAddons, id]);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Puzzle className="text-teal-500" size={32} />
            Addon Installer
          </h1>
          <p className="text-neutral-400">
            Search and install server addons and extensions directly to your
            server.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-neutral-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search addons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAddons.map((addon) => {
          const isInstalled = installedAddons.includes(addon.id);
          return (
            <div
              key={addon.id}
              className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl hover:border-white/20 transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                    <Puzzle size={24} className="text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {addon.name}
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                      {addon.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 text-sm flex-1 mb-6">
                {addon.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Download size={14} /> {addon.downloads}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" /> {addon.rating}
                  </span>
                </div>

                {isInstalled ? (
                  <div className="flex items-center gap-2 text-green-400 font-medium text-sm px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle size={16} /> Installed
                  </div>
                ) : (
                  <button
                    onClick={() => installAddon(addon.id)}
                    className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-[0_0_10px_rgba(20,184,166,0.3)]"
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
