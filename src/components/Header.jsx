import { DollarSign, Menu } from 'lucide-react';

const Header = ({ currentUser, setShowSidebar }) => {
    return (
        <div className="sticky top-0 z-30 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 -mx-4 px-4 py-4 mb-6 shadow-lg backdrop-blur-md">
            <div className="flex justify-between items-center gap-4">
                <button
                    onClick={() => setShowSidebar(true)}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all shadow-lg flex-shrink-0"
                    title="Abrir menú"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="text-center flex-1">
                    <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <DollarSign className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-yellow-400 flex-shrink-0" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                            Presupuesto Personal
                        </h1>
                    </div>
                    <p className="text-purple-100 text-xs md:text-sm lg:text-base">
                        Bienvenido, <span className="font-bold text-yellow-300">{currentUser?.email}</span>
                    </p>
                </div>

                {/* Espacio para balance visual */}
                <div className="w-12 md:w-14 flex-shrink-0"></div>
            </div>
        </div>
    );
};

export default Header;
