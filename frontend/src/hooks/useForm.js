import { useState } from 'react'

export const useForm = (initialState) => {
  const [fields, setFields] = useState(initialState)

  function handleChange({ target }) {
    console.log('Target Form:', target)
    let { value, name: field, type, checked } = target

    switch (type) {
      case 'number':
      case 'range':
        value = !value ? '' : +value
        break
      case 'checkbox':
        value = checked
      default:
        break
    }

    setFields((prevFields) => ({ ...prevFields, [field]: value }))
  }

  return [fields, setFields, handleChange]
}
