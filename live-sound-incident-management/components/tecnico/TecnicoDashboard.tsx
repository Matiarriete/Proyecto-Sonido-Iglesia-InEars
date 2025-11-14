
import React, { useState } from 'react';
import TicketInbox from './TicketInbox';
import TicketHistory from './TicketHistory';
import InstrumentManager from './InstrumentManager';
import UserManager from './UserManager';

type Tab = 'inbox' | 'history' | 'instruments' | 'users';

const TecnicoDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('inbox');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inbox':
        return <TicketInbox />;
      case 'history':
        return <TicketHistory />;
      case 'instruments':
        return <InstrumentManager />;
      case 'users':
        return <UserManager />;
      default:
        return null;
    }
  };

  const TabButton = ({ tab, label }: { tab: Tab; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-lg font-semibold rounded-t-lg transition-colors
        ${activeTab === tab ? 'bg-brand-surface text-brand-primary' : 'bg-transparent text-brand-text-secondary hover:text-brand-text'}`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <TabButton tab="inbox" label="Inbox" />
          <TabButton tab="history" label="History" />
          <TabButton tab="instruments" label="Instruments" />
          <TabButton tab="users" label="Users" />
        </nav>
      </div>
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TecnicoDashboard;
