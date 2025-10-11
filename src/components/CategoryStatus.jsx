import React from 'react';
import { Target, AlertTriangle } from 'lucide-react';

const CategoryStatus = ({ categoryData, formatCurrency }) => {
    return (
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="w-7 h-7 text-purple-600" />
                Estado de Categorías
            </h2>
            <div className="space-y-6">
                {categoryData.map(cat => {
                    const Icon = cat.icon;
                    return (
                        <div key={cat.value} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: cat.color + '20' }}>
                                        <Icon className="w-5 h-5" style={{ color: cat.color }} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                                            {cat.label}
                                            {cat.mandatory && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Obligatorio</span>}
                                        </p>
                                        <p className="text-xs text-gray-500">{cat.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg" style={{ color: cat.isOverLimit ? '#EF4444' : cat.color }}>
                                        {formatCurrency(cat.spent)}
                                    </p>
                                    {cat.limit && (
                                        <p className="text-xs text-gray-500">de {formatCurrency(cat.limit)}</p>
                                    )}
                                </div>
                            </div>
                            {cat.limit && (
                                <div className="relative">
                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${Math.min(cat.percentage, 100)}%`,
                                                backgroundColor: cat.isOverLimit ? '#EF4444' : cat.percentage > 80 ? '#F59E0B' : cat.color
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1 text-xs">
                                        <span className={cat.isOverLimit ? 'text-red-600 font-bold' : 'text-gray-600'}>
                                            {cat.percentage.toFixed(1)}% usado
                                        </span>
                                        {cat.isOverLimit ? (
                                            <span className="text-red-600 font-bold flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                ¡Límite excedido!
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
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
