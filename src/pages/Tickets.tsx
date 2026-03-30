import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Ticket as TicketIcon, MessageSquare, Clock, CheckCircle, Send } from 'lucide-react';

export const Tickets = () => {
  const { tickets, setTickets, theme, role } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.description) return;

    const ticket = {
      id: `TKT-${Math.floor(Math.random() * 10000)}`,
      title: newTicket.title,
      description: newTicket.description,
      status: 'open' as const,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: role === 'Admin' ? 'Admin User' : 'Standard User',
      replies: []
    };

    setTickets([ticket, ...tickets]);
    setIsCreating(false);
    setNewTicket({ title: '', description: '' });
  };

  const closeTicket = (id: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: 'closed' } : t)));
  };

  const addReply = (id: string) => {
    if (!replyText[id]) return;
    
    const newReply = {
      id: Math.random().toString(),
      author: role === 'Admin' ? 'Admin User' : 'Standard User',
      content: replyText[id],
      createdAt: new Date().toLocaleString(),
      isAdmin: role === 'Admin'
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
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Support Tickets</h2>
          <p className="text-sm text-gray-500 mt-1">Need help? Create a ticket and our team will assist you.</p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.primary }}
          >
            <Plus size={20} />
            <span>New Ticket</span>
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Ticket</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="Brief summary of your issue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow h-32 resize-none"
                placeholder="Please describe your problem in detail..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white font-medium shadow-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <TicketIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No tickets found</h3>
            <p className="text-gray-500 mt-1">You haven't created any support tickets yet.</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${ticket.status === 'open' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    {ticket.status === 'open' ? (
                      <MessageSquare size={24} className="text-blue-500" />
                    ) : (
                      <CheckCircle size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <span className="font-medium text-gray-700 mr-2">#{ticket.id}</span>
                      <Clock size={14} className="mr-1" /> {ticket.createdAt}
                      <span className="mx-2">•</span>
                      By {ticket.createdBy}
                    </p>
                  </div>
                </div>
                {ticket.status === 'open' && role === 'Admin' && (
                  <button
                    onClick={() => closeTicket(ticket.id)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close Ticket
                  </button>
                )}
              </div>
              <div className="mt-4 pl-16">
                <div className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                  <div className="font-medium text-gray-800 mb-2">Original Issue:</div>
                  {ticket.description}
                </div>
                
                {ticket.replies && ticket.replies.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {ticket.replies.map((reply: any) => (
                      <div key={reply.id} className={`p-4 rounded-lg border ${reply.isAdmin ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-medium ${reply.isAdmin ? 'text-blue-800' : 'text-gray-800'}`}>{reply.author}</span>
                          <span className="text-xs text-gray-500">{reply.createdAt}</span>
                        </div>
                        <p className="text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {ticket.status === 'open' && (
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      value={replyText[ticket.id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [ticket.id]: e.target.value })}
                      placeholder="Type your reply..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && addReply(ticket.id)}
                    />
                    <button
                      onClick={() => addReply(ticket.id)}
                      className="px-4 py-2 rounded-lg text-white font-medium shadow-sm transition-opacity hover:opacity-90 flex items-center gap-2"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Send size={16} /> Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
