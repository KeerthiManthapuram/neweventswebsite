// src/hooks/use-toast.js
import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ message: '', type: '', visible: false });
    }, 3000); // auto-hide in 3 sec
  }, []);

  return { toast, showToast };
};
