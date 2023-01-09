import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
  const queryParams = `?vendor=${filterBy.txt}&maxPrice=${filterBy.maxPrice}`
  return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  // return Promise.reject('Not now!')
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    // when switching to backend - remove the next line
    toy.owner = userService.getLoggedinUser()
    return httpService.post(BASE_URL, toy)
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: 0 }
}
function getEmptyToy() {
  return {
    vendor: '',
    price: 0,
  }
}

function getRandomToy() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
