import React, { createContext, useEffect, useState, type ReactNode } from 'react'
import type { IFinanceContext } from '../interfaces/IFinanceContext'
import type { IFinance } from '../interfaces/IFinance'
import FinanceService from '../services/FinanceService'
interface Props { children: ReactNode };


export const FinanceContext = createContext<IFinanceContext>({
  finance: { id: 0, moneyLeft: 200000, numberOfPurchases: 0, moneySpent: 0 },
  refreshFinance: async () => { },
  updateFinance: async () => { },
})
export const FinanceProvider = ({ children }: Props) => {
  const [finance, setFinance] = useState<IFinance>({
    id: 0,
    moneyLeft: 200000,
    numberOfPurchases: 0,
    moneySpent: 0
  });

  const refreshFinance = async () => {
    const response = await FinanceService.getFinance();
    if (response.success && response.data) {
      setFinance(response.data);
    }
  };

  const updateFinance = async (updates: Partial<IFinance>) => {
    setFinance(prev => ({ ...prev, updates }));


    // må lage FinanceService update 
    //{...finance, ...updates}

  }


  useEffect(() => {
    refreshFinance()
  }, [])//triger ved mount


  return (
    <FinanceContext.Provider value={{ finance, refreshFinance, updateFinance }}>
      {children}
    </FinanceContext.Provider>
  )
}

