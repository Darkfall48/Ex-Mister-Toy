import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../cmps/loader.jsx'

import { userService } from '../services/user.service.js'

export function UserDetails() {
  // const [user, setUser] = useState(userService.getLoggedinUser())
  const { userId } = useParams()
  const user = userService.getById(userId) || userService.getLoggedinUser()
  console.log('USSEEERRRRR', user)
  if (!user) return <Loader />
  return (
    <section className="user-details">
      <h1>Full Name: {user.fullName}</h1>
    </section>
  )
}
