import React, {lazy, Suspense, useState, useEffect} from 'react';
import Header from './components/Header';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from './components/Progress';
import {createBrouserHistory} from 'history';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
})

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrouserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
        history.push('/dashboard');
    }
  }, [isSignedIn])

  return (
      <StylesProvider generateClassName={generateClassName}>
          <Router history={history}>
              <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
              <Suspense fallback={<Progress />}>
                  <Switch>
                      <Route path="/auth">
                          <AuthLazy onSignIn={() => {setIsSignedIn(true)}} />
                      </Route>
                      <Route path="/dashboard">
                          {!isSignedIn && <Redirect to='/' />}
                          <DashboardLazy />
                      </Route>
                      <Route path="/" component={MarketingLazy}/>
                  </Switch>
              </Suspense>
          </Router>
      </StylesProvider>
  )
};

export default App;
