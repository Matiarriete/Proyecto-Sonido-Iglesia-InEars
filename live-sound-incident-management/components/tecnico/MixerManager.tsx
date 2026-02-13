import React, { useState } from 'react';
import { useDataContext } from '../../hooks/useData';

const MixerManager: React.FC = () => {

    const { mixer, updateMixer } = useDataContext();
    const [enableBtn, setEnableBtn] = useState(true);
    const [newMixer, setNewMixer] = useState(mixer)


    const handleModifyMixerBtn = () => {
        setEnableBtn(false)
    }

    const handleUpdateMixer = () => {
        updateMixer(newMixer)
        setEnableBtn(true)
    }

    const buttonBaseClass = "w-full mt-4 text-white font-bold py-2 px-4 rounded-md transition-colors";
    const buttonVariantClass = enableBtn ? "bg-brand-primary hover:bg-blue-600" : "bg-brand-success hover:bg-green-600";

    return (
        <div className="bg-brand-surface p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Mixer IP</h3>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={newMixer.ip}
                    disabled={enableBtn}
                    onChange={(e) => setNewMixer(prev => ({ ...prev, ip: e.target.value }))}
                    placeholder={newMixer.ip}
                    className="flex-grow bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
            </div>
            <h3 className="text-lg font-semibold my-2">Mixer Selector</h3>
            <div className="flex space-x-2">
                <select
                    name="selectedMixer"
                    disabled={enableBtn}
                    value={newMixer.port}
                    onChange={e => setNewMixer(prev => ({ ...prev, port: e.target.value }))}
                    className="flex-grow bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                    <option value="10023">X32</option>
                    <option value="10024">MR18</option>
                </select>
            </div>
            <button
                onClick={enableBtn ? handleModifyMixerBtn : handleUpdateMixer}
                className={`${buttonVariantClass} ${buttonBaseClass}`}>
                {enableBtn ? "Modificar" : "Aceptar"}
            </button>
        </div>
    )
}

export default MixerManager;