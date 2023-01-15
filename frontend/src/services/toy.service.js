import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
  query,
  get,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
  getDefaultSort,
  getDefaultPage,
  getFromSearchParams,
}

function query({
  filter = getDefaultFilter(),
  sort = getDefaultSort(),
  page = getDefaultPage(),
} = {}) {
  console.log('Filter:', filter)
  console.log('Sort:', sort)
  console.log('Page', page)
  // Getting the values
  const { name, maxPrice, inStock, labels } = filter
  const { sortBy, sortValue } = sort
  const { pageSize, pageIdx } = page

  // Preparing the query params string
  const filterParams = `name=${name}&maxPrice=${maxPrice}&inStock=${inStock}&labels=${labels}`
  const sortParams = `sortBy=${sortBy}&sortValue=${sortValue}`
  const pageParams = `pageSize=${pageSize}&pageIdx=${pageIdx}`

  const queryParams = '?' + filterParams + '&' + sortParams + '&' + pageParams

  return httpService.get(BASE_URL + queryParams).then((res) => res)
}

function get(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function getRandomToy() {
  return httpService.post(BASE_URL)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  const { _id: toyId } = toy
  if (toyId) return httpService.put(BASE_URL + toyId, toy)
  return httpService.post(BASE_URL, toy)
}

function getDefaultFilter() {
  return { name: '', maxPrice: '', inStock: '', labels: '' }
}

function getDefaultSort() {
  return { sortBy: '', sortValue: '' }
}

function getDefaultPage() {
  return { pageSize: '', pageIdx: '' }
}

function getEmptyToy() {
  return { name: '', price: '', labels: [], createdAt: null }
}

function getFromSearchParams(searchParams) {
  const filter = { ...getDefaultFilter() }
  const sort = { ...getDefaultSort() }
  const page = { ...getDefaultPage() }

  for (const field in filter) {
    filter[field] = searchParams.get(field) || ''
  }
  for (const field in sort) {
    sort[field] = searchParams.get(field) || ''
  }
  for (const field in page) {
    page[field] = searchParams.get(field) || ''
  }
  return { filter, sort, page }
}
