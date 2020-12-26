import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import { AdminLogin } from './AdminLogin';
import { Admin } from './Admin';


export const AdminAuth = () => {
    return (
        <div>
            <Switch>
                <Route path="/homepage" component={Admin}/>
                <Route path="/" component={AdminLogin} />
            </Switch>
        </div>
    )
}