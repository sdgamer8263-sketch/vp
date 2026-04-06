import React, { useState } from "react";
import { Download, Search, CheckCircle, Box, Star } from "lucide-react";

export const ModInstaller = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [installedMods, setInstalledMods] = useState<number[]>([]);

  const mods = [
    {
      id: 1,
      name: "Just Enough Items (JEI)",
      description: "View items and recipes.",
      downloads: "200M+",
      rating: 4.9,
      category: "Utility",
    },
    {
      id: 2,
      name: "OptiFine",
      description: "Minecraft optimization mod.",
      downloads: "150M+",
      rating: 4.9,
      category: "Optimization",
    },
    {
      id: 3,
      name: "Create",
      description: "Aesthetic technology and automation.",
      downloads: "80M+",
      rating: 4.9,
      category: "Technology",
    },
    {
      id: 4,
      name: "Biomes O' Plenty",
      description: "Adds 80+ new biomes.",
      downloads: "120M+",
      rating: 4.8,
      category: "World Gen",
    },
    {
      id: 5,
      name: "JourneyMap",
      description: "Real-time mapping in-game or in a web browser.",
      downloads: "110M+",
      rating: 4.8,
      category: "Map",
    },
    {
      id: 6,
      name: "Tinkers Construct",
      description: "Put tools together in a wide variety of ways.",
      downloads: "100M+",
      rating: 4.7,
      category: "Tools",
    },
  ];

  const filteredMods = mods.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const installMod = (id: number) => {
    setInstalledMods([...installedMods, id]);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Box className="text-orange-500" size={32} />
            Mod Installer
          </h1>
          <p className="text-neutral-400">
            Search and install Forge/Fabric mods directly to your server with
            one click.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-neutral-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search mods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMods.map((mod) => {
          const isInstalled = installedMods.includes(mod.id);
          return (
            <div
              key={mod.id}
              className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl hover:border-white/20 transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                    <Box size={24} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{mod.name}</h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                      {mod.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 text-sm flex-1 mb-6">
                {mod.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Download size={14} /> {mod.downloads}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" /> {mod.rating}
                  </span>
                </div>

                {isInstalled ? (
                  <div className="flex items-center gap-2 text-green-400 font-medium text-sm px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle size={16} /> Installed
                  </div>
                ) : (
                  <button
                    onClick={() => installMod(mod.id)}
                    className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-[0_0_10px_rgba(249,115,22,0.3)]"
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
