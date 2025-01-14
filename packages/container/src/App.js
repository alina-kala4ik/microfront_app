import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from './components/Progress';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
})

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const App = () => {
  return (
      <StylesProvider generateClassName={generateClassName}>
          <BrowserRouter>
              <Header />
              <Suspense fallback={<Progress />}>
                  <Switch>
                      <Route path="/auth" component={AuthLazy} />
                      <Route path="/" component={MarketingLazy} />
                  </Switch>
              </Suspense>
          </BrowserRouter>
      </StylesProvider>
  )
};

export default App;
