
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDataContext } from '../../hooks/useData';
import { Ticket, TicketStatus } from '../../types';
import CreateTicketForm from './CreateTicketForm';
import MyTicketStatus from './MyTicketStatus';
import VerificationPrompt from './VerificationPrompt';
import TicketSubmittedSuccess from './TicketSubmittedSuccess';

const InterpreteDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { tickets } = useDataContext();
  const [myTicket, setMyTicket] = useState<Ticket | null>(null);
  const [ticketForVerification, setTicketForVerification] = useState<Ticket | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (!currentUser) return;
    
    // Find the most recent non-closed ticket for the current user
    const activeOrResolvedTicket = tickets
      .filter(t => t.performerId === currentUser.id && t.status !== TicketStatus.CERRADO)
      .sort((a, b) => b.createdAt - a.createdAt)[0] || null;

    setMyTicket(activeOrResolvedTicket);

    // If there's a resolved ticket, show verification prompt
    if (activeOrResolvedTicket?.status === TicketStatus.RESUELTO) {
        setTicketForVerification(activeOrResolvedTicket);
    } else {
        setTicketForVerification(null);
    }

  }, [tickets, currentUser]);

  const handleTicketCreated = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  if (showSuccess) {
    return (
        <div className="max-w-2xl mx-auto">
            <TicketSubmittedSuccess />
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        {ticketForVerification ? (
            <VerificationPrompt ticket={ticketForVerification} />
        ) : myTicket ? (
            <MyTicketStatus ticket={myTicket} />
        ) : (
            <CreateTicketForm onTicketCreated={handleTicketCreated} />
        )}
    </div>
  );
};

export default InterpreteDashboard;