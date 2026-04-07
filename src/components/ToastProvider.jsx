import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

const ToastContext = createContext(null);

const iconByType = {
  success: FiCheckCircle,
  error: FiXCircle,
  info: FiInfo,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ pushToast, showToast: pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[70] space-y-2">
        {toasts.map((toast) => {
          const Icon = iconByType[toast.type] || FiInfo;
          return (
            <div
              key={toast.id}
              className="flex min-w-64 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl"
            >
              <Icon
                className={`text-lg ${
                  toast.type === 'success'
                    ? 'text-emerald-600'
                    : toast.type === 'error'
                      ? 'text-rose-600'
                      : 'text-blue-600'
                }`}
              />
              <p className="text-sm text-slate-700">{toast.message}</p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return context;
};

