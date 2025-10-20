import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { Heart, Shield, Target, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { auth, db } from './firebase/config';

// Importar componentes
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Modals from './components/Modals';
import Navbar from './components/Navbar';
import SavingModal from './components/SavingModal';
import Sidebar from './components/Sidebar';

// Importar páginas
import ExpensesPage from "./pages/ExpensesPage";
import DebtsPage from './pages/DebtsPage';
import FinancesPage from './pages/FinancesPage';
import HomePage from './pages/HomePage';
import IncomesPage from './pages/IncomesPage';
import ReportsPage from './pages/ReportsPage';
import SavingsPage from './pages/SavingsPage';

// Importar componentes auxiliares para ExpensesPage

function App() {
  // =========================================
  // ESTADOS DE AUTENTICACIÓN
  // =========================================
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);

  // =========================================
  // ESTADOS DE AHORROS EXTERNOS
  // =========================================
  const [externalSavings, setExternalSavings] = useState([]);
  const [savingDescription, setSavingDescription] = useState('');
  const [savingAmount, setSavingAmount] = useState('');
  const [savingDate, setSavingDate] = useState(new Date().toISOString().split('T')[0]);

  // =========================================
  // ESTADOS DE AHORROS UNIFICADOS (NUEVO)
  // =========================================
  const [savings, setSavings] = useState([]);
  const [showSavingModal, setShowSavingModal] = useState(false);
  const [newSavingDescription, setNewSavingDescription] = useState('');
  const [newSavingAmount, setNewSavingAmount] = useState('');
  const [newSavingType, setNewSavingType] = useState('interno');
  const [newSavingDate, setNewSavingDate] = useState(new Date().toISOString().split('T')[0]);

  // =========================================
  // ESTADOS DE INVERSIONES
  // =========================================
  const [investments, setInvestments] = useState([]);
  const [investmentDescription, setInvestmentDescription] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentSource, setInvestmentSource] = useState('disponible');
  const [investmentDate, setInvestmentDate] = useState(new Date().toISOString().split('T')[0]);

  // =========================================
  // ESTADOS DE INGRESOS EXTRA
  // =========================================
  const [extraIncomes, setExtraIncomes] = useState([]);
  const [showExtraIncomeModal, setShowExtraIncomeModal] = useState(false);
  const [extraIncomeDescription, setExtraIncomeDescription] = useState('');
  const [extraIncomeAmount, setExtraIncomeAmount] = useState('');
  const [extraIncomeDate, setExtraIncomeDate] = useState(new Date().toISOString().split('T')[0]);

  // =========================================
  // ESTADOS DE SALARIOS QUINCENALES
  // =========================================
  const [salaryIncomes, setSalaryIncomes] = useState([]);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [salaryAmount, setSalaryAmount] = useState('975000');
  const [salaryDate, setSalaryDate] = useState(new Date().toISOString().split('T')[0]);
  const [salaryPeriod, setSalaryPeriod] = useState('quincena-1');

  // =========================================
  // ESTADOS DE DEUDAS
  // =========================================
  const [debts, setDebts] = useState([]);
  const [debtPayments, setDebtPayments] = useState([]);

  // =========================================
  // ESTADOS DE CONFIGURACIÓN
  // =========================================
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

  // =========================================
  // ESTADOS DE GASTOS
  // =========================================
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('gastos-gustos');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // =========================================
  // ESTADOS DE MES/AÑO
  // =========================================
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  // =========================================
  // CONSTANTES
  // =========================================
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const categories = [
    { value: 'gastos-gustos', label: '🍿 Gastos Gustos', color: '#FF6384', limit: 290000, limitType: 'quincenal', icon: Heart, description: 'Caprichos y antojos ($290k por quincena)' },
    { value: 'gastos-obligatorios', label: '🏠 Gastos Obligatorios', color: '#FF9F40', limit: null, mandatory: true, icon: Shield, description: 'Arriendo, servicios, comida básica' },
    { value: 'diezmos', label: '⛪ Diezmos', color: '#4BC0C0', limit: null, mandatory: true, icon: Heart, description: 'Contribución obligatoria' },
    { value: 'transporte', label: '🚗 Transporte', color: '#9966FF', limit: 100000, limitType: 'quincenal', icon: TrendingUp, description: 'Transporte y movilidad ($100k por quincena)' },
    { value: 'entretenimiento', label: '🎮 Entretenimiento', color: '#FF9F40', limit: 50000, limitType: 'quincenal', icon: TrendingDown, description: 'Ocio y diversión ($50k por quincena)' },
    { value: 'otros', label: '📦 Otros', color: '#C9CBCF', limit: null, icon: Target, description: 'Gastos varios' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // =========================================
  // EFECTOS Y SUSCRIPCIONES
  // =========================================
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
        subscribeToSalaryIncomes(user.uid);
        subscribeToDebts(user.uid);
        subscribeToDebtPayments(user.uid);
        subscribeToSavings(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'userProfiles', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setMonthlyIncome(data.quincenalIncome || data.monthlyIncome || 975000);
        setSavingsGoal(data.savingsGoal || 380000);
        setTempIncome(String(data.quincenalIncome || data.monthlyIncome || 975000));
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

  // Suscripciones a Firebase
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

  const subscribeToSalaryIncomes = (userId) => {
    const q = query(collection(db, 'salaryIncomes'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const incomesData = [];
      snapshot.forEach((doc) => {
        incomesData.push({ id: doc.id, ...doc.data() });
      });
      setSalaryIncomes(incomesData);
    });
    return unsubscribe;
  };

  const subscribeToDebts = (userId) => {
    const q = query(collection(db, 'debts'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const debtsData = [];
      snapshot.forEach((doc) => {
        debtsData.push({ id: doc.id, ...doc.data() });
      });
      setDebts(debtsData);
    });
    return unsubscribe;
  };

  const subscribeToDebtPayments = (userId) => {
    const q = query(collection(db, 'debtPayments'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const paymentsData = [];
      snapshot.forEach((doc) => {
        paymentsData.push({ id: doc.id, ...doc.data() });
      });
      setDebtPayments(paymentsData);
    });
    return unsubscribe;
  };

  const subscribeToSavings = (userId) => {
    const q = query(collection(db, 'savings'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const savingsData = [];
      snapshot.forEach((doc) => {
        savingsData.push({ id: doc.id, ...doc.data() });
      });
      setSavings(savingsData);
    });
    return unsubscribe;
  };

  // =========================================
  // FUNCIONES DE AUTENTICACIÓN
  // =========================================
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
      setDebts([]);
      setDebtPayments([]);
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

  // =========================================
  // FUNCIONES DE GASTOS
  // =========================================
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

  // =========================================
  // FUNCIONES DE AHORROS EXTERNOS
  // =========================================
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

  // =========================================
  // FUNCIONES DE INVERSIONES
  // =========================================
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

  // =========================================
  // FUNCIONES DE INGRESOS EXTRA
  // =========================================
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

  // =========================================
  // FUNCIONES DE SALARIOS QUINCENALES
  // =========================================
  const addSalaryIncome = async () => {
    if (!salaryAmount || !currentUser) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const periodLabel = salaryPeriod === 'quincena-1' ? 'Quincena 1' : 'Quincena 2';

      const incomeData = {
        userId: currentUser.uid,
        description: `💼 Salario - ${periodLabel}`,
        amount: parseFloat(salaryAmount),
        date: salaryDate,
        period: salaryPeriod,
        timestamp: new Date().toISOString(),
        type: 'salary'
      };

      await addDoc(collection(db, 'salaryIncomes'), incomeData);

      setSalaryAmount('975000');
      setSalaryDate(new Date().toISOString().split('T')[0]);
      setSalaryPeriod('quincena-1');
      setShowSalaryModal(false);

      alert('💰 Salario quincenal registrado exitosamente');
    } catch (error) {
      console.error('Error al agregar salario:', error);
      alert('Error al agregar salario: ' + error.message);
    }
  };

  const deleteSalaryIncome = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro de salario?')) {
      try {
        await deleteDoc(doc(db, 'salaryIncomes', id));
      } catch (error) {
        console.error('Error eliminando salario:', error);
      }
    }
  };

  // =========================================
  // FUNCIONES DE DEUDAS
  // =========================================
  const addDebt = async (debtData) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, 'debts'), {
        ...debtData,
        userId: currentUser.uid,
        timestamp: new Date().toISOString()
      });
      alert('💳 Deuda agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar deuda:', error);
      alert('Error al agregar deuda: ' + error.message);
    }
  };

  const deleteDebt = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta deuda? También se eliminarán todos los pagos asociados.')) {
      try {
        await deleteDoc(doc(db, 'debts', id));
        const paymentsToDelete = debtPayments.filter(p => p.debtId === id);
        for (const payment of paymentsToDelete) {
          await deleteDoc(doc(db, 'debtPayments', payment.id));
        }
      } catch (error) {
        console.error('Error eliminando deuda:', error);
      }
    }
  };

  const addDebtPayment = async (paymentData) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, 'debtPayments'), {
        ...paymentData,
        userId: currentUser.uid,
        timestamp: new Date().toISOString()
      });
      alert('💸 Pago registrado exitosamente');
    } catch (error) {
      console.error('Error al agregar pago:', error);
      alert('Error al agregar pago: ' + error.message);
    }
  };

  const deleteDebtPayment = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pago?')) {
      try {
        await deleteDoc(doc(db, 'debtPayments', id));
      } catch (error) {
        console.error('Error eliminando pago:', error);
      }
    }
  };

  // =========================================
  // FUNCIONES DE AHORROS UNIFICADOS
  // =========================================
  const addSaving = async () => {
    if (!newSavingDescription || !newSavingAmount || !currentUser) {
      alert('Por favor completa todos los campos');
      return;
    }

    const amount = parseFloat(newSavingAmount);

    if (newSavingType === 'interno' || newSavingType === 'emergencia') {
      if (amount > remaining) {
        alert(`No tienes suficiente dinero disponible. Disponible: ${formatCurrency(remaining)}`);
        return;
      }
    }

    try {
      const savingData = {
        userId: currentUser.uid,
        description: newSavingDescription.trim(),
        amount: amount,
        type: newSavingType,
        date: newSavingDate,
        timestamp: new Date().toISOString()
      };

      await addDoc(collection(db, 'savings'), savingData);

      setNewSavingDescription('');
      setNewSavingAmount('');
      setNewSavingType('interno');
      setNewSavingDate(new Date().toISOString().split('T')[0]);
      setShowSavingModal(false);

      const typeLabels = {
        interno: '💰 Ahorro interno',
        externo: '🏦 Ahorro externo',
        emergencia: '🚨 Ahorro emergencia'
      };
      alert(`${typeLabels[newSavingType]} registrado exitosamente`);
    } catch (error) {
      console.error('Error al agregar ahorro:', error);
      alert('Error al agregar ahorro: ' + error.message);
    }
  };

  const deleteSaving = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este ahorro?')) {
      try {
        await deleteDoc(doc(db, 'savings', id));
      } catch (error) {
        console.error('Error eliminando ahorro:', error);
      }
    }
  };

  // =========================================
  // FUNCIONES DE FILTRADO
  // =========================================
  const getFilteredExpenses = () => {
    return expenses.filter(exp => {
      const [year, month, day] = exp.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getFilteredExternalSavings = () => {
    return externalSavings.filter(saving => {
      const [year, month, day] = saving.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getFilteredInvestments = () => {
    return investments.filter(investment => {
      const [year, month, day] = investment.date.split('-').map(
        Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getFilteredExtraIncomes = () => {
    return extraIncomes.filter(income => {
      const [year, month, day] = income.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getFilteredSalaryIncomes = () => {
    return salaryIncomes.filter(income => {
      const [year, month, day] = income.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getFilteredSavings = () => {
    return savings.filter(saving => {
      const [year, month, day] = saving.date.split('-').map(Number);
      return month - 1 === selectedMonth && year === selectedYear;
    });
  };

  const getCategoryTotal = (categoryValue) => {
    return getFilteredExpenses().filter(exp => exp.category === categoryValue).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getCategoryTotalCurrentQuincena = (categoryValue) => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const isFirstQuincena = currentDay <= 15;

    return expenses.filter(exp => {
      if (exp.category !== categoryValue) return false;

      const [year, month, day] = exp.date.split('-').map(Number);

      if (month - 1 !== currentMonth || year !== currentYear) return false;

      if (isFirstQuincena) {
        return day <= 15;
      } else {
        return day > 15;
      }
    }).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getCurrentQuincena = () => {
    const now = new Date();
    return now.getDate() <= 15 ? 1 : 2;
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

  // =========================================
  // CÁLCULOS PRINCIPALES
  // =========================================
  const filteredExpenses = getFilteredExpenses();
  const filteredInvestments = getFilteredInvestments();
  const filteredExtraIncomes = getFilteredExtraIncomes();
  const filteredSalaryIncomes = getFilteredSalaryIncomes();
  const filteredExternalSavings = getFilteredExternalSavings();
  const filteredSavings = getFilteredSavings();
  // CÓDIGO PARA AÑADIR
  const filteredDebtPayments = debtPayments.filter(p => {
    const [year, month] = p.date.split('-').map(Number);
    return month - 1 === selectedMonth && year === selectedYear;
  });
  const totalDebtPaymentsMonth = filteredDebtPayments.reduce((sum, payment) => sum + payment.monto, 0);



  // Calcular ahorros por tipo
  const savingsInterno = filteredSavings
    .filter(s => s.type === 'interno')
    .reduce((sum, s) => sum + s.amount, 0);

  const savingsExterno = filteredSavings
    .filter(s => s.type === 'externo')
    .reduce((sum, s) => sum + s.amount, 0);

  const savingsEmergencia = filteredSavings
    .filter(s => s.type === 'emergencia')
    .reduce((sum, s) => sum + s.amount, 0);

  const totalSavingsMonth = savingsInterno + savingsExterno + savingsEmergencia;

  const totalSalaryIncome = filteredSalaryIncomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExtraIncome = filteredExtraIncomes.reduce((sum, income) => sum + income.amount, 0);
  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const totalInvestedFromDisponible = filteredInvestments.reduce((sum, inv) => sum + inv.fromDisponible, 0);
  const totalInvestedFromEmergencia = filteredInvestments.reduce((sum, inv) => sum + inv.fromEmergencia, 0);
  const totalInvestedFromExternalSavings = filteredInvestments.reduce((sum, inv) => sum + (inv.fromExternalSavings || 0), 0);

  const monthlyIncomeCalculated = totalSalaryIncome + totalExtraIncome;
  const remaining = monthlyIncomeCalculated
    - totalSpent
    - totalInvestedFromDisponible
    - savingsInterno
    - savingsEmergencia;
  - totalDebtPaymentsMonth; // <-- AÑADE ESTA LÍNEA
  const remainingPercentage = monthlyIncomeCalculated > 0 ? (remaining / monthlyIncomeCalculated) * 100 : 0;

  // Patrimonio total
  const allSalaryIncomes = salaryIncomes.reduce((sum, income) => sum + income.amount, 0);
  const allExtraIncomes = extraIncomes.reduce((sum, income) => sum + income.amount, 0);
  const totalIngresoHistorico = allSalaryIncomes + allExtraIncomes;

  const categoriasGastosReales = [
    'gastos-gustos',
    'gastos-obligatorios',
    'diezmos',
    'transporte',
    'entretenimiento',
    'otros'
  ];
  const totalGastosHistoricos = expenses
    .filter(exp => categoriasGastosReales.includes(exp.category))
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalInversionesHistoricas = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalAhorrosExternosHistoricos = externalSavings.reduce((sum, saving) => sum + saving.amount, 0);

  // Sumar TODOS los ahorros históricos del nuevo sistema
  const totalSavingsHistorico = savings.reduce((sum, saving) => sum + saving.amount, 0);

  const patrimonioTotal = totalIngresoHistorico - totalGastosHistoricos - totalInversionesHistoricas + totalAhorrosExternosHistoricos + totalSavingsHistorico;
  const totalExternalSavings = filteredExternalSavings.reduce((sum, saving) => sum + saving.amount, 0);
  const emergenciaBase = getCategoryTotal('emergencia');
  const totalEmergenciaSavings = emergenciaBase + totalExternalSavings - totalInvestedFromEmergencia - totalInvestedFromExternalSavings;
  // ✅ NUEVA:
  // Sumar TODOS los ahorros históricos (no solo del mes)
  const totalSavingsHistoricoCompleto = savings.reduce((sum, saving) => sum + saving.amount, 0);
  const totalSavings = totalSavingsHistoricoCompleto;
  const savingsPercentage = (totalSavings / savingsGoal) * 100;
  const spentPercentage = (totalSpent / monthlyIncomeCalculated) * 100;

  const categoryData = categories.map(cat => {
    const spentMonth = getCategoryTotal(cat.value);
    const spentQuincena = getCategoryTotalCurrentQuincena(cat.value);

    const spent = cat.limitType === 'quincenal' ? spentQuincena : spentMonth;
    const limit = cat.limit || spent;
    const percentage = cat.limit ? (spent / cat.limit) * 100 : 0;

    return {
      ...cat,
      spent,
      spentMonth,
      spentQuincena,
      percentage: Math.min(percentage, 100),
      remaining: cat.limit ? cat.limit - spent : 0,
      isOverLimit: cat.limit && spent > cat.limit,
      isNearLimit: cat.limit && spent >= cat.limit * 0.8 && spent < cat.limit,
      quincenaActual: getCurrentQuincena()
    };
  });

  const getRecommendations = () => {
    const recommendations = [];
    const quincenaActual = getCurrentQuincena();

    categoryData.forEach(cat => {
      if (cat.limit && cat.percentage > 80) {
        const periodo = cat.limitType === 'quincenal' ? `esta quincena (${quincenaActual})` : 'este mes';
        recommendations.push({
          type: 'warning',
          icon: '⚠️',
          message: `Estás al ${cat.percentage.toFixed(0)}% en ${cat.label} para ${periodo}. Considera reducir gastos.`
        });
      }
    });

    const gustosSpent = getCategoryTotalCurrentQuincena('gastos-gustos');
    const gustosPercentage = monthlyIncomeCalculated > 0 ? (gustosSpent / 290000) * 100 : 0;
    if (gustosPercentage > 80) {
      recommendations.push({
        type: 'info',
        icon: '💡',
        message: `Has gastado ${formatCurrency(gustosSpent)} de $290k en gustos esta quincena (${gustosPercentage.toFixed(0)}%).`
      });
    }

    if (savingsPercentage >= 100) {
      recommendations.push({
        type: 'success',
        icon: '🎉',
        message: '¡Excelente! Alcanzaste tu meta de ahorro. Considera aumentar tu meta para el próximo mes.'
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
    const day = i + 1;
    const year = selectedYear;
    const month = selectedMonth + 1;

    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
    if (day > daysInMonth) return null;

    return dateStr;
  }).filter(Boolean);

  const dailyExpenses = last30Days.map(day => {
    const dayTotal = expenses.filter(exp => exp.date === day).reduce((sum, exp) => sum + exp.amount, 0);
    const [year, month, dayNum] = day.split('-').map(Number);
    return {
      fecha: `${dayNum} ${months[month - 1].substring(0, 3)}`,
      monto: dayTotal
    };
  });

  // =========================================
  // RENDERIZADO
  // =========================================
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
    <Router>
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
            monthlyIncome={monthlyIncomeCalculated}
            savingsGoal={savingsGoal}
          />

          // En el return de tu App.js

          <Header
            currentUser={currentUser}
            setShowSidebar={setShowSidebar}
            setShowSalaryModal={setShowSalaryModal} // <--- AGREGA ESTA LÍNEA
          />

          <Routes>
            <Route path="/" element={
              <HomePage
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                months={months}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
                showMonthSelector={showMonthSelector}
                setShowMonthSelector={setShowMonthSelector}
                getAvailableMonths={getAvailableMonths}
                monthlyIncome={monthlyIncomeCalculated}
                totalSpent={totalSpent}
                remaining={remaining}
                remainingPercentage={remainingPercentage}
                totalSavings={totalSavings}
                savingsGoal={savingsGoal}
                savingsPercentage={savingsPercentage}
                patrimonioTotal={patrimonioTotal}
                totalExtraIncome={totalExtraIncome}
                formatCurrency={formatCurrency}
                setShowIncomeModal={setShowIncomeModal}
                setShowGoalModal={setShowGoalModal}
                setTempIncome={setTempIncome}
                setTempGoal={setTempGoal}
                setShowExtraIncomeModal={setShowExtraIncomeModal}
                setShowSavingModal={setShowSavingModal} // ← AGREGAR ESTA LÍNEA
                categoryData={categoryData}
                expenses={expenses}
              />
            } />

            <Route path="/finanzas" element={
              <FinancesPage
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
                filteredExpenses={filteredExpenses}
                deleteExpense={deleteExpense}
                categoryData={categoryData}
                formatCurrency={formatCurrency}
                savingDescription={savingDescription}
                setSavingDescription={setSavingDescription}
                savingAmount={savingAmount}
                setSavingAmount={setSavingAmount}
                savingDate={savingDate}
                setSavingDate={setSavingDate}
                addExternalSaving={addExternalSaving}
                filteredExternalSavings={filteredExternalSavings}
                deleteExternalSaving={deleteExternalSaving}
                investmentDescription={investmentDescription}
                setInvestmentDescription={setInvestmentDescription}
                investmentAmount={investmentAmount}
                setInvestmentAmount={setInvestmentAmount}
                investmentSource={investmentSource}
                setInvestmentSource={setInvestmentSource}
                investmentDate={investmentDate}
                setInvestmentDate={setInvestmentDate}
                addInvestment={addInvestment}
                filteredInvestments={filteredInvestments}
                deleteInvestment={deleteInvestment}
                remaining={remaining}
                getCategoryTotal={getCategoryTotal}
                totalExternalSavings={totalExternalSavings}
                // ← AGREGAR ESTAS PROPS NUEVAS AL FINAL:
                recommendations={recommendations}
                pieData={pieData}
                spentPercentage={spentPercentage}
                remainingPercentage={remainingPercentage}
                savingsPercentage={savingsPercentage}
                totalSavings={totalSavings}
                savingsGoal={savingsGoal}
                dailyExpenses={dailyExpenses}
                months={months}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            } />

            <Route path="/ingresos" element={
              <IncomesPage
                setShowSalaryModal={setShowSalaryModal}
                setShowExtraIncomeModal={setShowExtraIncomeModal}
                filteredSalaryIncomes={filteredSalaryIncomes}
                filteredExtraIncomes={filteredExtraIncomes}
                deleteSalaryIncome={deleteSalaryIncome}
                deleteExtraIncome={deleteExtraIncome}
                formatCurrency={formatCurrency}
              />
            } />

            <Route path="/gastos" element={
              <ExpensesPage
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
                filteredExpenses={filteredExpenses}
                deleteExpense={deleteExpense}
              />
            } />

            <Route path="/ahorros" element={
              <SavingsPage
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
                filteredExternalSavings={filteredExternalSavings}
                filteredInvestments={filteredInvestments}
                deleteExternalSaving={deleteExternalSaving}
                deleteInvestment={deleteInvestment}
                formatCurrency={formatCurrency}
                getCategoryTotal={getCategoryTotal}
                remaining={remaining}
                totalExternalSavings={totalExternalSavings}
                setShowSavingModal={setShowSavingModal} // ← AGREGAR ESTA LÍNEA
              />
            } />
            <Route path="/deudas" element={
              <DebtsPage
                debts={debts}
                debtPayments={debtPayments}
                addDebt={addDebt}
                deleteDebt={deleteDebt}
                addDebtPayment={addDebtPayment}
                deleteDebtPayment={deleteDebtPayment}
                formatCurrency={formatCurrency}
                remaining={remaining}
              />
            } />

            <Route path="/reportes" element={
              <ReportsPage
                filteredExpenses={filteredExpenses}
                filteredExternalSavings={filteredExternalSavings}
                filteredInvestments={filteredInvestments}
                filteredExtraIncomes={filteredExtraIncomes}
                filteredSalaryIncomes={filteredSalaryIncomes}
                allExpenses={expenses}
                allExternalSavings={externalSavings}
                allInvestments={investments}
                allExtraIncomes={extraIncomes}
                allSalaryIncomes={salaryIncomes}
                deleteExpense={deleteExpense}
                deleteExternalSaving={deleteExternalSaving}
                deleteInvestment={deleteInvestment}
                deleteExtraIncome={deleteExtraIncome}
                deleteSalaryIncome={deleteSalaryIncome}
                categories={categories}
                formatCurrency={formatCurrency}
                months={months}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                totalExtraIncome={totalExtraIncome}
                totalInvestedFromExternalSavings={totalInvestedFromExternalSavings}
                filteredSavings={filteredSavings}
                allSavings={savings}
                deleteSaving={deleteSaving}
              />
            } />
          </Routes>

          <Navbar />

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
            showSalaryModal={showSalaryModal}
            setShowSalaryModal={setShowSalaryModal}
            salaryAmount={salaryAmount}
            setSalaryAmount={setSalaryAmount}
            salaryDate={salaryDate}
            setSalaryDate={setSalaryDate}
            salaryPeriod={salaryPeriod}
            setSalaryPeriod={setSalaryPeriod}
            addSalaryIncome={addSalaryIncome}
          />

          <SavingModal
            showSavingModal={showSavingModal}
            setShowSavingModal={setShowSavingModal}
            newSavingDescription={newSavingDescription}
            setNewSavingDescription={setNewSavingDescription}
            newSavingAmount={newSavingAmount}
            setNewSavingAmount={setNewSavingAmount}
            newSavingType={newSavingType}
            setNewSavingType={setNewSavingType}
            newSavingDate={newSavingDate}
            setNewSavingDate={setNewSavingDate}
            addSaving={addSaving}
            formatCurrency={formatCurrency}
            remaining={remaining}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
