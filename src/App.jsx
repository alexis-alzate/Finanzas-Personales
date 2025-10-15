import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { Heart, Shield, Target, TrendingUp, TrendingDown } from 'lucide-react';

// Importar componentes
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MonthSelector from './components/MonthSelector';
import SummaryCards from './components/SummaryCards';
import Alerts from './components/Alerts';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import AddTab from './components/AddTab';
import TransactionsTab from './components/TransactionsTab';
import AnalyticsTab from './components/AnalyticsTab';
import Modals from './components/Modals';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados para ahorros externos
  const [externalSavings, setExternalSavings] = useState([]);
  const [savingDescription, setSavingDescription] = useState('');
  const [savingAmount, setSavingAmount] = useState('');
  const [savingDate, setSavingDate] = useState(new Date().toISOString().split('T')[0]);

  // Estados para inversiones
  const [investments, setInvestments] = useState([]);
  const [investmentDescription, setInvestmentDescription] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentSource, setInvestmentSource] = useState('disponible');
  const [investmentDate, setInvestmentDate] = useState(new Date().toISOString().split('T')[0]);

  // Estados para ingresos extra
  const [extraIncomes, setExtraIncomes] = useState([]);
  const [showExtraIncomeModal, setShowExtraIncomeModal] = useState(false);
  const [extraIncomeDescription, setExtraIncomeDescription] = useState('');
  const [extraIncomeAmount, setExtraIncomeAmount] = useState('');
  const [extraIncomeDate, setExtraIncomeDate] = useState(new Date().toISOString().split('T')[0]);

  const [monthlyIncome, setMonthlyIncome] = useState(975000);
  const [savingsGoal, setSavingsGoal] = useState(380000);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [calculatorResult, setCalculatorResult] = useState(0);
  const [tempIncome, setTempIncome] = useState('975000');
  const [tempGoal, setTempGoal] = useState('380000');

  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('gastos-gustos');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const categories = [
    { value: 'gastos-gustos', label: '🍿 Gastos Gustos', color: '#FF6384', limit: 290000, icon: Heart, description: 'Caprichos y antojos (máx $290k)' },
    { value: 'gastos-obligatorios', label: '🏠 Gastos Obligatorios', color: '#FF9F40', limit: null, mandatory: true, icon: Shield, description: 'Arriendo, servicios, comida básica' },
    { value: 'ahorros', label: '💰 Ahorros', color: '#36A2EB', limit: 190000, icon: Target, description: 'Ahorro programado' },
    { value: 'emergencia', label: '🚨 Ahorro Emergencia', color: '#FFCE56', limit: null, mandatory: true, icon: Shield, description: 'Fondo de emergencia obligatorio' },
    { value: 'diezmos', label: '⛪ Diezmos', color: '#4BC0C0', limit: null, mandatory: true, icon: Heart, description: 'Contribución obligatoria' },
    { value: 'transporte', label: '🚗 Transporte', color: '#9966FF', limit: 100000, icon: TrendingUp, description: 'Transporte y movilidad' },
    { value: 'entretenimiento', label: '🎮 Entretenimiento', color: '#FF9F40', limit: 50000, icon: TrendingDown, description: 'Ocio y diversión' },
    { value: 'otros', label: '📦 Otros', color: '#C9CBCF', limit: null, icon: Target, description: 'Gastos varios' }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        loadUserProfile(user.uid);
        subscribeToExpenses(user.uid);
        subscribeToExternalSavings(user.uid);
        subscribeToInvestments(user.uid);
        subscribeToExtraIncomes(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'userProfiles', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setMonthlyIncome(data.monthlyIncome || 975000);
        setSavingsGoal(data.savingsGoal || 380000);
        setTempIncome(String(data.monthlyIncome || 975000));
        setTempGoal(String(data.savingsGoal || 380000));
      }
    } catch (error) {
      console.error('Error cargando perfil:', error);
    }
  };

  const updateUserProfile = async (data) => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'userProfiles', currentUser.uid), data, { merge: true });
    } catch (error) {
      console.error('Error actualizando perfil:', error);
    }
  };

  const subscribeToExpenses = (userId) => {
    const q = query(collection(db, 'expenses'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expensesData = [];
      snapshot.forEach((doc) => {
        expensesData.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(expensesData);
    });
    return unsubscribe;
  };

  const subscribeToExternalSavings = (userId) => {
    const q = query(collection(db, 'externalSavings'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const savingsData = [];
      snapshot.forEach((doc) => {
        savingsData.push({ id: doc.id, ...doc.data() });
      });
      setExternalSavings(savingsData);
    });
    return unsubscribe;
  };

  const subscribeToInvestments = (userId) => {
    const q = query(collection(db, 'investments'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const investmentsData = [];
      snapshot.forEach((doc) => {
        investmentsData.push({ id: doc.id, ...doc.data() });
      });
      setInvestments(investmentsData);
    });
    return unsubscribe;
  };

  const subscribeToExtraIncomes = (userId) => {
    const q = query(collection(db, 'extraIncomes'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const incomesData = [];
      snapshot.forEach((doc) => {
        incomesData.push({ id: doc.id, ...doc.data() });
      });
      setExtraIncomes(incomesData);
    });
    return unsubscribe;
  };

  const addExternalSaving = async () => {
    if (!savingDescription || !savingAmount || !currentUser) {
      alert('Por favor completa todos los campos');
      return;
    }
    try {
      const savingData = {
        userId: currentUser.uid,
        description: savingDescription.trim(),
        amount: parseFloat(savingAmount),
        date: savingDate,
        timestamp: new Date().toISOString()
      };
      await addDoc(collection(db, 'externalSavings'), savingData);
      setSavingDescription('');
      setSavingAmount('');
      setSavingDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error al agregar ahorro externo:', error);
      alert('Error al agregar ahorro externo: ' + error.message);
    }
  };

  const deleteExternalSaving = async (id) => {
    try {
      await deleteDoc(doc(db, 'externalSavings', id));
    } catch (error) {
      console.error('Error eliminando ahorro externo:', error);
    }
  };

  const addInvestment = async () => {
    if (!investmentDescription || !investmentAmount || !currentUser) {
      alert('Por favor completa todos los campos');
      return;
    }

    const amount = parseFloat(investmentAmount);
    let fromDisponible = 0;
    let fromEmergencia = 0;
    let fromExternalSavings = 0;

    const disponibleActual = remaining;
    const emergenciaGastos = getCategoryTotal('emergencia');
    const filteredExternalSavingsTemp = getFilteredExternalSavings();
    const totalExternalSavingsTemp = filteredExternalSavingsTemp.reduce((sum, saving) => sum + saving.amount, 0);
    const emergenciaActual = emergenciaGastos + totalExternalSavingsTemp;

    if (investmentSource === 'disponible') {
      if (amount > disponibleActual) {
        alert(`No tienes suficiente dinero disponible. Disponible: ${formatCurrency(disponibleActual)}`);
        return;
      }
      fromDisponible = amount;
    } else if (investmentSource === 'emergencia') {
      if (amount > emergenciaActual) {
        alert(`No tienes suficiente en ahorro emergencia. Disponible: ${formatCurrency(emergenciaActual)}`);
        return;
      }
      const totalEmergenciaFunds = emergenciaGastos + totalExternalSavingsTemp;
      if (totalEmergenciaFunds > 0) {
        const proporcionEmergencia = emergenciaGastos / totalEmergenciaFunds;
        const proporcionExternos = totalExternalSavingsTemp / totalEmergenciaFunds;
        fromEmergencia = amount * proporcionEmergencia;
        fromExternalSavings = amount * proporcionExternos;
      } else {
        fromEmergencia = amount;
      }
    } else if (investmentSource === 'ambos') {
      const mitad = amount / 2;
      if (mitad > disponibleActual || mitad > emergenciaActual) {
        alert(`No tienes suficiente en ambas fuentes para dividir la inversión.`);
        return;
      }
      fromDisponible = mitad;
      const totalEmergenciaFunds = emergenciaGastos + totalExternalSavingsTemp;
      if (totalEmergenciaFunds > 0) {
        const proporcionEmergencia = emergenciaGastos / totalEmergenciaFunds;
        const proporcionExternos = totalExternalSavingsTemp / totalEmergenciaFunds;
        fromEmergencia = mitad * proporcionEmergencia;
        fromExternalSavings = mitad * proporcionExternos;
      } else {
        fromEmergencia = mitad;
      }
    }

    try {
      const investmentData = {
        userId: currentUser.uid,
        description: investmentDescription.trim(),
        amount: amount,
        source: investmentSource,
        fromDisponible: fromDisponible,
        fromEmergencia: fromEmergencia,
        fromExternalSavings: fromExternalSavings,
        date: investmentDate,
        timestamp: new Date().toISOString()
      };
      await addDoc(collection(db, 'investments'), investmentData);
      setInvestmentDescription('');
      setInvestmentAmount('');
      setInvestmentSource('disponible');
      setInvestmentDate(new Date().toISOString().split('T')[0]);
      alert('💎 Inversión registrada exitosamente');
    } catch (error) {
      console.error('Error al agregar inversión:', error);
      alert('Error al agregar inversión: ' + error.message);
    }
  };

  const deleteInvestment = async (id) => {
    try {
      await deleteDoc(doc(db, 'investments', id));
    } catch (error) {
      console.error('Error eliminando inversión:', error);
    }
  };

  const addExtraIncome = async () => {
    if (!extraIncomeDescription || !extraIncomeAmount || !currentUser) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const incomeData = {
        userId: currentUser.uid,
        description: extraIncomeDescription.trim(),
        amount: parseFloat(extraIncomeAmount),
        date: extraIncomeDate,
        timestamp: new Date().toISOString()
      };
      await addDoc(collection(db, 'extraIncomes'), incomeData);
      setExtraIncomeDescription('');
      setExtraIncomeAmount('');
      setExtraIncomeDate(new Date().toISOString().split('T')[0]);
      setShowExtraIncomeModal(false);
      alert('💰 Ingreso extra agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar ingreso extra:', error);
      alert('Error al agregar ingreso extra: ' + error.message);
    }
  };

  const deleteExtraIncome = async (id) => {
    try {
      await deleteDoc(doc(db, 'extraIncomes', id));
    } catch (error) {
      console.error('Error eliminando ingreso extra:', error);
    }
  };

  const getFilteredExternalSavings = () => {
    return externalSavings.filter(saving => {
      const [year, month] = saving.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getFilteredInvestments = () => {
    return investments.filter(investment => {
      const [year, month] = investment.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getFilteredExtraIncomes = () => {
    return extraIncomes.filter(income => {
      const [year, month] = income.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const handleAuth = async () => {
    if (!email || !password) {
      setLoginError('Por favor ingresa email y contraseña');
      return;
    }

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'userProfiles', userCredential.user.uid), {
          monthlyIncome: 975000,
          savingsGoal: 380000,
          createdAt: new Date().toISOString()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
      setLoginError('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setLoginError('El email ya está registrado');
      } else if (error.code === 'auth/wrong-password') {
        setLoginError('Contraseña incorrecta');
      } else if (error.code === 'auth/user-not-found') {
        setLoginError('Usuario no encontrado');
      } else if (error.code === 'auth/weak-password') {
        setLoginError('La contraseña debe tener al menos 6 caracteres');
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('Email inválido');
      } else {
        setLoginError('Error: ' + error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setExpenses([]);
      setExternalSavings([]);
      setInvestments([]);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al enviar email de recuperación:', error);
      if (error.code === 'auth/user-not-found') {
        throw new Error('No existe una cuenta con este email');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Email inválido');
      } else {
        throw new Error(error.message);
      }
    }
  };

  const addExpense = async () => {
    if (!description || !amount || !currentUser) return;

    try {
      await addDoc(collection(db, 'expenses'), {
        userId: currentUser.uid,
        description,
        amount: parseFloat(amount),
        category,
        date,
        timestamp: new Date().toISOString()
      });
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error('Error agregando gasto:', error);
      alert('Error al agregar gasto. Por favor intenta de nuevo.');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (error) {
      console.error('Error eliminando gasto:', error);
    }
  };

  const getCategoryTotal = (categoryValue) => {
    return getFilteredExpenses().filter(exp => exp.category === categoryValue).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getFilteredExpenses = () => {
    return expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === selectedMonth && expDate.getFullYear() === selectedYear;
    });
  };

  const getAvailableMonths = () => {
    const monthsMap = {};
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      monthsMap[key] = { month: date.getMonth(), year: date.getFullYear() };
    });
    const current = new Date();
    const currentKey = `${current.getFullYear()}-${current.getMonth()}`;
    monthsMap[currentKey] = { month: current.getMonth(), year: current.getFullYear() };
    return Object.values(monthsMap).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  };

  const filteredExpenses = getFilteredExpenses();
  const filteredInvestments = getFilteredInvestments();
  const filteredExtraIncomes = getFilteredExtraIncomes();

  // Cálculos del MES ACTUAL
  const totalExtraIncome = filteredExtraIncomes.reduce((sum, income) => sum + income.amount, 0);
  const totalInvestedFromDisponible = filteredInvestments.reduce((sum, inv) => sum + inv.fromDisponible, 0);
  const totalInvestedFromEmergencia = filteredInvestments.reduce((sum, inv) => sum + inv.fromEmergencia, 0);
  const totalInvestedFromExternalSavings = filteredInvestments.reduce((sum, inv) => sum + (inv.fromExternalSavings || 0), 0);

  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = monthlyIncome + totalExtraIncome - totalSpent - totalInvestedFromDisponible;
  const remainingPercentage = (remaining / (monthlyIncome + totalExtraIncome)) * 100;

  const filteredExternalSavings = getFilteredExternalSavings();
  const totalExternalSavings = filteredExternalSavings.reduce((sum, saving) => sum + saving.amount, 0);

  const emergenciaBase = getCategoryTotal('emergencia');
  const totalEmergenciaSavings = emergenciaBase + totalExternalSavings - totalInvestedFromEmergencia - totalInvestedFromExternalSavings;
  const externalSavingsDisplay = totalExternalSavings - totalInvestedFromExternalSavings;
  const totalSavings = getCategoryTotal('ahorros') + totalEmergenciaSavings;

  // 💰 CÁLCULO DEL PATRIMONIO TOTAL (TODOS LOS MESES - ACUMULADO)
  const allExternalSavings = externalSavings.reduce((sum, saving) => sum + saving.amount, 0);
  const allInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);

  // Calcular todos los gastos de todas las categorías de ahorro (ACUMULADO)
  const allEmergenciaSavings = expenses
    .filter(exp => exp.category === 'emergencia')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const allAhorrosProgramados = expenses
    .filter(exp => exp.category === 'ahorros')
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Calcular inversiones que salieron de ahorros externos (TOTAL)
  const totalInvestedFromExternalSavingsAll = investments.reduce((sum, inv) => sum + (inv.fromExternalSavings || 0), 0);

  // PATRIMONIO TOTAL = Disponible del mes + Todos los ahorros + Todas las inversiones
  const patrimonioTotal = remaining + allAhorrosProgramados + (allEmergenciaSavings + allExternalSavings - totalInvestedFromExternalSavingsAll) + allInvestments;

  const savingsPercentage = (totalSavings / savingsGoal) * 100;
  const spentPercentage = (totalSpent / monthlyIncome) * 100;

  const categoryData = categories.map(cat => {
    const spent = getCategoryTotal(cat.value);
    const limit = cat.limit || spent;
    const percentage = cat.limit ? (spent / cat.limit) * 100 : 0;
    return {
      ...cat,
      spent,
      percentage: Math.min(percentage, 100),
      remaining: cat.limit ? cat.limit - spent : 0,
      isOverLimit: cat.limit && spent > cat.limit,
      isNearLimit: cat.limit && spent >= cat.limit * 0.8 && spent < cat.limit
    };
  });

  const getRecommendations = () => {
    const recommendations = [];
    categoryData.forEach(cat => {
      if (cat.limit && cat.percentage > 80) {
        recommendations.push({
          type: 'warning',
          icon: '⚠️',
          message: `Estás al ${cat.percentage.toFixed(0)}% en ${cat.label}. Considera reducir gastos en esta categoría.`
        });
      }
    });

    const gustosSpent = getCategoryTotal('gastos-gustos');
    const gustosPercentage = (gustosSpent / monthlyIncome) * 100;
    if (gustosPercentage > 20) {
      recommendations.push({
        type: 'info',
        icon: '💡',
        message: `Los Gastos Gustos representan el ${gustosPercentage.toFixed(0)}% de tu ingreso. Lo ideal es mantenerlos bajo el 20%.`
      });
    }

    const entretenimientoSpent = getCategoryTotal('entretenimiento');
    if (entretenimientoSpent > 40000) {
      recommendations.push({
        type: 'tip',
        icon: '🎯',
        message: 'Gastas bastante en entretenimiento. Considera buscar alternativas gratuitas o más económicas.'
      });
    }

    if (savingsPercentage < 50 && savingsPercentage > 0) {
      recommendations.push({
        type: 'goal',
        icon: '💰',
        message: `Llevas ${savingsPercentage.toFixed(0)}% de tu meta de ahorro. ¡Sigue así! Intenta reducir gastos no esenciales.`
      });
    }

    if (savingsPercentage >= 100) {
      recommendations.push({
        type: 'success',
        icon: '🎉',
        message: '¡Excelente! Alcanzaste tu meta de ahorro. Considera aumentar tu meta para el próximo mes.'
      });
    }

    if (spentPercentage < 70) {
      recommendations.push({
        type: 'success',
        icon: '✅',
        message: `¡Vas muy bien! Solo has gastado el ${spentPercentage.toFixed(0)}% de tu presupuesto. Mantén este ritmo.`
      });
    }

    const transporteSpent = getCategoryTotal('transporte');
    const transportePercentage = (transporteSpent / monthlyIncome) * 100;
    if (transportePercentage > 15) {
      recommendations.push({
        type: 'tip',
        icon: '🚴',
        message: 'El transporte consume mucho de tu presupuesto. Considera compartir viajes o usar transporte público.'
      });
    }

    if (filteredInvestments.length > 0) {
      const totalInvested = filteredInvestments.reduce((sum, inv) => sum + inv.amount, 0);
      recommendations.push({
        type: 'success',
        icon: '💎',
        message: `¡Genial! Has invertido ${formatCurrency(totalInvested)} este mes. Las inversiones son clave para tu futuro financiero.`
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        icon: '👍',
        message: '¡Todo está bajo control! Sigues un buen manejo de tu presupuesto.'
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  const pieData = categoryData.filter(cat => cat.spent > 0).map(cat => ({
    name: cat.label,
    value: cat.spent,
    color: cat.color
  }));

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(selectedYear, selectedMonth, 1);
    d.setDate(d.getDate() + i);
    if (d.getMonth() !== selectedMonth) return null;
    return d.toISOString().split('T')[0];
  }).filter(Boolean);

  const dailyExpenses = last30Days.map(day => {
    const dayTotal = expenses.filter(exp => exp.date === day).reduce((sum, exp) => sum + exp.amount, 0);
    return {
      fecha: new Date(day).toLocaleDateString('es', { day: 'numeric', month: 'short' }),
      monto: dayTotal
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        loginError={loginError}
        handleAuth={handleAuth}
        handlePasswordReset={handlePasswordReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Sidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          currentUser={currentUser}
          handleLogout={handleLogout}
          setShowIncomeModal={setShowIncomeModal}
          setShowGoalModal={setShowGoalModal}
          setShowCalculator={setShowCalculator}
          setTempIncome={setTempIncome}
          setTempGoal={setTempGoal}
          monthlyIncome={monthlyIncome}
          savingsGoal={savingsGoal}
        />

        <Header
          currentUser={currentUser}
          setShowSidebar={setShowSidebar}
        />

        <MonthSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          months={months}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
          showMonthSelector={showMonthSelector}
          setShowMonthSelector={setShowMonthSelector}
          getAvailableMonths={getAvailableMonths}
          expenses={expenses}
          formatCurrency={formatCurrency}
        />

        <SummaryCards
          monthlyIncome={monthlyIncome}
          totalSpent={totalSpent}
          remaining={remaining}
          remainingPercentage={remainingPercentage}
          totalSavings={totalSavings}
          savingsGoal={savingsGoal}
          savingsPercentage={savingsPercentage}
          formatCurrency={formatCurrency}
          setShowIncomeModal={setShowIncomeModal}
          setShowGoalModal={setShowGoalModal}
          setTempIncome={setTempIncome}
          setTempGoal={setTempGoal}
          setShowExtraIncomeModal={setShowExtraIncomeModal}
          totalExtraIncome={totalExtraIncome}
          patrimonioTotal={patrimonioTotal}
        />

        <Alerts categoryData={categoryData} formatCurrency={formatCurrency} />

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'overview' && (
          <OverviewTab
            categoryData={categoryData}
            formatCurrency={formatCurrency}
            recommendations={recommendations}
            pieData={pieData}
            spentPercentage={spentPercentage}
            remaining={remaining}
            remainingPercentage={remainingPercentage}
            savingsPercentage={savingsPercentage}
            totalSavings={totalSavings}
            savingsGoal={savingsGoal}
            dailyExpenses={dailyExpenses}
            months={months}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        )}

        {activeTab === 'add' && (
          <AddTab
            description={description}
            setDescription={setDescription}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            categories={categories}
            addExpense={addExpense}
            savingDescription={savingDescription}
            setSavingDescription={setSavingDescription}
            savingAmount={savingAmount}
            setSavingAmount={setSavingAmount}
            savingDate={savingDate}
            setSavingDate={setSavingDate}
            addExternalSaving={addExternalSaving}
            investmentDescription={investmentDescription}
            setInvestmentDescription={setInvestmentDescription}
            investmentAmount={investmentAmount}
            setInvestmentAmount={setInvestmentAmount}
            investmentSource={investmentSource}
            setInvestmentSource={setInvestmentSource}
            investmentDate={investmentDate}
            setInvestmentDate={setInvestmentDate}
            addInvestment={addInvestment}
            remaining={remaining}
            getCategoryTotal={getCategoryTotal}
            totalExternalSavings={totalExternalSavings}
            formatCurrency={formatCurrency}
            setShowExtraIncomeModal={setShowExtraIncomeModal}
          />
        )}

        

        {activeTab === 'transactions' && (
          <TransactionsTab
            // Datos filtrados por mes
            filteredExpenses={filteredExpenses}
            filteredExternalSavings={filteredExternalSavings}
            filteredInvestments={filteredInvestments}
            filteredExtraIncomes={filteredExtraIncomes}

            // AGREGAR ESTAS LÍNEAS - Datos completos (todos los meses)
            allExpenses={expenses}
            allExternalSavings={externalSavings}
            allInvestments={investments}
            allExtraIncomes={extraIncomes}

            // Funciones de eliminación
            deleteExpense={deleteExpense}
            deleteExternalSaving={deleteExternalSaving}
            deleteInvestment={deleteInvestment}
            deleteExtraIncome={deleteExtraIncome}

            // Datos generales
            categories={categories}
            formatCurrency={formatCurrency}
            months={months}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            totalExtraIncome={totalExtraIncome}
            totalInvestedFromExternalSavings={totalInvestedFromExternalSavings}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsTab />}

        <Modals
          showIncomeModal={showIncomeModal}
          setShowIncomeModal={setShowIncomeModal}
          tempIncome={tempIncome}
          setTempIncome={setTempIncome}
          setMonthlyIncome={setMonthlyIncome}
          showGoalModal={showGoalModal}
          setShowGoalModal={setShowGoalModal}
          tempGoal={tempGoal}
          setTempGoal={setTempGoal}
          setSavingsGoal={setSavingsGoal}
          showCalculator={showCalculator}
          setShowCalculator={setShowCalculator}
          calculatorAmount={calculatorAmount}
          setCalculatorAmount={setCalculatorAmount}
          calculatorResult={calculatorResult}
          setCalculatorResult={setCalculatorResult}
          formatCurrency={formatCurrency}
          updateUserProfile={updateUserProfile}
          showExtraIncomeModal={showExtraIncomeModal}
          setShowExtraIncomeModal={setShowExtraIncomeModal}
          extraIncomeDescription={extraIncomeDescription}
          setExtraIncomeDescription={setExtraIncomeDescription}
          extraIncomeAmount={extraIncomeAmount}
          setExtraIncomeAmount={setExtraIncomeAmount}
          extraIncomeDate={extraIncomeDate}
          setExtraIncomeDate={setExtraIncomeDate}
          addExtraIncome={addExtraIncome}
        />
      </div>
    </div>
  );
}

export default App;
