import React, { useEffect, useState } from 'react';
import { ServerContext } from '@/state/server';
import Can from '@/components/elements/Can';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import GlassTheme from '@/components/elements/GlassTheme';
import tw from 'twin.macro';
import ServerConsole from '@/components/server/ServerConsole';
import StatGraphs from '@/components/server/StatGraphs';
import PowerControls from '@/components/server/PowerControls';
import { Server as ServerIcon, Cpu, MemoryStick, HardDrive, Activity, Globe, Package, Box, Layers, Image as ImageIcon, Settings, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default () => {
    const [stats, setStats] = useState({ cpu: 0, memory: 0, disk: 0 });
    const status = ServerContext.useStoreState(state => state.status.value);
    const server = ServerContext.useStoreState(state => state.server.data!);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fetch real stats from websocket or API here
            // Mocking for demonstration
            setStats({
                cpu: Math.random() * 100,
                memory: Math.random() * server.limits.memory,
                disk: Math.random() * server.limits.disk,
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [server]);

    return (
        <ServerContentBlock title={'Console'}>
            <GlassTheme />
            <div css={tw`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6`}>
                <div css={tw`lg:col-span-2 bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-800 p-6 shadow-2xl`}>
                    <div css={tw`flex justify-between items-center mb-4 border-b border-neutral-800 pb-4`}>
                        <h2 css={tw`text-xl font-bold flex items-center gap-2 text-white`}>
                            <Activity css={tw`text-blue-500`} size={24} />
                            Live Console
                        </h2>
                        <div css={tw`flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700`}>
                            <div css={[
                                tw`w-2 h-2 rounded-full`,
                                status === 'running' ? tw`bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]` :
                                status === 'offline' ? tw`bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]` :
                                tw`bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse`
                            ]} />
                            <span css={tw`text-xs font-medium text-neutral-300 uppercase tracking-wider`}>{status || 'Connecting...'}</span>
                        </div>
                    </div>
                    <div css={tw`h-[500px] rounded-xl overflow-hidden border border-black/50`}>
                        <ServerConsole />
                    </div>
                </div>

                <div css={tw`space-y-6`}>
                    <div css={tw`bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-800 p-6 shadow-2xl`}>
                        <h3 css={tw`text-lg font-bold mb-4 text-white flex items-center gap-2`}>
                            <ServerIcon css={tw`text-purple-500`} size={20} />
                            Power Controls
                        </h3>
                        <PowerControls />
                    </div>

                    <div css={tw`bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-800 p-6 shadow-2xl`}>
                        <h3 css={tw`text-lg font-bold mb-4 text-white flex items-center gap-2`}>
                            <Cpu css={tw`text-blue-500`} size={20} />
                            Resource Usage
                        </h3>
                        <div css={tw`space-y-4`}>
                            <div>
                                <div css={tw`flex justify-between text-sm mb-1`}>
                                    <span css={tw`text-neutral-400`}>Uptime</span>
                                    <span css={tw`text-white font-mono`}>
                                        {status === 'running' ? Math.floor(stats.cpu * 10) + 'm ' + Math.floor(stats.cpu) + 's' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div css={tw`flex justify-between text-sm mb-1`}>
                                    <span css={tw`text-neutral-400`}>CPU</span>
                                    <span css={tw`text-white font-mono`}>{stats.cpu.toFixed(2)}% / {server.limits.cpu === 0 ? 'Unlimited' : server.limits.cpu + '%'}</span>
                                </div>
                                <div css={tw`w-full bg-neutral-800 rounded-full h-2 overflow-hidden`}>
                                    <div css={tw`bg-blue-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${Math.min((stats.cpu / (server.limits.cpu || 100)) * 100, 100)}%` }} />
                                </div>
                            </div>
                            <div>
                                <div css={tw`flex justify-between text-sm mb-1`}>
                                    <span css={tw`text-neutral-400`}>Memory</span>
                                    <span css={tw`text-white font-mono`}>{(stats.memory / 1024).toFixed(2)} GB / {server.limits.memory === 0 ? 'Unlimited' : (server.limits.memory / 1024).toFixed(2) + ' GB'}</span>
                                </div>
                                <div css={tw`w-full bg-neutral-800 rounded-full h-2 overflow-hidden`}>
                                    <div css={tw`bg-purple-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${server.limits.memory === 0 ? 0 : (stats.memory / server.limits.memory) * 100}%` }} />
                                </div>
                            </div>
                            <div>
                                <div css={tw`flex justify-between text-sm mb-1`}>
                                    <span css={tw`text-neutral-400`}>Disk</span>
                                    <span css={tw`text-white font-mono`}>{(stats.disk / 1024).toFixed(2)} GB / {server.limits.disk === 0 ? 'Unlimited' : (server.limits.disk / 1024).toFixed(2) + ' GB'}</span>
                                </div>
                                <div css={tw`w-full bg-neutral-800 rounded-full h-2 overflow-hidden`}>
                                    <div css={tw`bg-emerald-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${server.limits.disk === 0 ? 0 : (stats.disk / server.limits.disk) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div css={tw`bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-800 p-6 shadow-2xl`}>
                        <h3 css={tw`text-lg font-bold mb-4 text-white flex items-center gap-2`}>
                            <Settings css={tw`text-orange-500`} size={20} />
                            Management
                        </h3>
                        <div css={tw`grid grid-cols-2 gap-3`}>
                            <Link to={`/server/${server.id}/subdomains`} css={tw`flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-400 transition-colors text-neutral-300`}>
                                <Globe size={20} css={tw`mb-1`} />
                                <span css={tw`text-xs font-medium`}>Subdomains</span>
                            </Link>
                            <Link to={`/server/${server.id}/plugins`} css={tw`flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-purple-400 transition-colors text-neutral-300`}>
                                <Package size={20} css={tw`mb-1`} />
                                <span css={tw`text-xs font-medium`}>Plugins</span>
                            </Link>
                            <Link to={`/server/${server.id}/mods`} css={tw`flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-orange-500/20 hover:border-orange-500/30 hover:text-orange-400 transition-colors text-neutral-300`}>
                                <Box size={20} css={tw`mb-1`} />
                                <span css={tw`text-xs font-medium`}>Mods</span>
                            </Link>
                            <Link to={`/server/${server.id}/addons`} css={tw`flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-teal-500/20 hover:border-teal-500/30 hover:text-teal-400 transition-colors text-neutral-300`}>
                                <Puzzle size={20} css={tw`mb-1`} />
                                <span css={tw`text-xs font-medium`}>Addons</span>
                            </Link>
                            <Link to={`/server/${server.id}/versions`} css={tw`flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors text-neutral-300`}>
                                <Layers size={20} css={tw`mb-1`} />
                                <span css={tw`text-xs font-medium`}>Versions</span>
                            </Link>
                            <Link to={`/server/${server.id}/resource-packs`} css={tw`flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-pink-500/20 hover:border-pink-500/30 hover:text-pink-400 transition-colors text-neutral-300`}>
                                <ImageIcon size={20} css={tw`mb-1`} />
                                <span css={tw`text-xs font-medium`}>Resource Packs</span>
                            </Link>
                            <Link to={`/server/${server.id}/eggs`} css={tw`flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-colors text-neutral-300 col-span-2`}>
                                <Settings size={20} css={tw`mb-1`} />
                                <span css={tw`text-xs font-medium`}>Egg Changer</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ServerContentBlock>
    );
};
