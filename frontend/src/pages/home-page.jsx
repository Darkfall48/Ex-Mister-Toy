import { useEffect } from 'react'
import { loadToys } from '../store/actions/toy.action.js'

export function HomePage() {
  useEffect(() => {
    loadToys()
  }, [])
  return (
    <section>
      <img
        src={require(`../assets/img/home/logo-toys.png`)}
        alt="Toys Factory"
      />
      <h2>Welcome</h2>
    </section>
  )
}
