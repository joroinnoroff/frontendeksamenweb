import React, { useContext } from 'react'
import type { IFighter } from '../../interfaces/IFighter'
import PurchasingButton from '../PurchasingButton'
import { FighterContext } from '../../contexts/FighterContext';

interface Props {
  fighter: IFighter
}
const backendUrl = "http://localhost:5279";
const FighterItem = ({ fighter }: Props) => {
  const { deleteFighter } = useContext(FighterContext)!;

  const handleDelete = async () => {
    if (window.confirm(`Slette fighter ${fighter.name}?`)) {
      await deleteFighter(fighter);
    }
  };
  return <div>
    <h3>{fighter.name}</h3>
    {fighter.image && (
      <img
        src={`${backendUrl}${fighter.image}`}
        alt={fighter.name}
        className="w-32 h-32 object-cover"
      />
    )}
    <p>Purchase fighter for ${fighter.price}</p>
    <span>{fighter.purchaseStatus ? "Unlocked" : "Locked"}</span>
    <PurchasingButton fighter={fighter} />

    <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded mt-2">
      Delete
    </button>
  </div>
}

export default FighterItem