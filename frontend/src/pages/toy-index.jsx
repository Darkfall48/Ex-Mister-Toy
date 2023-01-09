import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/toy-list'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
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

  function onAddToy() {
    const toyToSave = toyService.getRandomCar()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Car added (id: ${savedToy._id})`)
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
    <section>
      <h1>Home Page</h1>
      <ToyList
        toys={toys}
        onRemoveToy={onRemoveToy}
        onEditToy={onEditToy}
        addToCart={addToCart}
      />
      {isLoading && <p>Loading...</p>}
    </section>
  )
}
