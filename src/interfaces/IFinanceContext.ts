import type { IFinance } from "./IFinance";

export interface IFinanceContext {
  finance: IFinance | null;
  refreshFinance: () => Promise<void>;
  updateFinance: (updates: Partial<IFinance>) => Promise<void>
}