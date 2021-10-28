import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddUserForm from './components/AddUserForm'
import Sobre from './components/Sobre'
import UserTable from './components/UserTable'

export default (props) => {
    return (
        <Switch>
            <Route exact path="/">
                <AddUserForm />
            </Route>
        </Switch>
    )
}