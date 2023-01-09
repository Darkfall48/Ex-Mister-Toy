// Libraries
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// Services
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// Components
import { Loader } from '../cmps/loader.jsx'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const [isLoading, setLoading] = useState(false)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  }, [])

  function loadToy() {
    setLoading(true)
    toyService
      .get(toyId)
      .then((toy) => {
        setLoading(false)
        setToyToEdit(toy)
      })
      .catch((err) => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    toyToEdit._id
      ? (toyToEdit.modifiedAt = Date.now())
      : (toyToEdit.createdAt = Date.now())
    toyService
      .save(toyToEdit)
      .then((toy) => {
        console.log('toy saved', toy)
        showSuccessMsg('Toy saved!')
        navigate('/toy')
      })
      .catch((err) => {
        console.log('err', err)
        showErrorMsg('Cannot save toy')
      })
  }

  return (
    <section className="toy-edit">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

          <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name..."
              value={toyToEdit.name}
              onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              value={toyToEdit.price}
              onChange={handleChange}
            />

            <div>
              <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
              <Link to="/toy">Cancel</Link>
            </div>
          </form>
        </>
      )}
    </section>
  )
}
