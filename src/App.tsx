import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Family } from './pages/Family'
import { Home } from './pages/Home'
import { Movement } from './pages/Movement'
import { Nutrition } from './pages/Nutrition'
import { Partner } from './pages/Partner'
import { Plan } from './pages/Plan'
import { Spine } from './pages/Spine'
import { Today } from './pages/Today'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sogodni" element={<Today />} />
          <Route path="/hrebets" element={<Spine />} />
          <Route path="/rukh" element={<Movement />} />
          <Route path="/harchuvannya" element={<Nutrition />} />
          <Route path="/simya" element={<Family />} />
          <Route path="/dlya-nyeyi" element={<Partner />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
