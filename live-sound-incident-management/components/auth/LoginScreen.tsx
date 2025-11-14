import React from 'react';
// import { USERS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { User, UserRole } from '../../types';
import { useDataContext } from '../../hooks/useData';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const { users, instruments } = useDataContext();

  const performers = users.filter(u => u.role === UserRole.INTERPRETE);
  const technicians = users.filter(u => u.role === UserRole.TECNICO);

  const findInstrumentName = (instrumentId: string | undefined) => {
    const instrument = instruments.find(ins => ins.id === instrumentId);
    return instrument ? instrument.name : 'Sin instrumento';
  }

  // Fix: Explicitly type UserButton as a React.FC to allow for the 'key' prop.
  const UserButton: React.FC<{ user: User }> = ({ user }) => (
    <button
      onClick={() => login(user)}
      className="w-full text-left p-4 rounded-lg bg-brand-surface hover:bg-brand-primary transition-colors duration-200"
    >
      <p className="text-lg font-semibold">{user.name}</p>
      <p className="text-sm text-brand-text-secondary">
        {user.role === UserRole.TECNICO ? user.role : findInstrumentName(user.instrumentId)}
      </p>
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-brand-primary">Select Your Profile</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left text-brand-accent">Performers</h2>
            <div className="space-y-4">
              {performers.filter(u => u.isActive && u.instrumentId).map(user => <UserButton key={user.id} user={user} />)}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left text-brand-accent">Technicians</h2>
            <div className="space-y-4">
              {technicians.filter(u => u.isActive).map(user => <UserButton key={user.id} user={user} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;