import React from 'react';
import { Target, AlertTriangle } from 'lucide-react';

const CategoryStatus = ({ categoryData, formatCurrency }) => {
    return (
        <div className="bg-white/95 backdrop-blur rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-purple-600" />
                Estado de Categorías
            </h2>
            <div className="space-y-4 md:space-y-6">
                {categoryData.map(cat => {
                    const Icon = cat.icon;
                    return (
                        <div key={cat.value} className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cat.color + '20' }}>
                                        <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: cat.color }} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-gray-800 flex items-center gap-2 text-sm md:text-base">
                                            <span className="truncate">{cat.label}</span>
                                            {cat.mandatory && <span className="text-[10px] md:text-xs bg-yellow-100 text-yellow-800 px-1.5 md:px-2 py-0.5 rounded-full flex-shrink-0">Obligatorio</span>}
                                        </p>
                                        <p className="text-[10px] md:text-xs text-gray-500 truncate">{cat.description}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-sm md:text-base lg:text-lg" style={{ color: cat.isOverLimit ? '#EF4444' : cat.color }}>
                                        {formatCurrency(cat.spent)}
                                    </p>
                                    {cat.limit && (
                                        <p className="text-[10px] md:text-xs text-gray-500">de {formatCurrency(cat.limit)}</p>
                                    )}
                                </div>
                            </div>
                            {cat.limit && (
                                <div className="relative">
                                    <div className="w-full h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${Math.min(cat.percentage, 100)}%`,
                                                backgroundColor: cat.isOverLimit ? '#EF4444' : cat.percentage > 80 ? '#F59E0B' : cat.color
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1 text-[10px] md:text-xs gap-2">
                                        <span className={cat.isOverLimit ? 'text-red-600 font-bold' : 'text-gray-600'}>
                                            {cat.percentage.toFixed(1)}% usado
                                        </span>
                                        {cat.isOverLimit ? (
                                            <span className="text-red-600 font-bold flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                <span className="hidden sm:inline">¡Límite excedido!</span>
                                                <span className="sm:hidden">¡Excedido!</span>
                                            </span>
                                        ) : (
                                            <span className="text-gray-600 truncate">
                                                {formatCurrency(cat.remaining)} restante
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryStatus;
