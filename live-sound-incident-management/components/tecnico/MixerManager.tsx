import React, { useState } from 'react';
import { useDataContext } from '../../hooks/useData';

const MixerManager: React.FC = () => {

    const { mixerIp, updateMixerIp } = useDataContext();
    const [enableBtn, setEnableBtn] = useState(true);
    const [newMixerIp, setNewMixerIp] = useState(mixerIp)


    const handleModifyMixerIpBtn = () => {
        setEnableBtn(false)
    }

    const handleUpdateMixerIp = () => {
        updateMixerIp(newMixerIp)
        setEnableBtn(true)
    }

    return(
     <div className="bg-brand-surface p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Mixer IP</h3>
                <div className="flex space-x-2">
                    <input 
                        type="text"
                        value={newMixerIp}
                        disabled={enableBtn}
                        onChange={(e) => setNewMixerIp(e.target.value)}
                        placeholder={newMixerIp}
                        className="flex-grow bg-gray-800 text-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button 
                        onClick={enableBtn ? handleModifyMixerIpBtn : handleUpdateMixerIp} 
                        className={enableBtn ? "bg-brand-primary text-white font-bold py-2 px-4 rounded-r-md hover:bg-blue-600 transition-colors" : "bg-brand-success text-white font-bold py-2 px-4 rounded-r-md hover:bg-green-600 transition-colors"}>
                        {enableBtn ? "Modificar Ip" : "Aceptar"}
                    </button>
                </div>
            </div>   
    )
}

export default MixerManager;