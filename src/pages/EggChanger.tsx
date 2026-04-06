import React, { useState } from "react";
import { Settings, AlertTriangle, RefreshCw, Server } from "lucide-react";

export const EggChanger = () => {
  const [currentEgg, setCurrentEgg] = useState("Paper");
  const [isChanging, setIsChanging] = useState(false);

  const eggs = [
    {
      id: "paper",
      name: "Paper",
      description:
        "High performance Spigot fork that aims to fix gameplay and mechanics inconsistencies.",
      category: "Minecraft",
    },
    {
      id: "forge",
      name: "Forge",
      description: "Modding API for Minecraft, required for most mods.",
      category: "Minecraft",
    },
    {
      id: "fabric",
      name: "Fabric",
      description: "Lightweight, experimental modding toolchain for Minecraft.",
      category: "Minecraft",
    },
    {
      id: "vanilla",
      name: "Vanilla",
      description: "The official, unmodified Minecraft server software.",
      category: "Minecraft",
    },
    {
      id: "bungeecord",
      name: "BungeeCord",
      description:
        "Proxy server software for linking multiple Minecraft servers.",
      category: "Proxy",
    },
    {
      id: "waterfall",
      name: "Waterfall",
      description:
        "A fork of BungeeCord that aims to improve performance and stability.",
      category: "Proxy",
    },
  ];

  const changeEgg = (eggName: string) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentEgg(eggName);
      setIsChanging(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Settings className="text-red-500" size={32} />
          Egg Changer
        </h1>
        <p className="text-neutral-400">
          Change the core software (Egg) that runs your server. This is an
          advanced feature.
        </p>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <AlertTriangle className="text-red-500 shrink-0 mt-1" size={28} />
        <div>
          <h3 className="text-lg font-bold text-red-400 mb-1">Danger Zone</h3>
          <p className="text-red-300/80 text-sm">
            Changing your server's Egg will completely alter how it runs. This
            may cause data loss, incompatibility with existing files, and
            require a full server reinstall. Always backup your data before
            proceeding.
          </p>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-1">
            Current Egg
          </h3>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            {currentEgg}
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              Active
            </span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
          <Server size={32} className="text-red-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eggs.map((egg) => {
          const isActive = currentEgg === egg.name;
          return (
            <div
              key={egg.id}
              className={`bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl transition-all flex flex-col h-full ${isActive ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "hover:border-white/20"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {egg.name}
                  </h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 mt-1 inline-block">
                    {egg.category}
                  </span>
                </div>
              </div>

              <p className="text-neutral-400 text-sm flex-1 mb-6">
                {egg.description}
              </p>

              <div className="mt-auto pt-4 border-t border-white/10">
                {isActive ? (
                  <div className="w-full flex items-center justify-center gap-2 text-red-400 font-medium py-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                    Currently Active
                  </div>
                ) : (
                  <button
                    onClick={() => changeEgg(egg.name)}
                    disabled={isChanging}
                    className="w-full bg-red-600/80 hover:bg-red-500 text-white py-2.5 rounded-xl font-medium transition-all border border-red-500/50 flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  >
                    {isChanging ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <Settings size={18} />
                    )}
                    {isChanging ? "Changing..." : "Change to " + egg.name}
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
