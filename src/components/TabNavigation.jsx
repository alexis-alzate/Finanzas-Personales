import React from 'react';
import { Home, PlusCircle, List, BarChart3 } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'overview', label: 'Inicio', icon: Home },
        { id: 'add', label: 'Agregar', icon: PlusCircle },
        { id: 'transactions', label: 'Historial', icon: List },
        { id: 'analytics', label: 'Análisis', icon: BarChart3 }
    ];

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-2 mb-6">
            <div className="grid grid-cols-4 gap-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex flex-col items-center justify-center gap-2 p-3 rounded-xl
                transition-all duration-200 font-semibold
                ${isActive
                                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                                    : 'text-white hover:bg-white/20'
                                }
              `}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-white'}`} />
                            <span className="text-xs md:text-sm">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TabNavigation;
