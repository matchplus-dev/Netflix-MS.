import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const RequestFlow = ({ activeFlow, services }) => {
  const flowOrder = ['auth', 'catalog', 'recommendations', 'streaming', 'database'];
  
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Flujo de Solicitud</h2>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {flowOrder.map((key, index) => {
            const service = services[key];
            const isActive = activeFlow === key;
            const Icon = service.icon;
            
            return (
              <React.Fragment key={key}>
                {/* Service Node */}
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1], y: [0, -5, 0] } : {}}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 0.8 }}
                  className={`flex flex-col items-center gap-2 ${
                    isActive ? 'z-10' : 'z-0'
                  }`}
                >
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-400/50'
                        : service.status === 'down'
                        ? 'bg-gradient-to-br from-gray-600 to-gray-800'
                        : `bg-gradient-to-br ${service.color}`
                    }`}
                  >
                    <Icon size={28} className="text-white" />
                    
                    {/* Active Ring */}
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute inset-0 rounded-full border-4 border-yellow-400"
                      />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {service.name}
                  </span>
                </motion.div>

                {/* Arrow */}
                {index < flowOrder.length - 1 && (
                  <motion.div
                    animate={isActive ? { x: [0, 5, 0] } : {}}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 0.8 }}
                  >
                    <ArrowRight
                      size={24}
                      className={`${
                        activeFlow && flowOrder.indexOf(activeFlow) >= index
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      } transition-colors`}
                    />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RequestFlow;