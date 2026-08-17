import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/NotFound'

function App() {
  // state 1: dark mode toggle (saved to localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  // effect 2: apply theme to html element and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route path="/"                   element={<Home />} />
          <Route path="/about"              element={<About />} />
          <Route path="/projects"           element={<Projects />} />
          <Route path="/projects/:id"       element={<ProjectDetail />} />
          <Route path="/contact"            element={<Contact />} />
          <Route path="*"                   element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
