import React, { useState } from "react";
import {
  Download,
  Search,
  CheckCircle,
  Image as ImageIcon,
  Star,
} from "lucide-react";

export const ResourcePackManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [installedPacks, setInstalledPacks] = useState<number[]>([]);

  const packs = [
    {
      id: 1,
      name: "Faithful 32x",
      description: "Keeps the original look but doubles the resolution.",
      downloads: "50M+",
      rating: 4.8,
      category: "Vanilla-like",
    },
    {
      id: 2,
      name: "Sphax PureBDcraft",
      description: "Comic book style resource pack.",
      downloads: "40M+",
      rating: 4.9,
      category: "Stylized",
    },
    {
      id: 3,
      name: "Dokucraft",
      description: "RPG style resource pack with multiple themes.",
      downloads: "30M+",
      rating: 4.7,
      category: "RPG",
    },
    {
      id: 4,
      name: "John Smith Legacy",
      description: "Rustic, medieval style resource pack.",
      downloads: "25M+",
      rating: 4.8,
      category: "Medieval",
    },
    {
      id: 5,
      name: "Soartex Fanver",
      description: "Smooth, clean, and modern resource pack.",
      downloads: "20M+",
      rating: 4.6,
      category: "Modern",
    },
    {
      id: 6,
      name: "Default 3D",
      description: "Adds 3D models to default blocks and items.",
      downloads: "15M+",
      rating: 4.5,
      category: "3D",
    },
  ];

  const filteredPacks = packs.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const installPack = (id: number) => {
    setInstalledPacks([...installedPacks, id]);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ImageIcon className="text-pink-500" size={32} />
            Resource Packs
          </h1>
          <p className="text-neutral-400">
            Browse and install server resource packs to enhance your players'
            visual experience.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-neutral-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search packs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPacks.map((pack) => {
          const isInstalled = installedPacks.includes(pack.id);
          return (
            <div
              key={pack.id}
              className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl hover:border-white/20 transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                    <ImageIcon size={24} className="text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {pack.name}
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                      {pack.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 text-sm flex-1 mb-6">
                {pack.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Download size={14} /> {pack.downloads}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" /> {pack.rating}
                  </span>
                </div>

                {isInstalled ? (
                  <div className="flex items-center gap-2 text-green-400 font-medium text-sm px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle size={16} /> Installed
                  </div>
                ) : (
                  <button
                    onClick={() => installPack(pack.id)}
                    className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-[0_0_10px_rgba(236,72,153,0.3)]"
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
