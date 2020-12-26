import React, { useState } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { AuthAdminCtx } from './context/authAdmin';
import { AdminAuth } from './screens/AdminAuth';

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

function App() {
  const [authAdmin, setAuthAdmin] = useState(null);
  const authAdminCtxValue = {
    authAdmin: authAdmin,
    setAuthAdmin: setAuthAdmin,
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <AuthAdminCtx.Provider value={authAdminCtxValue}>
            <AdminAuth />
          </AuthAdminCtx.Provider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
