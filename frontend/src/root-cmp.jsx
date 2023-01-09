import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppFooter } from './cmps/app-footer'
import { AppHeader } from './cmps/app-header'
import { AboutUs } from './pages/about-us'
import { HomePage } from './pages/home-page'

export function App() {
  return (
    <Router>
      <section className="main-layout app">
        <AppHeader />
        <main>
          <Routes>
            <Route element={<HomePage />} path="/" />
            {/* <Route element={<CarIndex />} path="/toy" /> */}
            <Route element={<AboutUs />} path="/about" />
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  )
}
