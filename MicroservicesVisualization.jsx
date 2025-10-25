import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, User, Film, Star, CreditCard, Database, AlertTriangle, CheckCircle, XCircle, Zap, ArrowRight } from 'lucide-react';
import ServiceCard from './ServiceCard';
import RequestFlow from './RequestFlow';
import StatusPanel from './StatusPanel';

const MicroservicesVisualization = () => {
  const [services, setServices] = useState({
    auth: { name: 'Autenticación', status: 'active', icon: User, color: 'from-blue-500 to-blue-700', requests: 0 },
    catalog: { name: 'Catálogo', status: 'active', icon: Film, color: 'from-purple-500 to-purple-700', requests: 0 },
    recommendations: { name: 'Recomendaciones', status: 'active', icon: Star, color: 'from-yellow-500 to-yellow-700', requests: 0 },
    streaming: { name: 'Reproducción', status: 'active', icon: Play, color: 'from-red-500 to-red-700', requests: 0 },
    payments: { name: 'Pagos', status: 'active', icon: CreditCard, color: 'from-green-500 to-green-700', requests: 0 },
    database: { name: 'Base de Datos', status: 'active', icon: Database, color: 'from-indigo-500 to-indigo-700', requests: 0 }
  });

  const [activeFlow, setActiveFlow] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [{ message, type, timestamp, id: Date.now() }, ...prev.slice(0, 9)]);
  };

  const simulateRequest = async (scenario) => {
    setIsSimulating(true);
    
    if (scenario === 'normal') {
      addLog('🎬 Usuario intenta ver una película', 'info');
      setActiveFlow('auth');
      await delay(800);
      
      if (services.auth.status === 'active') {
        incrementRequest('auth');
        addLog('✅ Autenticación exitosa', 'success');
        setActiveFlow('catalog');
        await delay(800);
        
        if (services.catalog.status === 'active') {
          incrementRequest('catalog');
          addLog('✅ Catálogo cargado', 'success');
          setActiveFlow('recommendations');
          await delay(800);
          
          if (services.recommendations.status === 'active') {
            incrementRequest('recommendations');
            addLog('✅ Recomendaciones generadas', 'success');
            setActiveFlow('streaming');
            await delay(800);
            
            if (services.streaming.status === 'active') {
              incrementRequest('streaming');
              addLog('✅ Streaming iniciado', 'success');
              setActiveFlow('database');
              await delay(600);
              incrementRequest('database');
              addLog('🎉 ¡Película reproduciéndose!', 'success');
            } else {
              addLog('❌ Error: Servicio de reproducción caído', 'error');
            }
          } else {
            addLog('⚠️ Recomendaciones no disponibles, pero continúa...', 'warning');
            setActiveFlow('streaming');
            await delay(800);
            if (services.streaming.status === 'active') {
              incrementRequest('streaming');
              addLog('✅ Streaming iniciado sin recomendaciones', 'success');
            }
          }
        } else {
          addLog('❌ Error: Catálogo no disponible', 'error');
        }
      } else {
        addLog('❌ Error: No se puede autenticar', 'error');
      }
    } else if (scenario === 'payment') {
      addLog('💳 Usuario intenta actualizar suscripción', 'info');
      setActiveFlow('auth');
      await delay(800);
      
      if (services.auth.status === 'active') {
        incrementRequest('auth');
        addLog('✅ Autenticación exitosa', 'success');
        setActiveFlow('payments');
        await delay(800);
        
        if (services.payments.status === 'active') {
          incrementRequest('payments');
          addLog('✅ Pago procesado', 'success');
          setActiveFlow('database');
          await delay(600);
          incrementRequest('database');
          addLog('🎉 Suscripción actualizada', 'success');
        } else {
          addLog('❌ Error: Servicio de pagos no disponible', 'error');
          addLog('🔄 Reintentar más tarde o usar método alternativo', 'warning');
        }
      }
    }
    
    await delay(1000);
    setActiveFlow(null);
    setIsSimulating(false);
  };

  const incrementRequest = (serviceKey) => {
    setServices(prev => ({
      ...prev,
      [serviceKey]: { ...prev[serviceKey], requests: prev[serviceKey].requests + 1 }
    }));
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const toggleService = (serviceKey) => {
    setServices(prev => ({
      ...prev,
      [serviceKey]: {
        ...prev[serviceKey],
        status: prev[serviceKey].status === 'active' ? 'down' : 'active'
      }
    }));
    
    const newStatus = services[serviceKey].status === 'active' ? 'caído' : 'reactivado';
    addLog(`🔧 Servicio "${services[serviceKey].name}" ${newStatus}`, newStatus === 'caído' ? 'error' : 'success');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Zap className="text-red-500" size={48} />
          Arquitectura Netflix
        </h1>
        <p className="text-gray-400 text-lg">Visualización de microservicios</p>
      </motion.div>

      {/* Control Panel */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="text-yellow-400" />
            Simulaciones
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => simulateRequest('normal')}
              onKeyDown={(e) => {
                if (e.ctrlKey && !isSimulating) {
                  simulateRequest('normal');
                }
              }}
              tabIndex={0}
              disabled={isSimulating}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Ver Película / Serie
              <span className="text-xs text-blue-300 ml-1"></span>
            </button>
            <button
              onClick={() => simulateRequest('payment')}
              disabled={isSimulating}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Procesar Pago
            </button>
          </div>
          
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Microservicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(services).map(([key, service], index) => (
            <ServiceCard
              key={key}
              service={service}
              isActive={activeFlow === key}
              onToggle={() => toggleService(key)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Flow Visualization */}
      <RequestFlow activeFlow={activeFlow} services={services} />

      {/* Status Panel */}
      <StatusPanel logs={logs} />

      {/* Info Panel */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-4xl mx-auto mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700"
      >
        
      </motion.div>
    </div>
  );
};

export default MicroservicesVisualization;