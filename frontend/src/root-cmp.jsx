// Libraries
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
// Services
import { store } from './store/store'
import routes from './routes'
// Style
import './assets/style/main.scss'
// Components
import { AppFooter } from './cmps/app-footer'
import { AppHeader } from './cmps/app-header'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  element={<route.component />}
                  path={route.path}
                />
              ))}
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}
