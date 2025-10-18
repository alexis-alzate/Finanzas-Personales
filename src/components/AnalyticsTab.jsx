import React from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';

const AnalyticsTab = () => {
    const upcomingFeatures = [
        {
            icon: BarChart3,
            title: 'Comparación de Meses',
            description: 'Compara tus gastos y ahorros mes a mes',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: TrendingUp,
            title: 'Proyecciones',
            description: 'Predicciones de gastos y ahorros futuros',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: PieChart,
            title: 'Análisis Detallado',
            description: 'Reportes profundos de tus finanzas',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Calendar,
            title: 'Historial Anual',
            description: 'Vista completa de todo el año',
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">Análisis Avanzado</h2>
                <p className="text-white/70 text-lg">Próximamente disponible</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all cursor-pointer"
                        >
                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                                <Icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-white/70">{feature.description}</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/50">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                En desarrollo
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-8 border border-yellow-500/30 text-center">
                <p className="text-white text-lg mb-4">
                    🚀 Estas funciones estarán disponibles en futuras actualizaciones
                </p>
                <p className="text-white/70">
                    Mientras tanto, disfruta de todas las funciones actuales en las otras pestañas
                </p>
            </div>
        </div>
    );
};

export default AnalyticsTab;
