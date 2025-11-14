
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDataContext } from '../../hooks/useData';
import { Instrument, PredefinedProblem } from '../../types';
import { PREDEFINED_PROBLEMS } from '../../constants';

interface CreateTicketFormProps {
  onTicketCreated: () => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onTicketCreated }) => {
  const { currentUser } = useAuth();
  const { createTicket, instruments } = useDataContext();
  const [selectedProblem, setSelectedProblem] = useState<PredefinedProblem | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeInstruments = instruments.filter(inst => inst.isActive);

  const handleSubmit = () => {
    if (!currentUser || !selectedProblem) return;

    if (selectedProblem.type === 'instrument' && !selectedInstrument) {
      alert("Please select an instrument for this problem.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
        createTicket(currentUser, selectedProblem.label, selectedProblem.type === 'instrument' ? selectedInstrument! : undefined);
        onTicketCreated();
    }, 500);
  };

  const handleProblemClick = (problem: PredefinedProblem) => {
    setSelectedProblem(problem);
    if (problem.type === 'generic') {
      setSelectedInstrument(null);
    }
  };

  return (
    <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-brand-accent">Report an Issue</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-brand-text-secondary">1. Choose the problem:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PREDEFINED_PROBLEMS.map(problem => (
            <button
              key={problem.label}
              onClick={() => handleProblemClick(problem)}
              className={`p-4 text-center font-semibold rounded-md transition-all duration-200 h-24 flex items-center justify-center
                ${selectedProblem?.label === problem.label 
                  ? 'bg-brand-primary text-white ring-2 ring-offset-2 ring-offset-brand-surface ring-brand-primary' 
                  : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {problem.label}
            </button>
          ))}
        </div>
      </div>

      {selectedProblem?.type === 'instrument' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-brand-text-secondary">2. Select the instrument:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
             {activeInstruments.map(inst => (
                <button
                key={inst.id}
                onClick={() => setSelectedInstrument(inst)}
                className={`p-4 text-center font-semibold rounded-md transition-all duration-200 h-24 flex items-center justify-center
                    ${selectedInstrument?.id === inst.id 
                    ? 'bg-brand-secondary text-white ring-2 ring-offset-2 ring-offset-brand-surface ring-brand-secondary' 
                    : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                {inst.name}
                </button>
             ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedProblem || (selectedProblem.type === 'instrument' && !selectedInstrument) || isSubmitting}
        className="w-full mt-4 p-4 text-xl font-bold bg-brand-success text-white rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-green-500 transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Ticket'}
      </button>
    </div>
  );
};

export default CreateTicketForm;