import React, { useEffect, useState } from 'react';
import { ServerContext } from '@/state/server';
import Can from '@/components/elements/Can';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import tw from 'twin.macro';
import ServerConsole from '@/components/server/ServerConsole';
import StatGraphs from '@/components/server/StatGraphs';
import PowerControls from '@/components/server/PowerControls';
import { Server as ServerIcon, Cpu, MemoryStick, HardDrive, Activity } from 'lucide-react';

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
                                    <span css={tw`text-neutral-400`}>CPU</span>
                                    <span css={tw`text-white font-mono`}>{stats.cpu.toFixed(2)}%</span>
                                </div>
                                <div css={tw`w-full bg-neutral-800 rounded-full h-2 overflow-hidden`}>
                                    <div css={tw`bg-blue-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${Math.min(stats.cpu, 100)}%` }} />
                                </div>
                            </div>
                            <div>
                                <div css={tw`flex justify-between text-sm mb-1`}>
                                    <span css={tw`text-neutral-400`}>Memory</span>
                                    <span css={tw`text-white font-mono`}>{(stats.memory / 1024).toFixed(2)} GB / {(server.limits.memory / 1024).toFixed(2)} GB</span>
                                </div>
                                <div css={tw`w-full bg-neutral-800 rounded-full h-2 overflow-hidden`}>
                                    <div css={tw`bg-purple-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${(stats.memory / server.limits.memory) * 100}%` }} />
                                </div>
                            </div>
                            <div>
                                <div css={tw`flex justify-between text-sm mb-1`}>
                                    <span css={tw`text-neutral-400`}>Disk</span>
                                    <span css={tw`text-white font-mono`}>{(stats.disk / 1024).toFixed(2)} GB / {(server.limits.disk / 1024).toFixed(2)} GB</span>
                                </div>
                                <div css={tw`w-full bg-neutral-800 rounded-full h-2 overflow-hidden`}>
                                    <div css={tw`bg-emerald-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${(stats.disk / server.limits.disk) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ServerContentBlock>
    );
};
