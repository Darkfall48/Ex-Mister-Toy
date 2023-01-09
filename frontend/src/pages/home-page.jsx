import { useEffect } from 'react'
import { loadToys } from '../store/actions/toy.action.js'

export function HomePage() {
  useEffect(() => {
    loadToys()
  }, [])
  return (
    <section>
      <h2>Welcome</h2>
    </section>
  )
}
