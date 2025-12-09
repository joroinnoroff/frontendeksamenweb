import React, { useContext } from 'react'
import { FinanceContext } from '../../contexts/FinanceContext'

interface Props { }

const MyMoney = () => {
  const { finance } = useContext(FinanceContext);


  return <div>
    {finance?.moneyLeft ?? 0}
  </div>
}

export default MyMoney