import { useSelector } from 'react-redux'
import { UserMsg } from './user-msg.jsx'

export function AppFooter() {
  const toysCount = useSelector(
    (storeState) => storeState.toyModule.toys.length
  )
  return (
    <footer>
      <h5>Currently {toysCount} toys in the shop</h5>
      <p>Coffeerights to Sidney Sebban</p>
      <UserMsg />
    </footer>
  )
}
