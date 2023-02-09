import { useContext } from 'react';

import ToastContext from '@/lib/context/ToastContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useToast: any = () => {
  return useContext(ToastContext);
};

export default useToast;
