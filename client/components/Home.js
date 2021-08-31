import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../store/user'
import Searches from './Searches'
import SearchInfo from './SearchInfo'

export const Home = () => {
  const dispatch = useDispatch()
  const { auth, user } = useSelector(state => state)

  const [form, setForm] = useState(null)

  useEffect(() => {
    dispatch(getUser(auth.id))
  }, [])

  const getForm = () => {
    if (!form) {
      return <Searches setForm={setForm} />
    }
    else {
      let searchId = form
      return <SearchInfo searchId={searchId} />}
  }

  return (
    <div>
      {user ? getForm() : <span>loading</span>}
    </div>
  )
}

export default Home
