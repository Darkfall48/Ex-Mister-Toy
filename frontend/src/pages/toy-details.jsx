// Libraries
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// Services
import { toyService } from '../services/toy.service'
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

  function StockDetail() {
    return (
      <p className={toy.inStock ? 'instock-yes' : 'instock-no'}>
        {toy.inStock ? 'In Stock' : 'Not in Stock'}
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
      <p>Date: {toy.createdAt}</p>
      <p>Categories: {toy.labels}</p>

      <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
      <Link to="/toy">Go Back</Link>
    </section>
  )
}
