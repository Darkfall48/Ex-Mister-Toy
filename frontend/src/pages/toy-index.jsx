// Libraries
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
// Components
import { Loader } from '../cmps/loader'
import { ToyList } from '../cmps/toy/toy-list'
import { ToyFilter } from '../cmps/toy/toy-filter'
// Store
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'
import { ADD_TO_CART } from '../store/reducers/toy.reducer'

export function ToyIndex() {
  const { toys, isLoading } = useSelector((storeState) => storeState.toyModule)
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFilterBy = toyService.getFromSearchParams(searchParams)
  // console.log('Search Params', queryFilterBy)

  const dispatch = useDispatch()

  useEffect(() => {
    onLoadToys(queryFilterBy)
  }, [searchParams])

  async function onLoadToys(params) {
    try {
      const loadedToys = await loadToys(params)
      showSuccessMsg('Toys loaded')
    } catch (err) {
      showErrorMsg('Cannot load toys')
      console.log(err)
    }
  }

  function onSetFilter(params) {
    const { filter, sort, page } = params
    if (filter || sort || page) {
      let queryString = ''
      if (filter) queryString += buildQueryString(filter)

      if (sort) queryString += '&' + buildQueryString(sort)

      if (page) queryString += '&' + buildQueryString(page)

      // console.log('Querry String after filtered:', queryString)
      setSearchParams(queryString)
    }
  }

  function buildQueryString(obj) {
    return Object.keys(obj)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
      )
      .join('&')
  }

  function onAddRandomToy() {
    const toyToSave = toyService.getRandomToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy')
        console.log(err)
      })
  }

  async function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = { ...toy, price }
    try {
      const savedToy = await saveToy(toyToSave)
      showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    } catch (err) {
      showErrorMsg('Cannot update toy')
      console.log(err)
    }
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg('Toy removed')
    } catch (err) {
      showErrorMsg('Cannot remove Toy')
      console.log(err)
    }
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.name} to Cart`)
    dispatch({ type: ADD_TO_CART, toy })
    showSuccessMsg('Added to Cart')
  }

  return (
    <section className="toy-index-section">
      <h1 className="toy-index-title-main">Toys Page</h1>

      <ToyFilter filterBy={queryFilterBy} onSetFilter={onSetFilter} />
      {isLoading && <Loader />}
      {!toys.length && !isLoading && (
        <h2 className="toy-index-title-nothing">No toys to show...</h2>
      )}

      {!isLoading && (
        <>
          <article className="toy-index-buttons">
            <button onClick={onAddRandomToy}>Add random Toy ????</button>
            <Link to={`/toy/edit/`}>Add new Toy</Link>
          </article>

          <article className="toy-index-toys">
            <ToyList
              toys={toys}
              onRemoveToy={onRemoveToy}
              onEditToy={onEditToy}
              addToCart={addToCart}
            />
          </article>
        </>
      )}
    </section>
  )
}
