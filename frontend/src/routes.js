// Pages
import { AboutUs } from './pages/about-page'
import { Dashboard } from './pages/dashboard-page'
import { HomePage } from './pages/home-page'
import { ToyDetails } from './pages/toy-details'
import { ToyEdit } from './pages/toy-edit'
import { ToyIndex } from './pages/toy-index'

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about',
    component: AboutUs,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/toy',
    component: ToyIndex,
  },
  {
    path: '/toy/:toyId',
    component: ToyDetails,
  },
  {
    path: '/toy/edit',
    component: ToyEdit,
  },
  {
    path: '/toy/edit/:toyId',
    component: ToyEdit,
  },
  //   {
  //     path: '/login',
  //     component: LoginSignup,
  //   },
]
