import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Searches = (props) => {
  const { setForm } = props
  const { user } = useSelector(state => state)

  const openSearch = (searchId) => {
    setForm(searchId)
  }

  return (
    <div id='search-container'>
      {user.id ? <h3>Saved job searches for {user.firstName} {user.lastName}</h3> : <span>loading</span>}
      {user.id ? user.searches.map((search, index) => (
        <button onClick= {() => openSearch(search.id)} key={index}>
          <div className='search-summary'>
            <div className='summary search-title'>{search.title}</div>
            <div className='summary search-start-date'>Start Date: {search.startDate}</div>
            <div className='summary search-status'>Status: {search.status}</div>
          </div>
        </button>
      )) : <span>loading</span>}
    </div>
  )
}

export default Searches
