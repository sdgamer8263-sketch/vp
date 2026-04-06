import React, { useState } from "react";
import { Layers, Download, CheckCircle, RefreshCw } from "lucide-react";

export const VersionChanger = () => {
  const [currentVersion, setCurrentVersion] = useState("Paper 1.20.4");
  const [isChanging, setIsChanging] = useState(false);

  const versions = [
    {
      id: "paper-1.20.4",
      name: "Paper 1.20.4",
      type: "Paper",
      recommended: true,
    },
    {
      id: "paper-1.19.4",
      name: "Paper 1.19.4",
      type: "Paper",
      recommended: false,
    },
    {
      id: "purpur-1.20.4",
      name: "Purpur 1.20.4",
      type: "Purpur",
      recommended: false,
    },
    {
      id: "forge-1.20.1",
      name: "Forge 1.20.1",
      type: "Forge",
      recommended: false,
    },
    {
      id: "fabric-1.20.4",
      name: "Fabric 1.20.4",
      type: "Fabric",
      recommended: false,
    },
    {
      id: "vanilla-1.20.4",
      name: "Vanilla 1.20.4",
      type: "Vanilla",
      recommended: false,
    },
  ];

  const changeVersion = (versionName: string) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentVersion(versionName);
      setIsChanging(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Layers className="text-cyan-500" size={32} />
          Version Changer
        </h1>
        <p className="text-neutral-400">
          Easily switch your server software and version with one click. Note:
          Changing versions may require a server restart and could affect your
          world data.
        </p>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-1">
            Current Version
          </h3>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            {currentVersion}
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              Active
            </span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
          <Layers size={32} className="text-cyan-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {versions.map((version) => {
          const isActive = currentVersion === version.name;
          return (
            <div
              key={version.id}
              className={`bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl transition-all ${isActive ? "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "hover:border-white/20"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {version.name}
                    {version.recommended && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Recommended
                      </span>
                    )}
                  </h3>
                  <span className="text-sm text-neutral-400">
                    {version.type} Software
                  </span>
                </div>
              </div>

              <div className="mt-6">
                {isActive ? (
                  <div className="w-full flex items-center justify-center gap-2 text-cyan-400 font-medium py-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                    <CheckCircle size={18} /> Currently Installed
                  </div>
                ) : (
                  <button
                    onClick={() => changeVersion(version.name)}
                    disabled={isChanging}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-medium transition-all border border-white/10 flex items-center justify-center gap-2"
                  >
                    {isChanging ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <Download size={18} />
                    )}
                    {isChanging ? "Installing..." : "Install Version"}
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
