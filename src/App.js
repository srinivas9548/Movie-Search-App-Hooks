import Home from './components/Home'

import './App.css'
import { useState } from 'react'
import MovieContext from './context/MovieContext'

const App = () => {
  const [lightTheme, setLightTheme] = useState(true)
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false)

  const changeTheme = () => {
    setLightTheme(prev => !prev)
  }

  const toggleSearchbar = () => {
    setIsSearchbarOpen(prev => !prev)
  }

  return (
    <MovieContext.Provider value={{lightTheme, changeTheme, isSearchbarOpen, toggleSearchbar}}>
      <div className="app-container">
        <Home />
      </div>
    </MovieContext.Provider>

  )
}

export default App