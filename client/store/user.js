import axios from 'axios'

//ACTION TYPES
const GOT_USER = 'GET_USER'

//ACTION CREATORS
const gotUser = (user) => {
  return {
    type: GOT_USER,
    user
  }
}

//THUNK
export const getUser = (userId) => {
  return async dispatch => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const user = await axios.get(`/api/users/${userId}`, {
        headers: {
          authorization: token
        }
      })
      dispatch(gotUser(user.data))
    }
  }
}

//REDUCER
export default function userReducer(state = [], action) {
  switch (action.type) {
    case GOT_USER:
      return action.user
    default:
      return state
  }
}
