
import React from 'react';

const TicketSubmittedSuccess: React.FC = () => {
  return (
    <div className="bg-brand-surface p-8 rounded-lg shadow-lg text-center animate-fade-in">
      <div className="flex justify-center items-center mb-4">
        <svg className="h-16 w-16 text-brand-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-brand-success">Ticket Sent Successfully!</h2>
      <p className="text-lg text-brand-text-secondary">The sound technician has been notified.</p>
      <p className="text-sm text-brand-text-secondary mt-4">You will be taken to the ticket status screen shortly.</p>
    </div>
  );
};

export default TicketSubmittedSuccess;
