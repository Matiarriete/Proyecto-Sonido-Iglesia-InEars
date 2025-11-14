import React, { useEffect, useState } from 'react';
import { useDataContext } from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import { Ticket, TicketStatus } from '../../types';

// Fix: Explicitly type TicketCard as a React.FC to allow for the 'key' prop.
const TicketCard: React.FC<{ ticket: Ticket; onResolve: (id: string) => void; onAssign: (id: string) => void }> = ({ ticket, onResolve, onAssign }) => {
    const timeSince = (date: number) => {
        const seconds = Math.floor((Date.now() - date) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        else if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        else if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        else return `${Math.floor(seconds / 86400)}d ago`;

    }

    return (
        <div className="bg-brand-surface p-4 rounded-lg shadow-lg border-l-4 border-brand-accent animate-fade-in">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-xl text-brand-text">{ticket.problem}</p>
                    {ticket.instrumentName && <p className="text-brand-secondary font-semibold">{ticket.instrumentName}</p>}
                    <p className="text-sm text-brand-text-secondary mt-1">{ticket.performerName}</p>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-sm text-brand-text-secondary">{timeSince(ticket.updatedAt)}</p>
                    <span className="px-2 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">
                        {ticket.status}
                    </span>
                </div>
            </div>
            <div className="mt-4">
                {ticket.assignedTo ? (
                    <button
                        onClick={() => onResolve(ticket.id)}
                        className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Mark as Resolved
                    </button>
                ) :
                    <button
                        onClick={() => onAssign(ticket.id)}
                        className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Asignar a mi nombre
                    </button>}

            </div>
        </div>
    )
}

const TicketInbox: React.FC = () => {
    const { tickets, updateTicketStatus, updateTicketAssignedTo } = useDataContext();
    const { currentUser } = useAuth();
    const [openTickets, setOpenTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const filteredTickets = tickets
            .filter(t => (t.status === TicketStatus.ASIGNADO && t.assignedTo == currentUser.name) || (t.status === TicketStatus.ABIERTO))
            .sort((a, b) => b.updatedAt - a.updatedAt);
        setOpenTickets(filteredTickets);
    }, [tickets]);

    const handleResolve = (ticketId: string) => {
        updateTicketStatus(ticketId, TicketStatus.RESUELTO);
    };

    const handleAssignToMe = (ticketId: string) => {
        updateTicketAssignedTo(ticketId, currentUser.name);
        updateTicketStatus(ticketId, TicketStatus.ASIGNADO);
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Active Tickets</h2>
            {openTickets.length > 0 ? (
                <div className="space-y-4">
                    {openTickets.filter(ticket => !ticket.assignedTo || ticket.assignedTo === currentUser.name).map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} onResolve={handleResolve} onAssign={handleAssignToMe} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-brand-surface rounded-lg">
                    <p className="text-brand-text-secondary text-lg">Inbox is clear. All systems go!</p>
                </div>
            )}
        </div>
    );
};

export default TicketInbox;
