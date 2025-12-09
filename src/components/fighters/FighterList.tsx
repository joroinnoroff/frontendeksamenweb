import React, { useContext } from 'react';
import { FighterContext } from '../../contexts/FighterContext';
import type IFighterContext from '../../interfaces/IFighterContext';
import FighterItem from './FighterItem';

const FighterList = () => {
  const context = useContext(FighterContext) as IFighterContext;
  const { fighters } = context;

  return (
    <section className="grid grid-cols-12 gap-2">
      {fighters.map((fighter, i) => (
        <FighterItem key={"fighter" + i} fighter={fighter} />
      ))}
    </section>
  );
};

export default FighterList;
