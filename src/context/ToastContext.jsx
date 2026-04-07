import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

const config = {
  success: {
    icon: CheckCircle2,
    cls: 'bg-white border-emerald-200 text-emerald-800',
    iconCls: 'text-emerald-500',
    bar: 'bg-emerald-500',
  },
  error: {
    icon: AlertCircle,
    cls: 'bg-white border-red-200 text-red-800',
    iconCls: 'text-red-500',
    bar: 'bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    cls: 'bg-white border-amber-200 text-amber-800',
    iconCls: 'text-amber-500',
    bar: 'bg-amber-500',
  },
  info: {
    icon: Info,
    cls: 'bg-white border-blue-200 text-blue-800',
    iconCls: 'text-blue-500',
    bar: 'bg-blue-500',
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map(({ id, message, type }) => {
          const { icon: Icon, cls, iconCls, bar } = config[type] ?? config.info;
          return (
            <div
              key={id}
              className={`pointer-events-auto flex items-start gap-3 pl-4 pr-3 py-3
                rounded-xl border shadow-xl min-w-[260px] max-w-sm
                animate-slide-up ${cls}`}
            >
              <Icon size={16} className={`flex-shrink-0 mt-0.5 ${iconCls}`} />
              <p className="text-sm font-medium flex-1 leading-snug">{message}</p>
              <button
                onClick={() => remove(id)}
                className="opacity-50 hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
              >
                <X size={13} />
              </button>
              {/* Progress bar */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 rounded-b-xl ${bar} animate-[shrink_3.5s_linear_forwards]`}
                style={{ width: '100%' }}
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

/** Call as: `const toast = useToast();  toast('Done!', 'success');` */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

