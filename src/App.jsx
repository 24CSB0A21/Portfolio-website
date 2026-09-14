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
  // state 1: track if dark mode is on or off
  // lazy initializer reads from localStorage so preference is remembered on refresh
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme') // check if user already picked a theme
    return saved === 'dark'
  })

  // effect 2: runs every time darkMode changes
  // applies the theme to the <html> element and saves it to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')  // switches CSS variables to dark
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light') // switches CSS variables to light
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode]) // runs whenever darkMode value changes

  // flips darkMode between true and false
  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  return (
    // BrowserRouter enables client-side routing (no full page reloads)
    <BrowserRouter>
      <Routes>
        {/* Layout wraps every route - keeps Navbar and Footer on all pages */}
        {/* darkMode and toggleDarkMode are passed down via props (prop drilling) */}
        <Route element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route path="/"              element={<Home />} />         {/* home/landing page */}
          <Route path="/about"         element={<About />} />        {/* education, skills, achievements */}
          <Route path="/projects"      element={<Projects />} />     {/* list of all projects */}
          <Route path="/projects/:id"  element={<ProjectDetail />} />{/* single project detail page */}
          <Route path="/contact"       element={<Contact />} />      {/* contact form */}
          <Route path="*"              element={<NotFound />} />     {/* 404 - catches any unknown URL */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
