
import React from 'react';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './types';
import LoginScreen from './components/auth/LoginScreen';
import InterpreteDashboard from './components/interprete/InterpreteDashboard';
import TecnicoDashboard from './components/tecnico/TecnicoDashboard';
import Header from './components/shared/Header';

const App: React.FC = () => {
  const { currentUser } = useAuth();

  const renderContent = () => {
    if (!currentUser) {
      return <LoginScreen />;
    }

    return (
      <>
        <Header />
        <main className="container mx-auto p-4 md:p-6">
          {currentUser.role === UserRole.INTERPRETE && <InterpreteDashboard />}
          {currentUser.role === UserRole.TECNICO && <TecnicoDashboard />}
        </main>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      {renderContent()}
    </div>
  );
};

export default App;
