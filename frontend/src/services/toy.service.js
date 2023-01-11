import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
  query,
  get,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
  const { name, maxPrice, inStock, labels } = filterBy
  const queryParams = `?name=${name}&maxPrice=${maxPrice}&inStock=${inStock}&labels=${labels}`
  return httpService.get(BASE_URL + queryParams).then((res) => res.toys)
}

function get(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function getRandomToy() {
  return httpService.post(BASE_URL)
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
    // toy.owner = userService.getLoggedinUser()
    return httpService.post(BASE_URL, toy)
  }
}

function getDefaultFilter() {
  return { name: '', maxPrice: '', inStock: '', labels: '', pageIdx: '' }
}
function getEmptyToy() {
  return { name: '', price: '', labels: [], createdAt: null }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
