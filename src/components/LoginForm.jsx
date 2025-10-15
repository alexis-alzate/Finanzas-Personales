import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, Sparkles, UserCircle } from 'lucide-react';

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    isRegistering,
    setIsRegistering,
    loginError,
    handleAuth,
    handlePasswordReset,
    displayName,
    setDisplayName
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const handleReset = async () => {
        if (!resetEmail) {
            setResetMessage('Por favor ingresa tu email');
            return;
        }

        try {
            await handlePasswordReset(resetEmail);
            setResetMessage('✅ Se envió un correo para restablecer tu contraseña');
            setTimeout(() => {
                setShowResetModal(false);
                setResetMessage('');
                setResetEmail('');
            }, 3000);
        } catch (error) {
            setResetMessage('❌ Error: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Efectos de fondo animados */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="relative">
                            <Sparkles className="w-12 h-12 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
                                <span className="text-3xl transform -rotate-12">💎</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-2">
                        WealthFlow Pro
                    </h1>
                    <p className="text-purple-200/80 text-sm font-medium">
                        Tu asistente financiero personal de élite
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-purple-300/60">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Sincronizado en la nube con Firebase</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {isRegistering && (
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-purple-200 flex items-center gap-2">
                                <UserCircle className="w-4 h-4" />
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Ej: Juan Pérez"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-purple-200 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-purple-200 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                                className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                placeholder="Mínimo 6 caracteres"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/70 hover:text-purple-200 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {!isRegistering && (
                        <div className="text-right">
                            <button
                                onClick={() => setShowResetModal(true)}
                                className="text-sm text-purple-300 hover:text-purple-200 font-semibold transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                    )}

                    {loginError && (
                        <div className="bg-red-500/20 backdrop-blur border-2 border-red-400/50 text-red-200 px-4 py-3 rounded-xl text-sm">
                            {loginError}
                        </div>
                    )}

                    <button
                        onClick={handleAuth}
                        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {isRegistering ? (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Crear Cuenta Premium
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    Acceder a mi Cuenta
                                </>
                            )}
                        </span>
                    </button>

                    <button
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setDisplayName('');
                        }}
                        className="w-full text-purple-300 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur"
                    >
                        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nueva cuenta? Únete ahora'}
                    </button>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur rounded-xl border border-purple-300/20">
                    <div className="flex items-center justify-center gap-2 text-xs text-purple-200">
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                        </div>
                        <span>Sistema de gestión financiera profesional</span>
                    </div>
                </div>
            </div>

            {/* Modal de recuperar contraseña */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-300/30 rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold text-white mb-4">Recuperar Contraseña</h3>
                        <p className="text-purple-200/80 mb-6">
                            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all mb-4"
                            placeholder="tu@email.com"
                        />

                        {resetMessage && (
                            <div className={`${
                                resetMessage.includes('✅')
                                    ? 'bg-green-500/20 border-green-400/50 text-green-200'
                                    : 'bg-red-500/20 border-red-400/50 text-red-200'
                            } backdrop-blur border-2 px-4 py-3 rounded-xl text-sm mb-4`}>
                                {resetMessage}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowResetModal(false);
                                    setResetMessage('');
                                    setResetEmail('');
                                }}
                                className="flex-1 bg-white/10 backdrop-blur text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .bg-size-200 {
                    background-size: 200% auto;
                }
                .bg-pos-0 {
                    background-position: 0% center;
                }
                .bg-pos-100:hover {
                    background-position: 100% center;
                }
            `}</style>
        </div>
    );
};

export default LoginForm;
