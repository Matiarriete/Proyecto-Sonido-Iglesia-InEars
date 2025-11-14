import React from 'react';
import { Ticket, TicketStatus } from '../../types';

interface MyTicketStatusProps {
  ticket: Ticket;
}

const MyTicketStatus: React.FC<MyTicketStatusProps> = ({ ticket }) => {
  const isPending = ticket.status === TicketStatus.ABIERTO;

  return (
    <div className={`bg-brand-surface p-8 rounded-lg shadow-lg text-center transition-all duration-300 ${isPending ? 'animate-pulse' : ''}`}>
      {isPending && (
        <div className="flex justify-center items-center mb-4">
            <svg className="animate-spin h-10 w-10 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-brand-accent">Ticket Sent!</h2>
      <p className="text-lg text-brand-text-secondary mb-2">
        {isPending 
            ? 'Your request is being processed by the sound technician.' 
            : 'The technician has responded. Please verify if the issue is resolved.'}
      </p>
      
      <div className="mt-6 text-left bg-gray-900/50 p-4 rounded-md">
         <p className="text-md"><span className="font-bold text-brand-text-secondary">Problem:</span> {ticket.problem}</p>
         {ticket.instrumentName && (
            <p className="text-md"><span className="font-bold text-brand-text-secondary">Instrument:</span> {ticket.instrumentName}</p>
         )}
         <p className="text-md"><span className="font-bold text-brand-text-secondary">Status:</span> 
            <span className={`font-semibold ml-2 ${ticket.status === TicketStatus.RESUELTO ? 'text-brand-primary' : 'text-brand-accent'}`}>
                {ticket.status}
            </span>
         </p>
      </div>
    </div>
  );
};

export default MyTicketStatus;
