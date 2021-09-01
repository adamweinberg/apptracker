import axios from "axios"

//ACTION TPYES
const ADDED_JOB = 'ADDED_JOB'

//ACTION CREATORS
const addedJob = (job) => {
  return {
    type: ADDED_JOB,
    job
  }
}

//THUNK
export const addJob = (job) => {
  return async dispatch => {
    try {
      const {data: newJob} = await axios.post('/api/jobs', job)
      dispatch(addedJob(newJob))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
export default function jobReducer(initialState=[], action) {
  switch (action.type) {
    case ADDED_JOB:
      return action.job
    default:
      return initialState
  }
}
