import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchEquipmentPage } from './layouts/SearchEquipmentPage/SearchEquipmentPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CheckoutPage } from './layouts/CheckoutPage/CheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/CheckoutPage/ReviewListPage/ReviewListPage';
import { MyLoansPage } from './layouts/MyLoansPage/MyLoansPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageRentalPage } from './layouts/ManageRentalPage/ManageRentalPage';
import { PaymentPage } from './layouts/PaymentPage/PaymentPage';


const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  }


  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>
            <Route path={'/'} exact>
              <Redirect to={'/home'} />
            </Route>

            <Route path={'/home'} exact>
              <HomePage />
            </Route>

            <Route path={'/search'} exact>
              <SearchEquipmentPage />
            </Route>

            <Route path={'/reviewlist/:itemId'}>
              <ReviewListPage />
            </Route>

            <Route path={'/checkout/:itemId'} exact>
              <CheckoutPage />
            </Route>

            <Route path={'/login'} render={
              () => <LoginWidget config={oktaConfig} />
            } />

            <Route path={'/login/callback'} component={LoginCallback} />

            <SecureRoute path={'/loans'}>
              <MyLoansPage />
            </SecureRoute>

            <SecureRoute path={'/messages'}>
              <MessagesPage />
            </SecureRoute>

            <SecureRoute path={'/admin'}>
              <ManageRentalPage />
            </SecureRoute>

            <SecureRoute path={'/fees'}>
              <PaymentPage />
            </SecureRoute>
          </Switch>
        </div>
        <Footer />

      </Security>
    </div>
  );
}

export default App;
