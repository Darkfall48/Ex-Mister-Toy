import { toyService } from '../../services/toy.service'
import { store } from '../store'
import {
  ADD_TOY,
  UPDATE_TOY,
  REMOVE_TOY,
  UNDO_REMOVE_TOY,
  SET_TOYS,
  SET_IS_LOADING,
} from '../reducers/toy.reducer'

//! Not Working !
// export async function loadToys(filterBy) {
//   try {
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//     const filteredToys = await toyService.query(filterBy)
//     const store = store.dispatch({ type: SET_TOYS, filteredToys })
//     return filteredToys
//   } catch (err) {
//     console.log('Had issues loading toys', err)
//     throw err
//   } finally {
//     store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//   }
// }

export function loadToys(filterBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query(filterBy)
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch((err) => {
      console.log('Had issues loading toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export async function removeToy(toyId) {
  try {
    await store.dispatch({ type: REMOVE_TOY, toyId })
    return await toyService.remove(toyId)
  } catch (err) {
    await store.dispatch({ type: UNDO_REMOVE_TOY })
    console.log('Had issues Removing toy', err)
    throw err
  }
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  try {
    const savedToy = await toyService.save(toy)
    await store.dispatch({ type, toy: savedToy })
    return savedToy
  } catch (err) {
    console.error('Cannot save toy:', err)
    throw err
  }
}
