import { useContext } from 'react';

import ToastContext from '@/lib/context/ToastContext';

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;
