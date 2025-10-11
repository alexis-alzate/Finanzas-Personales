import React from 'react';
import { Lightbulb } from 'lucide-react';

const Recommendations = ({ recommendations }) => {
    if (recommendations.length === 0) return null;

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-4">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 flex-shrink-0" />
                <div className="flex-1 w-full">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-3">💡 Recomendaciones Personalizadas</h3>
                    <div className="space-y-2">
                        {recommendations.map((rec, idx) => (
                            <div
                                key={idx}
                                className={`px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold flex items-start gap-2 text-sm md:text-base ${rec.type === 'warning' ? 'bg-orange-100 text-orange-900' :
                                        rec.type === 'success' ? 'bg-green-100 text-green-900' :
                                            rec.type === 'goal' ? 'bg-blue-100 text-blue-900' :
                                                'bg-white/90 text-purple-900'
                                    }`}
                            >
                                <span className="text-xl flex-shrink-0">{rec.icon}</span>
                                <span className="break-words">{rec.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
