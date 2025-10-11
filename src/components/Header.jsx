import { DollarSign, Menu } from 'lucide-react';

const Header = ({ currentUser, setShowSidebar }) => {
    return (
        <div className="flex justify-between items-center mb-6 gap-4">
            <button
                onClick={() => setShowSidebar(true)}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all shadow-lg flex-shrink-0"
                title="Abrir menú"
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className="text-center flex-1">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 flex-shrink-0" />
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                        Presupuesto Personal
                    </h1>
                </div>
                <p className="text-purple-200 text-sm md:text-base">
                    Bienvenido, <span className="font-bold text-yellow-300">{currentUser?.email}</span>
                </p>
            </div>

            {/* Espacio para mantener balance visual */}
            <div className="w-12 md:w-14 flex-shrink-0"></div>
        </div>
    );
};

export default Header;
