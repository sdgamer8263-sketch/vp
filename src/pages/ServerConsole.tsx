import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Play, Square, RefreshCw, Terminal, Cpu, HardDrive, Activity, Clock, ArrowLeft } from 'lucide-react';

export const ServerConsole = () => {
  const { id } = useParams<{ id: string }>();
  const { servers, theme } = useAppContext();
  const server = servers.find((s) => s.id === id);
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (server?.status === 'running') {
      const initialLogs = [
        '[Pterodactyl Daemon]: Checking server disk space...',
        '[Pterodactyl Daemon]: Updating process configuration...',
        '[Pterodactyl Daemon]: Ensuring file permissions are set correctly...',
        '[Pterodactyl Daemon]: Pulling Docker container image...',
        '[Pterodactyl Daemon]: Starting server container...',
        'Starting server...',
        'Loading libraries, please wait...',
        '[Server thread/INFO]: Starting minecraft server version 1.20.4',
        '[Server thread/INFO]: Loading properties',
        '[Server thread/INFO]: Default game type: SURVIVAL',
        '[Server thread/INFO]: Generating keypair',
        '[Server thread/INFO]: Starting Minecraft server on *:25565',
        '[Server thread/INFO]: Using default channel type',
        '[Server thread/INFO]: Preparing level "world"',
        '[Server thread/INFO]: Preparing start region for dimension minecraft:overworld',
        '[Server thread/INFO]: Time elapsed: 2456 ms',
        '[Server thread/INFO]: Done (4.567s)! For help, type "help"',
      ];
      setLogs(initialLogs);
    } else {
      setLogs(['[Pterodactyl Daemon]: Server marked as offline...']);
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
    setLogs((prev) => [...prev, `> ${input}`, `[Server thread/INFO]: Unknown command. Type "help" for help.`]);
    setInput('');
  };

  if (!server) return <div className="p-8 text-center text-gray-500">Server not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {server.name}
              <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${server.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {server.status.toUpperCase()}
              </span>
            </h2>
            <p className="text-sm text-gray-500">{server.id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Play size={18} className="text-green-500" />
            <span>Start</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <RefreshCw size={18} className="text-blue-500" />
            <span>Restart</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Square size={18} className="text-red-500" />
            <span>Stop</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 flex flex-col h-[500px]">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
              <Terminal size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Console</span>
            </div>
            <div 
              ref={consoleRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300 space-y-1"
            >
              {logs.map((log, i) => (
                <div key={i} className="break-words">{log}</div>
              ))}
            </div>
            <form onSubmit={handleCommand} className="p-3 bg-gray-800 border-t border-gray-700">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500 font-mono">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command..."
                  className="w-full bg-gray-900 text-gray-100 placeholder-gray-600 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-sm"
                  disabled={server.status !== 'running'}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Resource Usage</h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-600 font-medium"><Cpu size={16} className="mr-2 text-blue-500" /> CPU</span>
                  <span className="font-mono text-gray-800">{server.cpu.used}% / {server.cpu.total}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(server.cpu.used / server.cpu.total) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-600 font-medium"><Activity size={16} className="mr-2 text-green-500" /> RAM</span>
                  <span className="font-mono text-gray-800">{(server.ram.used / 1024).toFixed(2)} GB / {(server.ram.total / 1024).toFixed(2)} GB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(server.ram.used / server.ram.total) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-600 font-medium"><HardDrive size={16} className="mr-2 text-purple-500" /> Disk</span>
                  <span className="font-mono text-gray-800">{(server.disk.used / 1024).toFixed(2)} GB / {(server.disk.total / 1024).toFixed(2)} GB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(server.disk.used / server.disk.total) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">Server Info</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center"><Clock size={16} className="mr-2" /> Uptime</span>
                <span className="text-sm font-medium text-gray-800">{server.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center"><Terminal size={16} className="mr-2" /> Node</span>
                <span className="text-sm font-medium text-gray-800">Node-01</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center"><HardDrive size={16} className="mr-2" /> IP Address</span>
                <span className="text-sm font-mono text-gray-800">192.168.1.100:25565</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
