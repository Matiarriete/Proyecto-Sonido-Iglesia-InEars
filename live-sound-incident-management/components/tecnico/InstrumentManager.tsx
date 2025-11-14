
import React, { useState } from 'react';
import { useDataContext } from '../../hooks/useData';
import { Instrument } from '../../types';

const InstrumentManager: React.FC = () => {
    const { instruments, addInstrument, updateInstrument } = useDataContext();
    const [newInstrumentName, setNewInstrumentName] = useState('');
    const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(null);

    const handleAddInstrument = () => {
        if (newInstrumentName.trim()) {
            addInstrument(newInstrumentName.trim());
            setNewInstrumentName('');
        }
    };
    
    const handleUpdate = () => {
        if (editingInstrument) {
            updateInstrument(editingInstrument.id, editingInstrument.name, editingInstrument.isActive);
            setEditingInstrument(null);
        }
    }

    const renderEditForm = () => {
        if (!editingInstrument) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-brand-surface p-6 rounded-lg shadow-xl w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4">Edit Instrument</h3>
                    <input
                        type="text"
                        value={editingInstrument.name}
                        onChange={(e) => setEditingInstrument({ ...editingInstrument, name: e.target.value })}
                        className="w-full bg-gray-800 text-white p-2 rounded mb-4"
                    />
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={editingInstrument.isActive}
                            onChange={(e) => setEditingInstrument({ ...editingInstrument, isActive: e.target.checked })}
                            className="h-4 w-4 text-brand-primary bg-gray-700 border-gray-600 rounded focus:ring-brand-primary"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-brand-text">Active</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => setEditingInstrument(null)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                        <button onClick={handleUpdate} className="px-4 py-2 bg-brand-primary rounded">Save</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Instruments</h2>
            
            <div className="bg-brand-surface p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Add New Instrument</h3>
                <div className="flex space-x-2">
                    <input 
                        type="text"
                        value={newInstrumentName}
                        onChange={(e) => setNewInstrumentName(e.target.value)}
                        placeholder="e.g., Saxophone"
                        className="flex-grow bg-gray-800 text-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button onClick={handleAddInstrument} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-r-md hover:bg-blue-600 transition-colors">
                        Add
                    </button>
                </div>
            </div>

            <div className="bg-brand-surface rounded-lg shadow-lg">
                <ul className="divide-y divide-gray-700">
                    {instruments.map(inst => (
                        <li key={inst.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">{inst.name}</p>
                                <span className={`text-sm font-medium ${inst.isActive ? 'text-green-400' : 'text-red-400'}`}>
                                    {inst.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <button onClick={() => setEditingInstrument(inst)} className="text-sm bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded">
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {renderEditForm()}
        </div>
    );
};

export default InstrumentManager;
