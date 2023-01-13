// Libraries
import { Formik, Form, Field } from 'formik'
// Custom Hooks
import { useForm } from '../hooks/useForm'
// Store
import { store } from '../store/store'

export function ToyFilter() {
  const [filterByToEdit, setFilterByToEdit, handleChange] = useForm(
    store.getState().toyModule.filterBy
  )

  const onSubmit = (values) => {
    console.log('values:', values)
  }

  return (
    <section className="toy-filter">
      <h1>Filter Section</h1>
      <article>
        <Formik
          initialValues={{
            name: '',
          }}
          // validationSchema={SignupSchema}
          onSubmit={handleChange}
        >
          {({ errors, touched }) => (
            <Form className="formik">
              <Field name="name" />
              {errors.name && touched.name ? <span>{errors.name}</span> : null}
              {/* <Field as={CustomTextField} name="lastName" title="BABABA"  />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null} */}
              {/* <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button> */}
            </Form>
          )}
        </Formik>
      </article>
    </section>
  )
}
