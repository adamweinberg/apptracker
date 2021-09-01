import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearch } from '../store/search'
import NewJobForm from './NewJobForm';
import { Popover } from '@material-ui/core';

const SearchInfo = (props) => {
  const { searchId } = props
  const dispatch = useDispatch()
  const { search } = useSelector(state => state)

  const [newJobOpen, setNewJobOpen] = useState(false)

  useEffect(() => {
    dispatch(getSearch(searchId))
  }, [])

  const openNewJobModal = () => {
    setNewJobOpen(true)
  }

  return (
    <div id='search-container'>
      {search.jobs ?
      <div className='single-search-info'>
        <div className='single search-title'>{search.title}</div>
        <div className='single search-start-date'>{search.startDate}</div>
        <div className='single search-status'>{search.status}</div>
        <table className='job-table'>
          <tbody>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Application Date</th>
            <th>Application Status</th>
          </tr>
          {search.jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.company}</td>
              <td>{job.title}</td>
              <td>{job.applicationDate}</td>
              <td>{job.status}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      : <span>loading</span>
      }
      <button onClick={openNewJobModal}>Add Job to Search</button>
      <Popover open={newJobOpen} onClose={() => setNewJobOpen(false)} anchorEl={document.getElementById('search-container')} anchorOrigin={{vertical: 'center', horizontal: 'center'}}style={{height:'200px', width:'200px'}}>
        <NewJobForm />
      </Popover>
    </div>
  )
}

export default SearchInfo
