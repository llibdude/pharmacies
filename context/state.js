import { createContext, useContext, useState } from "react";

const Context = createContext();

export function PurchaseHistoryProvider({ children }) {
  const [purchaseHistory, setPurchaseHistory] = useState({});
  return (
    <Context.Provider value={[purchaseHistory, setPurchaseHistory]}>
      {children}
    </Context.Provider>
  );
}

export function usePurchaseHistoryContext() {
  return useContext(Context);
}
