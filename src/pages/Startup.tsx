import React, { useState } from "react";
import { PlayCircle, Save, Check } from "lucide-react";

export const Startup = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <PlayCircle className="text-red-500" size={28} />
            Startup Configuration
          </h2>
          <p className="text-sm text-gray-400 mt-1">Modify startup parameters and variables.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
            isSaving
              ? "bg-green-600 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              : "bg-red-600 hover:bg-red-500 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          }`}
        >
          {isSaving ? (
            <>
              <Check size={16} className="animate-pulse" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Startup Command</h3>
        <div className="bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
          java -Xms128M -Xmx&#123;&#123;SERVER_MEMORY&#125;&#125;M -Dterminal.jline=false -Dterminal.ansi=true -jar &#123;&#123;SERVER_JARFILE&#125;&#125;
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Server Jar File</h3>
          <input 
            type="text" 
            defaultValue="server.jar"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500/50 outline-none font-mono text-sm"
          />
        </div>
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Minecraft Version</h3>
          <input 
            type="text" 
            defaultValue="latest"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500/50 outline-none font-mono text-sm"
          />
        </div>
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Build Number</h3>
          <input 
            type="text" 
            defaultValue="latest"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500/50 outline-none font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
};
