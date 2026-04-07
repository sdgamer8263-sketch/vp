import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { Server } from "../context/AppContext";
import {
  Play,
  Square,
  RefreshCw,
  Terminal,
  Cpu,
  HardDrive,
  Activity,
  Clock,
} from "lucide-react";

export const ServerConsole = ({ server }: { server?: Server }) => {
  const { updateServerStatus } = useAppContext();
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (server?.status === "running") {
      const initialLogs = [
        "[Pterodactyl Daemon]: Checking server disk space...",
        "[Pterodactyl Daemon]: Updating process configuration...",
        "[Pterodactyl Daemon]: Ensuring file permissions are set correctly...",
        "[Pterodactyl Daemon]: Pulling Docker container image...",
        "[Pterodactyl Daemon]: Starting server container...",
        "Starting server...",
        "Loading libraries, please wait...",
        "[Server thread/INFO]: Starting minecraft server version 1.20.4",
        "[Server thread/INFO]: Loading properties",
        "[Server thread/INFO]: Default game type: SURVIVAL",
        "[Server thread/INFO]: Generating keypair",
        "[Server thread/INFO]: Starting Minecraft server on *:25565",
        "[Server thread/INFO]: Using default channel type",
        '[Server thread/INFO]: Preparing level "world"',
        "[Server thread/INFO]: Preparing start region for dimension minecraft:overworld",
        "[Server thread/INFO]: Time elapsed: 2456 ms",
        '[Server thread/INFO]: Done (4.567s)! For help, type "help"',
      ];
      setLogs(initialLogs);
    } else {
      setLogs(["[Pterodactyl Daemon]: Server marked as offline..."]);
    }
  }, [server]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLogs((prev) => [
      ...prev,
      `> ${input}`,
      `[Server thread/INFO]: Unknown command. Type "help" for help.`,
    ]);
    setInput("");
  };

  const handleStart = () => {
    if (server) updateServerStatus(server.id, "running");
  };

  const handleStop = () => {
    if (server) updateServerStatus(server.id, "offline");
  };

  const handleRestart = () => {
    if (server) {
      updateServerStatus(server.id, "offline");
      setTimeout(() => updateServerStatus(server.id, "running"), 2000);
    }
  };

  if (!server) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="flex space-x-3">
          <button 
            onClick={handleStart}
            disabled={server.status === "running"}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={18} className="text-green-400" />
            <span>Start</span>
          </button>
          <button 
            onClick={handleRestart}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-all shadow-sm"
          >
            <RefreshCw size={18} className="text-blue-400" />
            <span>Restart</span>
          </button>
          <button 
            onClick={handleStop}
            disabled={server.status === "offline"}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-red-500/20 hover:border-red-500/30 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Square size={18} className="text-red-400" />
            <span>Stop</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/10 flex flex-col h-[500px]">
            <div className="bg-white/5 px-4 py-3 flex items-center space-x-2 border-b border-white/10">
              <Terminal size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-200">Console</span>
            </div>
            <div
              ref={consoleRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300 space-y-1"
            >
              {logs.map((log, i) => (
                <div key={i} className="break-words">
                  {log}
                </div>
              ))}
            </div>
            <form
              onSubmit={handleCommand}
              className="p-3 bg-white/5 border-t border-white/10"
            >
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 font-mono">
                  {">"}
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command..."
                  className="w-full bg-black/50 text-gray-100 placeholder-gray-500 border border-white/10 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm transition-all"
                  disabled={server.status !== "running"}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-5">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Resource Usage
            </h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-400 font-medium whitespace-nowrap">
                    <Cpu size={16} className="mr-2 text-blue-400" /> CPU
                  </span>
                  <span className="font-mono text-gray-200 whitespace-nowrap ml-2">
                    {server.cpu.used}% / {server.cpu.total}%
                  </span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-2 border border-white/5">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                    style={{
                      width: `${(server.cpu.used / server.cpu.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-400 font-medium whitespace-nowrap">
                    <Activity size={16} className="mr-2 text-green-400" /> RAM
                  </span>
                  <span className="font-mono text-gray-200 whitespace-nowrap ml-2">
                    {(server.ram.used / 1024).toFixed(2)} GB /{" "}
                    {(server.ram.total / 1024).toFixed(2)} GB
                  </span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-2 border border-white/5">
                  <div
                    className="bg-green-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    style={{
                      width: `${(server.ram.used / server.ram.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-400 font-medium whitespace-nowrap">
                    <HardDrive size={16} className="mr-2 text-purple-400" />{" "}
                    Disk
                  </span>
                  <span className="font-mono text-gray-200 whitespace-nowrap ml-2">
                    {(server.disk.used / 1024).toFixed(2)} GB /{" "}
                    {(server.disk.total / 1024).toFixed(2)} GB
                  </span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-2 border border-white/5">
                  <div
                    className="bg-purple-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(192,132,252,0.5)]"
                    style={{
                      width: `${(server.disk.used / server.disk.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-5">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Server Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400 flex items-center whitespace-nowrap">
                  <Clock size={16} className="mr-2" /> Uptime
                </span>
                <span className="text-sm font-medium text-gray-200 whitespace-nowrap text-right">
                  {server.uptime}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400 flex items-center whitespace-nowrap">
                  <Terminal size={16} className="mr-2" /> Node
                </span>
                <span className="text-sm font-medium text-gray-200 whitespace-nowrap text-right">
                  Node-01
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400 flex items-center whitespace-nowrap">
                  <HardDrive size={16} className="mr-2" /> IP Address
                </span>
                <span className="text-sm font-mono text-gray-200 whitespace-nowrap text-right">
                  192.168.1.100:25565
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
