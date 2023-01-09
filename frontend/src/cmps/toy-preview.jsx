import { NavLink } from 'react-router-dom'

export function ToyPreview({ toy }) {
  return (
    <article>
      <h1>🧸</h1>
      <h2>{toy.name}</h2>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
      <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
    </article>
  )
}
