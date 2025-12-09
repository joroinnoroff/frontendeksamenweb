import React from 'react'
import FighterList from '../components/fighters/FighterList'
import FighterForm from '../components/fighters/FighterForm'

interface Props { }

const HomePage = () => {
  return <div className=''>
    <h1>All fighters</h1>

    <FighterForm />


    <FighterList />
  </div>
}

export default HomePage