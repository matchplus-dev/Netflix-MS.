import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Activity } from 'lucide-react';

const ServiceCard = ({ service, isActive, onToggle, delay }) => {
  const Icon = service.icon;
  const isDown = service.status === 'down';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      onClick={onToggle}
      className={`relative cursor-pointer rounded-2xl p-6 shadow-xl border-2 transition-all ${
        isActive
          ? 'border-yellow-400 shadow-yellow-400/50'
          : isDown
          ? 'border-red-500 shadow-red-500/30'
          : 'border-gray-700 hover:border-gray-600'
      } ${isDown ? 'bg-gray-900' : 'bg-gradient-to-br ' + service.color}`}
    >
      {/* Active Indicator */}
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute top-2 right-2"
        >
          <Activity className="text-yellow-400" size={24} />
        </motion.div>
      )}

      {/* Service Icon */}
      <div className="flex items-center justify-between mb-4">
        <motion.div
          animate={isActive ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: isActive ? Infinity : 0, ease: "linear" }}
          className="bg-white bg-opacity-20 rounded-full p-3"
        >
          <Icon size={32} className="text-white" />
        </motion.div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isDown ? (
            <XCircle className="text-red-400" size={20} />
          ) : (
            <CheckCircle className="text-green-400" size={20} />
          )}
        </div>
      </div>

      {/* Service Name */}
      <h3 className="text-white text-xl font-bold mb-2">{service.name}</h3>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold ${isDown ? 'text-red-300' : 'text-green-300'}`}>
          {isDown ? 'Caído' : 'Activo'}
        </span>
        <span className="text-white text-sm bg-black bg-opacity-30 px-3 py-1 rounded-full">
          {service.requests} requests
        </span>
      </div>

      {/* Pulse Animation */}
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute inset-0 rounded-2xl bg-yellow-400 pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default ServiceCard;