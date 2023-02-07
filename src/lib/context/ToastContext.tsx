import { createContext, useCallback, useEffect, useState } from 'react';

import Toast, { IToast } from '@/components/design/atoms/Toast';

const ToastContext = createContext<unknown>(null);

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((toasts) => toasts.slice(1));
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    function (toast: IToast) {
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      <div className='absolute bottom-0 mb-8 flex w-full flex-col items-center justify-center'>
        {toasts.map((toast, index) => (
          <Toast key={index} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastContext;
