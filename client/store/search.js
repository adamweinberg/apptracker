import axios from 'axios'

//ACTION TYPES
const GOT_SEARCH = 'GOT_SEARCH'

//ACTION CREATORS
const gotSearch = (search) => {
  return {
    type: GOT_SEARCH,
    search
  }
}

//THUNK
export const getSearch = (searchId) => {
  return async dispatch => {
    const search = await axios.get(`/api/searches/${searchId}`)
    dispatch(gotSearch(search.data))
  }
}

//REDUCER
export default function searchReducer (state=[], action) {
  switch(action.type) {
    case GOT_SEARCH:
      return action.search
    default:
      return state
  }
}
