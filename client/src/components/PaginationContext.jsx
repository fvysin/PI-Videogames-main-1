import React, { createContext, useContext, useState } from 'react';

const PaginationContext = createContext();

export const usePagination = () => useContext(PaginationContext);

export const PaginationProvider = ({ children }) => {
  const [pagina, setPagina] = useState(1);

  return (
    <PaginationContext.Provider value={{ pagina, setPagina }}>
      {children}
    </PaginationContext.Provider>
  );
};