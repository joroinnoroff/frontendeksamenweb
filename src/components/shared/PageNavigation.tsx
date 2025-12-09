import React from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import MyMoney from './MyMoney'

interface Props { }

const PageNavigation = () => {
  return <header>
    <Toaster position='top-right' />
    <nav>
      <ul>
        <li><Link to="">
          Alle fighters
        </Link></li>
        <li><Link to="">
          Legg til
        </Link></li>
        <li><Link to="">
          Dashbord
        </Link></li>
        <li><Link to="">
          Venues
        </Link></li>
      </ul>

      <MyMoney />
    </nav>
  </header>
}

export default PageNavigation