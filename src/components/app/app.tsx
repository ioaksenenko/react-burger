import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage, FeedPage, ProfilePage, 
  LoginPage, RegisterPage, ForgotPasswordPage, 
  ResetPasswordPage, IngredientPage,
  NotFoundPage, OrderPage
} from '../../pages';
import Layout from '../layout/layout';
import ProtectedRoute from '../protected-route/protected-route';
import { ILocationState } from '../../services/types';
import { WS_ORDERS_ALL_URL } from '../../utils/urls';
import { withSocket } from '../hocs';

const App = () => {
  const location = useLocation<ILocationState>();

  const background = location.state?.background;

  const WithSocketOrderPage = withSocket(WS_ORDERS_ALL_URL)(OrderPage);

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <ConstructorPage />
        </Route>
        <Route exact path="/feed">
          <FeedPage />
        </Route>
        <Route exact path="/feed/:id">
          {background ? <FeedPage /> : <WithSocketOrderPage />}
        </Route>
        <ProtectedRoute auth path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/login">
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/register">
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/forgot-password">
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/reset-password">
          <ResetPasswordPage />
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          {background ? <ConstructorPage /> : <IngredientPage />}
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
