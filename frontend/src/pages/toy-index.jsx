// Libraries
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
// Components
import { Loader } from '../cmps/loader'
import { ToyList } from '../cmps/toy-list'
// Store
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'
import { ADD_TO_CART } from '../store/reducers/toy.reducer'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const shoppingCart = useSelector(
    (storeState) => storeState.toyModule.shoppingCart
  )
  const dispatch = useDispatch()
  useEffect(() => {
    onLoadToys()
  }, [])

  function onLoadToys(filterBy) {
    loadToys(filterBy)
      .then(() => {
        showSuccessMsg('Toys loaded')
      })
      .catch((err) => {
        showErrorMsg('Cannot load toys')
      })
  }

  function onAddRandomToy() {
    const toyToSave = toyService.getRandomToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg('Cannot update toy')
      })
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch((err) => {
        showErrorMsg('Cannot remove Toy')
      })
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.vendor} to Cart`)
    dispatch({ type: ADD_TO_CART, toy })
    showSuccessMsg('Added to Cart')
  }

  return (
    <section className="toy-index-section">
      <h1 className="toy-index-title-main">Toys Page</h1>

      {isLoading && <Loader />}
      {!toys.length && !isLoading && (
        <h2 className="toy-index-title-nothing">No toys to show...</h2>
      )}

      <article className="toy-index-buttons">
        <button onClick={onAddRandomToy}>Add random Toy 🧸</button>
        <Link to={`/toy/edit/`}>Add new Toy</Link>
      </article>

      {!isLoading && (
        <article className="toy-index-toys">
          <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            addToCart={addToCart}
          />
        </article>
      )}
    </section>
  )
}
