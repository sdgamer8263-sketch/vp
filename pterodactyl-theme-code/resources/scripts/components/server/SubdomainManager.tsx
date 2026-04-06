import React, { useState } from 'react';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import GlassTheme from '@/components/elements/GlassTheme';
import tw from 'twin.macro';
import { Globe, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/elements/Button';
import Field from '@/components/elements/Field';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';

export default () => {
    const [subdomains, setSubdomains] = useState([
        { id: 1, name: 'play', domain: 'myserver.com', status: 'active' }
    ]);

    const submit = (values: any, { setSubmitting, resetForm }: any) => {
        setTimeout(() => {
            setSubdomains([...subdomains, {
                id: Math.random(),
                name: values.subdomain,
                domain: 'myserver.com',
                status: 'pending'
            }]);
            setSubmitting(false);
            resetForm();
        }, 1000);
    };

    const deleteSubdomain = (id: number) => {
        setSubdomains(subdomains.filter(s => s.id !== id));
    };

    return (
        <ServerContentBlock title={'Subdomains'}>
            <GlassTheme />
            <div css={tw`mb-8`}>
                <h1 css={tw`text-3xl font-bold text-white mb-2 flex items-center gap-3`}>
                    <Globe css={tw`text-blue-500`} size={32} />
                    Subdomain Manager
                </h1>
                <p css={tw`text-neutral-400`}>Create and manage custom subdomains for your server to make it easier for players to connect.</p>
            </div>

            <div css={tw`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                <div css={tw`lg:col-span-1`}>
                    <div css={tw`bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl`}>
                        <h3 css={tw`text-lg font-bold text-white mb-4 flex items-center gap-2`}>
                            <Plus size={20} css={tw`text-green-400`} />
                            Create Subdomain
                        </h3>
                        <Formik
                            onSubmit={submit}
                            initialValues={{ subdomain: '' }}
                            validationSchema={object().shape({
                                subdomain: string().required('Subdomain is required.').matches(/^[a-zA-Z0-9-]+$/, 'Only letters, numbers, and hyphens allowed.')
                            })}
                        >
                            {({ isSubmitting }) => (
                                <Form css={tw`space-y-4`}>
                                    <div>
                                        <label css={tw`block text-sm font-medium text-neutral-300 mb-1`}>Subdomain Name</label>
                                        <div css={tw`flex items-center`}>
                                            <Field
                                                name="subdomain"
                                                placeholder="play"
                                                css={tw`flex-1 bg-black/50 border border-white/10 rounded-l-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none`}
                                            />
                                            <div css={tw`bg-neutral-800 border border-l-0 border-white/10 rounded-r-lg px-4 py-2 text-neutral-400`}>
                                                .myserver.com
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={isSubmitting} css={tw`w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-all`}>
                                        {isSubmitting ? 'Creating...' : 'Create Subdomain'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

                <div css={tw`lg:col-span-2`}>
                    <div css={tw`bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl`}>
                        <h3 css={tw`text-lg font-bold text-white mb-4`}>Active Subdomains</h3>
                        
                        {subdomains.length === 0 ? (
                            <div css={tw`text-center py-8 text-neutral-400 bg-black/20 rounded-xl border border-white/5`}>
                                No subdomains configured yet.
                            </div>
                        ) : (
                            <div css={tw`space-y-3`}>
                                {subdomains.map(sub => (
                                    <div key={sub.id} css={tw`flex items-center justify-between bg-black/40 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-all`}>
                                        <div css={tw`flex items-center gap-4`}>
                                            <div css={tw`w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30`}>
                                                <Globe size={20} css={tw`text-blue-400`} />
                                            </div>
                                            <div>
                                                <div css={tw`text-white font-medium text-lg`}>{sub.name}.{sub.domain}</div>
                                                <div css={tw`flex items-center gap-1 text-sm mt-0.5 ${sub.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                                                    {sub.status === 'active' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                                    {sub.status === 'active' ? 'Active & Routing' : 'Pending DNS Propagation'}
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => deleteSubdomain(sub.id)}
                                            css={tw`p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors`}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ServerContentBlock>
    );
};
