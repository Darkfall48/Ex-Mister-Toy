// Libraries
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
// Services
import { store } from './store/store'
// Style
import './assets/style/main.css'
// Components
import { AppFooter } from './cmps/app-footer'
import { AppHeader } from './cmps/app-header'
// Pages
import { AboutUs } from './pages/about-us'
import { HomePage } from './pages/home-page'
import { ToyIndex } from './pages/toy-index'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<AboutUs />} path="/about" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}
