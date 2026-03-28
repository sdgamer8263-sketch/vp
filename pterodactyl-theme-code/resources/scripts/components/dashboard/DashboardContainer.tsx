import React, { useEffect, useState } from 'react';
import { Server } from '@/api/server/getServer';
import getServers from '@/api/getServers';
import ServerRow from '@/components/dashboard/ServerRow';
import Spinner from '@/components/elements/Spinner';
import PageContentBlock from '@/components/elements/PageContentBlock';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from 'easy-peasy';
import { usePersistedState } from '@/plugins/usePersistedState';
import Pagination from '@/components/elements/Pagination';
import tw from 'twin.macro';
import { Server as ServerIcon, Cpu, MemoryStick, Activity } from 'lucide-react';

export default () => {
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const uuid = useStoreState(state => state.user.data!.uuid);
    const rootAdmin = useStoreState(state => state.user.data!.rootAdmin);
    const [servers, setServers] = useState<Server[]>([]);
    const [showOnlyAdmin, setShowOnlyAdmin] = usePersistedState(`${uuid}:show_all_servers`, false);

    useEffect(() => {
        clearFlashes('dashboard');
        getServers({ page: 1, type: showOnlyAdmin ? 'admin' : undefined })
            .then(servers => setServers(servers.items))
            .catch(error => clearAndAddHttpError({ key: 'dashboard', error }));
    }, [showOnlyAdmin]);

    return (
        <PageContentBlock title={'Dashboard'} showFlashKey={'dashboard'}>
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-white mb-2 flex items-center gap-3`}>
                    <Activity css={tw`text-blue-500`} size={32} />
                    Your Servers
                </h1>
                <p css={tw`text-neutral-400`}>Manage and monitor your game servers in real-time.</p>
            </div>

            {rootAdmin && (
                <div css={tw`mb-6 flex justify-end`}>
                    <button
                        onClick={() => setShowOnlyAdmin(!showOnlyAdmin)}
                        css={tw`px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors text-sm font-medium border border-neutral-700`}
                    >
                        {showOnlyAdmin ? 'Showing Admin Servers' : 'Showing My Servers'}
                    </button>
                </div>
            )}

            {!servers ? (
                <Spinner centered size={'large'} />
            ) : (
                <div css={tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {servers.length > 0 ? (
                        servers.map((server, index) => (
                            <ServerRow key={server.uuid} server={server} css={tw`mt-2`} />
                        ))
                    ) : (
                        <p css={tw`text-center text-sm text-neutral-400 col-span-full py-12 bg-neutral-800/50 rounded-xl border border-neutral-800`}>
                            There are no servers associated with your account.
                        </p>
                    )}
                </div>
            )}
        </PageContentBlock>
    );
};
