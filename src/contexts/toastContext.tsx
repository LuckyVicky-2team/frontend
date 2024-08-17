'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

type ToastType = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

type ToastContextType = {
  toasts: ToastType[];
  addToast: (_message: string, _type: 'success' | 'error') => void;
  removeToast: (_id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: 'success' | 'error') => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prevToasts => [...prevToasts, { id, message, type }]);
      setTimeout(() => removeToast(id), 4000);
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error(
      'useToastContext 는 ToastProvider 범위 내에서 사용해주세요.'
    );

  return context;
};
