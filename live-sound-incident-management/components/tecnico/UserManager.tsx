
import React, { useState } from 'react';
import { useDataContext } from '../../hooks/useData';
import { User, UserRole } from '../../types';

const UserManager: React.FC = () => {
    const { users, addUser, instruments, updateUser } = useDataContext();
    const [newUserName, setNewUserName] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleAddUser = () => {
        if (newUserName.trim()) {
            addUser(newUserName.trim());
            setNewUserName('');
        }
    };

    const handleUpdate = () => {
        if (editingUser) {
            updateUser(editingUser.id, editingUser.name, editingUser.isActive, editingUser.role, editingUser.instrumentId);
            setEditingUser(null);
        }
    }

    const renderEditForm = () => {
        if (!editingUser) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                {console.log('Editing User:', editingUser)}
                <div className="bg-brand-surface p-6 rounded-lg shadow-xl w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4">Edit User</h3>
                    <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        className="w-full bg-gray-800 text-white p-2 rounded mb-4"
                    />

                    <label htmlFor="instruments">Elija un rol: </label>
                    <select
                        id="dropdown"
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            marginBottom: '16px',
                            fontSize: '16px',
                            border: '2px solid #4b5563',
                            borderRadius: '8px',
                            backgroundColor: 'rgb(31, 41, 55)',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                        value={editingUser.role || ""}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value || undefined })}
                    >
                        <option value="">-- Selecciona --</option>
                        {[UserRole.INTERPRETE, UserRole.TECNICO].map((role) => (
                            <option key={role} value={role} >
                                {role}
                            </option>
                        ))}
                    </select>
                    {editingUser.role === UserRole.INTERPRETE && (
                        <div>
                            <label htmlFor="instruments">Elija un instrumento: </label>
                            <select
                                id="dropdown"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    marginBottom: '16px',
                                    fontSize: '16px',
                                    border: '2px solid #4b5563',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgb(31, 41, 55)',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                                value={editingUser.instrumentId || ""}
                                onChange={(e) => setEditingUser({ ...editingUser, instrumentId: e.target.value || undefined })}
                            >
                                <option value="">-- Selecciona --</option>
                                {instruments.map((ins) => (
                                    <option key={ins.id} value={ins.id} >
                                        {ins.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={editingUser.isActive}
                            onChange={(e) => setEditingUser({ ...editingUser, isActive: e.target.checked })}
                            className="h-4 w-4 text-brand-primary bg-gray-700 border-gray-600 rounded focus:ring-brand-primary"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-brand-text">Active</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => setEditingUser(null)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                        <button onClick={handleUpdate} className="px-4 py-2 bg-brand-primary rounded">Save</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            <div className="bg-brand-surface p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Add New User</h3>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="e.g., John Doe"
                        className="flex-grow bg-gray-800 text-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button onClick={handleAddUser} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-r-md hover:bg-blue-600 transition-colors">
                        Add
                    </button>
                </div>
            </div>

            <div className="bg-brand-surface rounded-lg shadow-lg">
                <ul className="divide-y divide-gray-700">
                    {users.map(user => (
                        <li key={user.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">{user.name}</p>
                                <span className={`text-sm font-medium ${user.isActive ? 'text-green-400' : 'text-red-400'}`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <button onClick={() => setEditingUser(user)} className="text-sm bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded">
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

export default UserManager;
