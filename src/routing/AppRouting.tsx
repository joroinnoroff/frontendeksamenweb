import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageNavigation from '../components/shared/PageNavigation'
import HomePage from '../pages/HomePage'
interface Props { }

const AppRouting = () => {
  return <BrowserRouter>
    <PageNavigation></PageNavigation>

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route />
    </Routes>
  </BrowserRouter>
}

export default AppRouting