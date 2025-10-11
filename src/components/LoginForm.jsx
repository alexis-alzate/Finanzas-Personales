import React, { useState } from 'react';
import { User, Lock, DollarSign, Eye, EyeOff } from 'lucide-react';

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    isRegistering,
    setIsRegistering,
    loginError,
    handleAuth,
    handlePasswordReset
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <DollarSign className="w-16 h-16 text-purple-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Presupuesto Personal</h1>
                    <p className="text-gray-600">Con Firebase - Sincronizado en la nube ☁️</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Mínimo 6 caracteres"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
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
                                className="text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                    )}

                    {loginError && (
                        <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {loginError}
                        </div>
                    )}

                    <button
                        onClick={handleAuth}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>

                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="w-full text-purple-600 py-2 rounded-xl font-semibold hover:bg-purple-50 transition-all"
                    >
                        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                    </button>
                </div>

                <div className="mt-8 p-4 bg-purple-50 rounded-xl">
                    <p className="text-xs text-gray-600 text-center">
                        🔥 Ahora con Firebase: tus datos seguros en la nube
                    </p>
                </div>
            </div>

            {/* Modal de recuperar contraseña */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Recuperar Contraseña</h3>
                        <p className="text-gray-600 mb-6">
                            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all mb-4"
                            placeholder="tu@email.com"
                        />

                        {resetMessage && (
                            <div className={`${resetMessage.includes('✅') ? 'bg-green-100 border-green-300 text-green-700' : 'bg-red-100 border-red-300 text-red-700'} border-2 px-4 py-3 rounded-xl text-sm mb-4`}>
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
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
