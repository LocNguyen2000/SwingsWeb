import React, { useEffect, useState } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { Home } from './screens/home/Home';
import { AuthUserCtx } from "./context/authUser"
import { AdminAuth } from './screens/admin/AdminAuth';
import { AuthAdminCtx } from './context/authAdmin';


Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

function App() {
  useEffect(() => {
    Storage.prototype.setObj = function (key, obj) {
      return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function (key) {
      return JSON.parse(this.getItem(key))
    }
  }, [])
  const [authUser, setAuthUser] = useState(null);

  const authUserCtxValue = {
    authUser: authUser,
    setAuthUser: setAuthUser,
  };

  const [authAdmin, setAuthAdmin] = useState(null);
  const authAdminCtxValue = {
    authAdmin: authAdmin,
    setAuthAdmin: setAuthAdmin,
  };

  return (
    <div>
      <Switch>
        <Route path="/">
          <AuthUserCtx.Provider value={authUserCtxValue}>
            <Home />
          </AuthUserCtx.Provider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
