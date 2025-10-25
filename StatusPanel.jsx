import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const StatusPanel = ({ logs }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-400" size={16} />;
      case 'error':
        return <XCircle className="text-red-400" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-400" size={16} />;
      default:
        return <Info className="text-blue-400" size={16} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-300';
      case 'error':
        return 'text-red-300';
      case 'warning':
        return 'text-yellow-300';
      default:
        return 'text-blue-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
        <Terminal className="text-green-400" />
        Registro de Actividad
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black rounded-2xl p-6 border-2 border-green-500 shadow-2xl shadow-green-500/20 font-mono text-sm"
      >
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {logs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-center py-8"
              >
                Esperando actividad...
              </motion.div>
            ) : (
              logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-start gap-3 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">{getIcon(log.type)}</div>
                  <div className="flex-1">
                    <p className={`${getColor(log.type)} leading-relaxed`}>
                      {log.message}
                    </p>
                    <span className="text-gray-600 text-xs mt-1 block">
                      {log.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default StatusPanel;