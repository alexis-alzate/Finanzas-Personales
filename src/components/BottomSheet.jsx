import React from 'react';
import { X } from 'lucide-react';

function BottomSheet({ isOpen, onClose, title, icon: Icon, children }) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
                onClick={onClose}
            />

            {/* Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 border-b border-white/20 flex items-center justify-between rounded-t-3xl">
                        <div className="flex items-center gap-3">
                            {Icon && <Icon className="w-7 h-7 text-white" />}
                            <h2 className="text-2xl font-bold text-white">{title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-all"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </>
    );
}

export default BottomSheet;
