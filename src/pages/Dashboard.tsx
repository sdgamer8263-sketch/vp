import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Server, Cpu, HardDrive, Activity, Play, Square, RefreshCw, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { servers, theme } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Your Servers</h2>
        <button
          className="px-4 py-2 rounded-lg text-white font-medium shadow-lg transition-all hover:opacity-90 border border-white/10"
          style={{ backgroundColor: theme.primary }}
        >
          Create Server
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <div key={server.id} className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${server.status === 'running' ? 'bg-green-400 text-green-400' : server.status === 'suspended' ? 'bg-red-400 text-red-400' : 'bg-gray-400 text-gray-400'}`}></div>
                <h3 className="font-semibold text-white truncate">{server.name}</h3>
              </div>
              <Link to={`/server/${server.id}`} className="p-2 text-gray-400 hover:text-white transition-colors">
                <TerminalSquare size={20} />
              </Link>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Cpu size={14} className="mr-1.5" /> CPU
                  </div>
                  <div className="text-lg font-semibold text-white">{server.cpu.used}%</div>
                  <div className="w-full bg-black/50 rounded-full h-1.5 border border-white/5">
                    <div className="bg-blue-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" style={{ width: `${(server.cpu.used / server.cpu.total) * 100}%` }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Activity size={14} className="mr-1.5" /> RAM
                  </div>
                  <div className="text-lg font-semibold text-white">{(server.ram.used / 1024).toFixed(1)} GB</div>
                  <div className="w-full bg-black/50 rounded-full h-1.5 border border-white/5">
                    <div className="bg-green-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" style={{ width: `${(server.ram.used / server.ram.total) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/10">
                <div className="flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <HardDrive size={14} className="mr-1.5" /> Disk Usage
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-gray-200">{(server.disk.used / 1024).toFixed(1)} GB / {(server.disk.total / 1024).toFixed(1)} GB</span>
                  <span className="text-xs text-gray-400">{Math.round((server.disk.used / server.disk.total) * 100)}%</span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-1.5 mt-1 border border-white/5">
                  <div className="bg-purple-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]" style={{ width: `${(server.disk.used / server.disk.total) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 px-5 py-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">Uptime: {server.uptime}</span>
              <div className="flex space-x-2">
                <button className="p-1.5 bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors" title="Start">
                  <Play size={16} />
                </button>
                <button className="p-1.5 bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors" title="Restart">
                  <RefreshCw size={16} />
                </button>
                <button className="p-1.5 bg-white/5 border border-white/10 rounded-md text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors" title="Stop">
                  <Square size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
