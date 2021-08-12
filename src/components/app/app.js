import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import WithRestoService from '../hoc';
import {Route, Switch} from 'react-router-dom';

import Background from './food-bg.jpg';

const App = ({RestoService}) => {
    RestoService.getMenuItems()
        .then(menu => console.log(menu))
        .catch(error => console.log('Menu error'))

    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
            <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/cart' exact component={CartPage} />
            </Switch>
        </div>
    )
}

export default WithRestoService()(App);