import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const applicationStatuses = require('../../script/applicationStatuses')
import { addJob } from '../store/job'
import { getSearch } from '../store/search'


const NewJobForm = (props) => {
  const { setNewJobOpen } = props

  const dispatch = useDispatch()
  const { search } = useSelector(state => state)

  const [jobInfo, setJobInfo] = useState({
    company: '',
    title: '',
    applicationDate: '',
    status: 'applied',
    searchId: search.id
  })
  const jobRef = useRef(jobInfo)

  useEffect(() => {
    jobRef.current = jobInfo
  })

  const handleChange = (event) => {
    setJobInfo({
    ...jobInfo,
    [event.target.name]: event.target.value
    })
  }

  const handleSubmit = () => {
    event.preventDefault()
    dispatch(addJob(jobRef.current))
    setNewJobOpen(false)
    dispatch(getSearch(search.id))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='fcompany'>Company: </label>
      <input type='text' id='fcompany' name='company' onChange={handleChange} />
      <label htmlFor='ftitle'>Job Title: </label>
      <input type='text' id='ftitle' name='title' onChange={handleChange} />
      <label htmlFor='fapplicationdate'>Application Date: </label>
      <input type='date' id='fapplicationdate' name='applicationDate' onChange={handleChange} />
      <label htmlFor='fapplicationstatus'>Application Status: </label>
      <select id='fapplicationstatus' name='status' onChange={handleChange}>
        {applicationStatuses.map((status, index) => (
          <option key={index} value={status}>{status}</option>
        ))}
      </select>
      <input type='submit' value='Submit' />
    </form>
  )
}

export default NewJobForm
