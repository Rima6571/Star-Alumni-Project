import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

const ToastContext = createContext(null);

const iconByType = {
  success: FiCheckCircle,
  error: FiXCircle,
  info: FiInfo,
};

const bgByType = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3200);
  }, [removeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[90] space-y-2 w-[min(90vw,360px)]">
        {toasts.map((toast) => {
          const Icon = iconByType[toast.type] || FiInfo;
          return (
            <div
              key={toast.id}
              className={`border rounded-xl shadow-lg px-4 py-3 flex items-start gap-2.5 animate-fade-in ${bgByType[toast.type] || bgByType.info}`}
            >
              <Icon className="mt-0.5 shrink-0" />
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button className="text-xs font-semibold" onClick={() => removeToast(toast.id)}>Dismiss</button>
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
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

