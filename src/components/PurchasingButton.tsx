import React, { useContext, useState } from 'react';
import type { IFighter } from '../interfaces/IFighter';
import { FinanceContext } from '../contexts/FinanceContext';
import { FighterContext } from '../contexts/FighterContext';
import type IFighterContext from '../interfaces/IFighterContext';
import { toast } from 'sonner';

interface Props {
  fighter: IFighter;
}

const PurchasingButton = ({ fighter }: Props) => {
  const financeContext = useContext(FinanceContext);
  const fighterContext = useContext(FighterContext) as IFighterContext;
  const [loading, setLoading] = useState(false);

  if (!financeContext || !fighterContext) return null;

  const { finance, updateFinance } = financeContext;
  const { fighters, setFighters } = fighterContext;

  const handlePurchase = async () => {
    if (!finance) return;

    if (fighter.price > finance.moneyLeft) {
      toast.error("Du har ikke nok penger til å kjøpe denne fighteren");
      return;
    }

    setLoading(true);

    try {
      // Simulerer API-kall for kjøp (erstatt med FighterService senere)
      await new Promise((r) => setTimeout(r, 500));

      toast.success(`Du har kjøpt fighter ${fighter.name}`);

      // Oppdater finance via context
      await updateFinance({
        moneyLeft: finance.moneyLeft - fighter.price,
        moneySpent: finance.moneySpent + fighter.price,
        numberOfPurchases: finance.numberOfPurchases + 1
      });

      // Oppdater fighterens purchaseStatus lokalt
      const updatedFighters = fighters.map(f =>
        f.id === fighter.id ? { ...f, purchaseStatus: true } : f
      );
      setFighters(updatedFighters);
    } catch (error) {
      console.error(error);
      toast.error("Kjøp feilet, prøv igjen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading || fighter.purchaseStatus}
      className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
    >
      {loading ? "Buying..." : fighter.purchaseStatus ? "Unlocked" : `Buy for $${fighter.price}`}
    </button>
  );
};

export default PurchasingButton;
