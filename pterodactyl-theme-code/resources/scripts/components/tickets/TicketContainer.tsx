import React, { useState } from 'react';
import PageContentBlock from '@/components/elements/PageContentBlock';
import GlassTheme from '@/components/elements/GlassTheme';
import tw from 'twin.macro';
import { Ticket as TicketIcon, Plus, MessageSquare, CheckCircle, Clock, Send } from 'lucide-react';
import { useStoreState } from 'easy-peasy';
import Button from '@/components/elements/Button';
import Field from '@/components/elements/Field';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import useFlash from '@/plugins/useFlash';

interface Reply {
    id: string;
    author: string;
    content: string;
    createdAt: string;
    isAdmin: boolean;
}

interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'closed';
    createdAt: string;
    createdBy: string;
    replies?: Reply[];
}

export default () => {
    const { clearFlashes } = useFlash();
    const user = useStoreState(state => state.user.data!);
    const [isCreating, setIsCreating] = useState(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

    const submit = (values: { title: string; description: string }, { setSubmitting, resetForm }: any) => {
        clearFlashes();
        const newTicket: Ticket = {
            id: `TKT-${Math.floor(Math.random() * 10000)}`,
            title: values.title,
            description: values.description,
            status: 'open',
            createdAt: new Date().toISOString().split('T')[0],
            createdBy: user.username,
            replies: []
        };
        setTickets([newTicket, ...tickets]);
        setIsCreating(false);
        setSubmitting(false);
        resetForm();
    };

    const closeTicket = (id: string) => {
        setTickets(tickets.map((t) => (t.id === id ? { ...t, status: 'closed' } : t)));
    };

    const addReply = (id: string) => {
        if (!replyText[id]) return;
        
        const newReply: Reply = {
            id: Math.random().toString(),
            author: user.username,
            content: replyText[id],
            createdAt: new Date().toLocaleString(),
            isAdmin: user.rootAdmin
        };

        setTickets(tickets.map((t) => {
            if (t.id === id) {
                return { ...t, replies: [...(t.replies || []), newReply] };
            }
            return t;
        }));
        
        setReplyText({ ...replyText, [id]: '' });
    };

    return (
        <PageContentBlock title={'Support Tickets'} showFlashKey={'tickets'}>
            <GlassTheme />
            <div css={tw`mb-8 flex justify-between items-center`}>
                <div>
                    <h1 css={tw`text-3xl font-bold text-white mb-2 flex items-center gap-3`}>
                        <TicketIcon css={tw`text-blue-500`} size={32} />
                        Support Tickets
                    </h1>
                    <p css={tw`text-neutral-400`}>Need help? Create a ticket and our team will assist you.</p>
                </div>
                {!isCreating && (
                    <Button onClick={() => setIsCreating(true)} css={tw`flex items-center gap-2`}>
                        <Plus size={20} /> New Ticket
                    </Button>
                )}
            </div>

            {isCreating && (
                <div css={tw`bg-neutral-800 p-6 rounded-xl shadow-md border border-neutral-700 mb-8`}>
                    <h3 css={tw`text-lg font-semibold text-white mb-4`}>Create New Ticket</h3>
                    <Formik
                        onSubmit={submit}
                        initialValues={{ title: '', description: '' }}
                        validationSchema={object().shape({
                            title: string().required('A subject is required.').max(191),
                            description: string().required('A description is required.'),
                        })}
                    >
                        {({ isSubmitting }) => (
                            <Form css={tw`space-y-4`}>
                                <Field
                                    name={'title'}
                                    label={'Subject'}
                                    description={'Brief summary of your issue'}
                                />
                                <div css={tw`flex flex-col`}>
                                    <label css={tw`text-sm font-medium text-neutral-300 mb-1`}>Description</label>
                                    <Field
                                        name={'description'}
                                        as={'textarea'}
                                        rows={5}
                                        css={tw`w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none`}
                                    />
                                </div>
                                <div css={tw`flex justify-end gap-3 pt-4`}>
                                    <Button type="button" isSecondary onClick={() => setIsCreating(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        Submit Ticket
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}

            <div css={tw`space-y-4`}>
                {tickets.length === 0 ? (
                    <div css={tw`bg-neutral-800/50 p-12 rounded-xl border border-neutral-800 text-center flex flex-col items-center justify-center`}>
                        <div css={tw`w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mb-4`}>
                            <TicketIcon size={32} css={tw`text-neutral-500`} />
                        </div>
                        <h3 css={tw`text-lg font-medium text-white`}>No tickets found</h3>
                        <p css={tw`text-neutral-400 mt-1`}>You haven't created any support tickets yet.</p>
                    </div>
                ) : (
                    tickets.map((ticket) => (
                        <div key={ticket.id} css={tw`bg-neutral-800 p-5 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-colors`}>
                            <div css={tw`flex justify-between items-start`}>
                                <div css={tw`flex items-start gap-4`}>
                                    <div css={[tw`p-3 rounded-lg`, ticket.status === 'open' ? tw`bg-blue-500/10` : tw`bg-neutral-700/50`]}>
                                        {ticket.status === 'open' ? (
                                            <MessageSquare size={24} css={tw`text-blue-500`} />
                                        ) : (
                                            <CheckCircle size={24} css={tw`text-neutral-500`} />
                                        )}
                                    </div>
                                    <div>
                                        <div css={tw`flex items-center gap-3`}>
                                            <h3 css={tw`text-lg font-semibold text-white`}>{ticket.title}</h3>
                                            <span css={[tw`px-2.5 py-0.5 rounded-full text-xs font-medium`, ticket.status === 'open' ? tw`bg-green-500/20 text-green-400` : tw`bg-neutral-700 text-neutral-400`]}>
                                                {ticket.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p css={tw`text-sm text-neutral-400 mt-1 flex items-center`}>
                                            <span css={tw`font-medium text-neutral-300 mr-2`}>#{ticket.id}</span>
                                            <Clock size={14} css={tw`mr-1`} /> {ticket.createdAt}
                                            <span css={tw`mx-2`}>•</span>
                                            By {ticket.createdBy}
                                        </p>
                                    </div>
                                </div>
                                {ticket.status === 'open' && user.rootAdmin && (
                                    <Button isSecondary size="small" onClick={() => closeTicket(ticket.id)}>
                                        Close Ticket
                                    </Button>
                                )}
                            </div>
                            <div css={tw`mt-4 pl-16`}>
                                <div css={tw`text-neutral-300 bg-neutral-900 p-4 rounded-lg border border-neutral-800 mb-4`}>
                                    <div css={tw`font-medium text-white mb-2`}>Original Issue:</div>
                                    {ticket.description}
                                </div>
                                
                                {ticket.replies && ticket.replies.length > 0 && (
                                    <div css={tw`space-y-3 mb-4`}>
                                        {ticket.replies.map((reply) => (
                                            <div key={reply.id} css={[tw`p-4 rounded-lg border`, reply.isAdmin ? tw`bg-blue-500/10 border-blue-500/20` : tw`bg-neutral-900 border-neutral-800`]}>
                                                <div css={tw`flex justify-between items-center mb-1`}>
                                                    <span css={[tw`font-medium`, reply.isAdmin ? tw`text-blue-400` : tw`text-white`]}>{reply.author}</span>
                                                    <span css={tw`text-xs text-neutral-500`}>{reply.createdAt}</span>
                                                </div>
                                                <p css={tw`text-neutral-300`}>{reply.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {ticket.status === 'open' && (
                                    <div css={tw`flex gap-2 mt-4`}>
                                        <input
                                            type="text"
                                            value={replyText[ticket.id] || ''}
                                            onChange={(e) => setReplyText({ ...replyText, [ticket.id]: e.target.value })}
                                            placeholder="Type your reply..."
                                            css={tw`flex-1 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none`}
                                            onKeyPress={(e) => e.key === 'Enter' && addReply(ticket.id)}
                                        />
                                        <Button onClick={() => addReply(ticket.id)} css={tw`flex items-center gap-2`}>
                                            <Send size={16} /> Reply
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </PageContentBlock>
    );
};
