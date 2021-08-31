import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearch } from '../store/search'

const SearchInfo = (props) => {
  const { searchId } = props
  const dispatch = useDispatch()
  const { search } = useSelector(state => state)


  useEffect(() => {
    dispatch(getSearch(searchId))
  }, [])

  return (
    <div id='search-container'>
      {search ?
      <div className='single-search-info'>
        <div className='single search-title'>{search.title}</div>
        <div className='single search-start-date'>{search.startDate}</div>
        <div className='single search-status'>{search.status}</div>
      </div>
      : <span>loading</span>
      }
    </div>
  )
}

export default SearchInfo
