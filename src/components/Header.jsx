import React from 'react';
import { DollarSign, LogOut, Calculator } from 'lucide-react';

const Header = ({ currentUser, handleLogout, setShowCalculator }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-center md:text-left flex-1 w-full">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
                    <DollarSign className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 flex-shrink-0" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white break-words">
                        Presupuesto Personal
                    </h1>
                </div>
                <p className="text-purple-200 text-base md:text-lg">
                    Bienvenido, <span className="font-bold text-yellow-300">{currentUser?.email}</span>
                </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
                <button
                    onClick={() => setShowCalculator(true)}
                    className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 p-2 md:p-3 rounded-xl transition-all shadow-lg"
                    title="Calculadora 10%"
                >
                    <Calculator className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold flex items-center gap-2 transition-all text-sm md:text-base flex-shrink-0"
                >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Header;
