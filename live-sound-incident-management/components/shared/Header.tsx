
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-brand-surface shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-brand-primary">Live Sound OS</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-brand-text-secondary">
              Logged in as: <span className="font-semibold text-brand-text">{currentUser?.name}</span>
            </span>
            <button
              onClick={logout}
              className="px-3 py-2 text-sm font-medium text-white bg-brand-secondary hover:bg-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
