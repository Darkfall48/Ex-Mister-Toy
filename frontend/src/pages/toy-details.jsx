// Libraries
import { useEffect, useState } from 'react'
import {
  createRoutesFromChildren,
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
// Services
import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'
import { showErrorMsg } from '../services/event-bus.service'
// Components
import { Loader } from '../cmps/loader'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .get(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        showErrorMsg('Cannot load toy')
        navigate('/toy')
      })
  }

  //* Details Components
  function StockDetail() {
    const { inStock } = toy
    return (
      <p className={inStock ? 'instock yes' : 'instock no'}>
        {inStock ? 'In Stock' : 'Not in Stock'}
      </p>
    )
  }

  function DateDetail() {
    const { createdAt, modifiedAt } = toy
    const createDate = utilService.getDate(createdAt)
    const modifiedDate = modifiedAt ? utilService.getDate(modifiedAt) : null
    return (
      <>
        <p className="">Created at: {createDate}</p>
        {modifiedDate && <p>Modified at: {modifiedDate}</p>}
      </>
    )
  }

  function LabelDetail() {
    const { labels } = toy
    return (
      <p className="categories">
        Categories:{' '}
        {labels.map((label, idx) => (
          <span className="label" key={idx}>
            {label}
          </span>
        ))}
      </p>
    )
  }

  if (!toy) return <Loader />
  return (
    <section className="toy-details-section">
      <p>🧸</p>
      <h1>Toy : {toy.name}</h1>
      <h3>Price: ${toy.price}</h3>
      <StockDetail />
      <DateDetail />
      <LabelDetail />

      <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
      <Link to="/toy">Go Back</Link>
    </section>
  )
}
