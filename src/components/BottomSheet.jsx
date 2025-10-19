import React from 'react';
import { X } from 'lucide-react';

const BottomSheet = ({ isOpen, onClose, title, icon: Icon, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
                className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        {Icon && (
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                        )}
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Content CON SCROLL */}
                <div className="overflow-y-auto p-4 flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;
