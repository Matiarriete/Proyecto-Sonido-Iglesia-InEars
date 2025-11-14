
import React, { useState, useMemo } from 'react';
import { useDataContext } from '../../hooks/useData';
import { Ticket, TicketStatus } from '../../types';

const TicketHistory: React.FC = () => {
  const { tickets } = useDataContext();
  const [filter, setFilter] = useState<TicketStatus | 'All'>('All');
  
  const sortedTickets = useMemo(() => tickets.sort((a, b) => b.updatedAt - a.updatedAt), [tickets]);

  const filteredTickets = useMemo(() => {
    if (filter === 'All') {
      return sortedTickets;
    }
    return sortedTickets.filter(ticket => ticket.status === filter);
  }, [filter, sortedTickets]);

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.ABIERTO:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case TicketStatus.RESUELTO:
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case TicketStatus.CERRADO:
        return 'bg-green-500/20 text-green-400 border-green-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const FilterButton = ({ value, label }: { value: TicketStatus | 'All', label: string }) => (
      <button 
        onClick={() => setFilter(value)}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${filter === value ? 'bg-brand-primary text-white' : 'bg-brand-surface hover:bg-gray-700'}`}
      >
          {label}
      </button>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ticket History</h2>
      
      <div className="flex space-x-2 mb-4">
        <FilterButton value="All" label="All" />
        <FilterButton value={TicketStatus.ABIERTO} label="Open" />
        <FilterButton value={TicketStatus.RESUELTO} label="Resolved" />
        <FilterButton value={TicketStatus.CERRADO} label="Closed" />
      </div>

      <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Performer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Issue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Assigned to</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-text">{ticket.performerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                    {ticket.problem} {ticket.instrumentName && `(${ticket.instrumentName})`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">{ticket.assignedTo || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text-secondary">{new Date(ticket.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredTickets.length === 0 && <p className="text-center mt-4 text-brand-text-secondary">No tickets match the current filter.</p>}
    </div>
  );
};

export default TicketHistory;
