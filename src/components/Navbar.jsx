import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, PiggyBank, CreditCard, BarChart3 } from 'lucide-react';

function Navbar() {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/gastos', icon: Wallet, label: 'Gastos' },
        { path: '/ahorros', icon: PiggyBank, label: 'Ahorros' },
        { path: '/deudas', icon: CreditCard, label: 'Deudas' },
        { path: '/reportes', icon: BarChart3, label: 'Reportes' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-around py-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${isActive
                                        ? 'text-white bg-white/20 scale-110'
                                        : 'text-white/60 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${isActive ? 'animate-bounce' : ''}`} />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
