import React, { useState } from 'react';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import GlassTheme from '@/components/elements/GlassTheme';
import tw from 'twin.macro';
import { Egg, Settings, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '@/components/elements/Button';

export default () => {
    const [currentEgg, setCurrentEgg] = useState('Paper');
    const [isChanging, setIsChanging] = useState(false);

    const eggs = [
        { id: 'paper', name: 'Paper', description: 'High performance Spigot fork that aims to fix gameplay and mechanics inconsistencies.', category: 'Minecraft' },
        { id: 'vanilla', name: 'Vanilla Minecraft', description: 'The original, unmodified Minecraft server software from Mojang.', category: 'Minecraft' },
        { id: 'forge', name: 'Forge', description: 'The most popular modding API for Minecraft.', category: 'Minecraft' },
        { id: 'bungeecord', name: 'BungeeCord', description: 'A proxy server that allows you to link multiple Minecraft servers together.', category: 'Proxy' },
        { id: 'waterdogpe', name: 'WaterdogPE', description: 'A proxy server for Minecraft Bedrock Edition.', category: 'Proxy' },
        { id: 'bedrock', name: 'Bedrock Dedicated', description: 'The official dedicated server software for Minecraft Bedrock Edition.', category: 'Minecraft Bedrock' },
    ];

    const changeEgg = (eggName: string) => {
        setIsChanging(true);
        setTimeout(() => {
            setCurrentEgg(eggName);
            setIsChanging(false);
        }, 2000);
    };

    return (
        <ServerContentBlock title={'Egg Changer'}>
            <GlassTheme />
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-white mb-2 flex items-center gap-3`}>
                    <Egg css={tw`text-yellow-500`} size={32} />
                    Egg Changer
                </h1>
                <p css={tw`text-neutral-400`}>Change the core software (Egg) your server runs on. Warning: This will reinstall your server and may delete files.</p>
            </div>

            <div css={tw`bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8 flex items-start gap-4`}>
                <AlertTriangle size={24} css={tw`text-red-400 flex-shrink-0 mt-1`} />
                <div>
                    <h3 css={tw`text-red-400 font-bold text-lg mb-1`}>Danger Zone</h3>
                    <p css={tw`text-red-300/80 text-sm`}>Changing your server's egg will trigger a full reinstall. This process will overwrite core server files and may result in data loss if you do not have a backup. Please ensure you have backed up your world and important configurations before proceeding.</p>
                </div>
            </div>

            <div css={tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {eggs.map(egg => {
                    const isActive = currentEgg === egg.name;
                    return (
                        <div key={egg.id} css={[tw`bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl transition-all flex flex-col h-full`, isActive ? tw`border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]` : tw`hover:border-white/20`]}>
                            <div css={tw`flex justify-between items-start mb-4`}>
                                <div css={tw`flex items-center gap-3`}>
                                    <div css={tw`w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30`}>
                                        <Egg size={24} css={tw`text-yellow-400`} />
                                    </div>
                                    <div>
                                        <h3 css={tw`text-lg font-bold text-white`}>{egg.name}</h3>
                                        <span css={tw`text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300`}>{egg.category}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p css={tw`text-neutral-400 text-sm flex-1 mb-6`}>{egg.description}</p>
                            
                            <div css={tw`mt-auto pt-4 border-t border-white/10`}>
                                {isActive ? (
                                    <div css={tw`w-full flex items-center justify-center gap-2 text-yellow-400 font-medium py-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20`}>
                                        <CheckCircle size={18} /> Current Egg
                                    </div>
                                ) : (
                                    <Button 
                                        onClick={() => changeEgg(egg.name)}
                                        disabled={isChanging}
                                        css={tw`w-full bg-red-600/80 hover:bg-red-500 text-white py-2.5 rounded-xl font-medium transition-all border border-red-500/50 flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(239,68,68,0.3)]`}
                                    >
                                        {isChanging ? <RefreshCw size={18} css={tw`animate-spin`} /> : <Settings size={18} />}
                                        {isChanging ? 'Changing Egg...' : 'Change to this Egg'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </ServerContentBlock>
    );
};
