// Pages
import { AboutUs } from './pages/about-us'
import { HomePage } from './pages/home-page'
import { ToyDetails } from './pages/toy-details'
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
    path: '/toy',
    component: ToyIndex,
  },
  {
    path: '/toy/:toyId',
    component: ToyDetails,
  },
  //   {
  //     path: '/toy/edit',
  //     component: ToyEdit,
  //   },
  //   {
  //     path: '/toy/edit/:toyId',
  //     component: ToyEdit,
  //   },
  //   {
  //     path: '/login',
  //     component: LoginSignup,
  //   },
]
