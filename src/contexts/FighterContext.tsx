import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import type IFighterContext from '../interfaces/IFighterContext';
import type { IFighter } from '../interfaces/IFighter';
import FighterService from '../services/FighterService';

export const FighterContext = createContext<IFighterContext | null>(null);

interface Props { children: ReactNode }

export const FighterProvider = ({ children }: Props) => {
  const [fighters, setFighters] = useState<IFighter[]>([]);

  // Hent alle fighters
  const fetchFighters = async () => {
    const response = await FighterService.getAllFighters();
    if (response.success && response.data) setFighters(response.data);
    else setFighters([]);
  };

  useEffect(() => {
    fetchFighters();
  }, []);




  // Legg til fighter med bilde
  const saveFighter = async (
    fighter: Omit<IFighter, "id" | "image">,
    imageFile: File
  ): Promise<IFighter | null> => {
    const savedFighter = await FighterService.postFighter(fighter, imageFile);

    if (savedFighter) {
      setFighters(prev => [...prev, savedFighter]); // <-- oppdater state
      return savedFighter;
    }

    return null;
  };



  const getFighterQuantity = (): number => fighters.length;

  const updateFighterStatus = (fighterId: number, status: boolean) => {
    setFighters(prev =>
      prev.map(f => f.id === fighterId ? { ...f, purchaseStatus: status } : f)
    );
  };

  const deleteFighter = async (fighter: IFighter): Promise<boolean> => {
    try {
      await FighterService.deleteFighter(fighter);
      setFighters(prev => prev.filter(f => f.id !== fighter.id)); // oppdater state
      return true;
    } catch (err) {
      console.error("Error deleting fighter:", err);
      return false;
    }
  };



  return (
    <FighterContext.Provider value={{
      fighters,
      getFighterQuantity,
      saveFighter,
      updateFighterStatus,
      deleteFighter
    }}>
      {children}
    </FighterContext.Provider>
  );
};
