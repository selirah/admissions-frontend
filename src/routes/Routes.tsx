import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import Login from '../pages/_login'
import Register from '../pages/_register'
import Verification from '../pages/_verification'
import Resend from '../pages/_resend'
import Reset from '../pages/_reset'
import Home from '../pages/_home'
import School from '../pages/_school'
import Programmes from '../pages/_programmes'
import Fees from '../pages/_fees'
import Letter from '../pages/_letter'
import Students from '../pages/_students'
import Transfers from '../pages/_transfers'
import Admin from '../pages/_admin'
import Trainings from '../pages/_trainings'
import Profile from '../pages/_profile'
import Academics from '../pages/_academics'
import { path } from '../helpers/path'

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path.login} component={Login} />
        <Route exact path={path.register} component={Register} />
        <Route exact path={path.verify} component={Verification} />
        <Route exact path={path.resend} component={Resend} />
        <Route exact path={path.reset} component={Reset} />
        <PrivateRoute exact path={path.home} component={Home} />
        <PrivateRoute exact path={path.school} component={School} />
        <PrivateRoute exact path={path.programmes} component={Programmes} />
        <PrivateRoute exact path={path.fees} component={Fees} />
        <PrivateRoute exact path={path.letter} component={Letter} />
        <PrivateRoute exact path={path.students} component={Students} />
        <PrivateRoute exact path={path.transfers} component={Transfers} />
        <PrivateRoute exact path={path.clients} component={Admin} />
        <PrivateRoute exact path={path.trainings} component={Trainings} />
        <PrivateRoute exact path={path.profile} component={Profile} />
        <PrivateRoute exact path={path.academics} component={Academics} />
      </Switch>
    </React.Fragment>
  )
}

export default Routes
