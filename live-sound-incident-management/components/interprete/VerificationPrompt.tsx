
import React from 'react';
import { useDataContext } from '../../hooks/useData';
import { Ticket, TicketStatus } from '../../types';

interface VerificationPromptProps {
  ticket: Ticket;
}

const VerificationPrompt: React.FC<VerificationPromptProps> = ({ ticket }) => {
  const { updateTicketStatus } = useDataContext();

  const handleConfirmation = (isResolved: boolean) => {
    if (isResolved) {
      updateTicketStatus(ticket.id, TicketStatus.CERRADO);
    } else {
      updateTicketStatus(ticket.id, TicketStatus.ABIERTO);
    }
  };

  return (
    <div className="bg-brand-surface p-8 rounded-lg shadow-lg text-center border-2 border-brand-primary">
      <h2 className="text-2xl font-bold mb-2 text-brand-primary">Action Required</h2>
      <p className="text-lg text-brand-text-secondary mb-6">The technician has marked your ticket as resolved. Is the issue fixed?</p>

      <div className="mb-6 text-left bg-gray-900/50 p-4 rounded-md">
        <p className="text-md"><span className="font-bold text-brand-text-secondary">Problem:</span> {ticket.problem}</p>
        {ticket.instrumentName && (
          <p className="text-md"><span className="font-bold text-brand-text-secondary">Instrument:</span> {ticket.instrumentName}</p>
        )}
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => handleConfirmation(false)}
          className="w-1/2 p-4 text-xl font-bold bg-brand-danger text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          No, Still an Issue
        </button>
        <button
          onClick={() => handleConfirmation(true)}
          className="w-1/2 p-4 text-xl font-bold bg-brand-success text-white rounded-lg hover:bg-green-500 transition-colors"
        >
          Yes, It's Fixed!
        </button>
      </div>
    </div>
  );
};

export default VerificationPrompt;
