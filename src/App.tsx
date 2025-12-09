import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouting from './routing/AppRouting'
import { FighterProvider } from './contexts/FighterContext'

function App() {


  return (
    <>
      <FighterProvider>
        <AppRouting />
      </FighterProvider>
    </>
  )
}

export default App
