import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store'
import SearchInfo from './components/SearchInfo';

const Routes = () => {
  const dispatch = useDispatch()
  const { id: isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(me())
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
          {/* <Route path='/search-info' component={SearchInfo} /> */}
        </Switch>
      ) : (
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </div>
  )
}

export default Routes
