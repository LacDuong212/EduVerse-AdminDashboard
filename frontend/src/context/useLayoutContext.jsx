'use client';

import useToggle from '@/hooks/useToggle';
import { createContext, useContext, useMemo } from 'react';

const LayoutContext = createContext(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext can only be used within LayoutProvider');
  }
  return context;
};

export const LayoutProvider = ({ children }) => {
  const { isTrue, toggle } = useToggle();

  const appMenuControl = { open: isTrue, toggle };

  const value = useMemo(() => ({ appMenuControl }), [isTrue]);

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};
