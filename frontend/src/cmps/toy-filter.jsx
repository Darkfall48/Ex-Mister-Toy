// Libraries
import { useEffect, useRef } from 'react'
import { Formik, Form, Field } from 'formik'
// Services
import { utilService } from '../services/util.service'
// Custom Hooks
import { useForm } from '../hooks/useForm'
// Store
import { store } from '../store/store'

export function ToyFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit, handleFilterChange] = useForm(
    filterBy.filter
  )
  const [sortByToEdit, setSortByToEdit, handleSortChange] = useForm(
    filterBy.sort
  )
  const [pageByToEdit, setPageByToEdit, handlePageChange] = useForm(
    filterBy.page
  )

  console.log('Filter to Edit', filterByToEdit)
  console.log('Sort to Edit', sortByToEdit)
  console.log('Page to Edit', pageByToEdit)

  useEffect(() => {
    onSetFilter({
      filter: filterByToEdit,
      sort: sortByToEdit,
      page: pageByToEdit,
    })
  }, [filterByToEdit, pageByToEdit, sortByToEdit])

  // const onSubmit = (values) => {
  //   console.log('valuessss:', values)
  // }

  return (
    <section className="toy-filter">
      <h1>Filter Section</h1>
      <article>
        <form>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="By name"
            value={filterByToEdit.name}
            onChange={handleFilterChange}
          />

          <label htmlFor="maxPrice">Max price:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="By max price"
            value={!filterByToEdit.maxPrice ? '' : filterByToEdit.maxPrice}
            onChange={handleFilterChange}
          />

          <label htmlFor="sortBy">Sort by:</label>
          <input
            type="text"
            id="sortBy"
            name="sortBy"
            placeholder="Sort by"
            value={sortByToEdit.sortBy}
            onChange={handleSortChange}
          />

          <label htmlFor="sortValue">Sort value:</label>
          <input
            type="text"
            id="sortValue"
            name="sortValue"
            placeholder="Sort value (true/nothing)"
            value={sortByToEdit.sortValue ? sortByToEdit.sortValue : ''}
            onChange={handleSortChange}
          />

          <label htmlFor="pageSize">Page Size:</label>
          <input
            type="number"
            id="pageSize"
            name="pageSize"
            placeholder="By page Size"
            value={!pageByToEdit.pageSize ? '' : pageByToEdit.pageSize}
            onChange={handlePageChange}
          />

          <label htmlFor="pageIdx">Page Idx:</label>
          <input
            type="number"
            id="pageIdx"
            name="pageIdx"
            placeholder="By page Idx"
            value={!pageByToEdit.pageIdx ? '' : pageByToEdit.pageIdx}
            onChange={handlePageChange}
          />
        </form>
      </article>
    </section>
  )
}
