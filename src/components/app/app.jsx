import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage, OrderFeedPage, ProfilePage, 
  LoginPage, RegisterPage, ForgotPasswordPage, 
  ResetPasswordPage, IngredientPage,
  NotFoundPage
} from '../../pages';
import Layout from '../layout/layout';
import ProtectedRoute from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <ConstructorPage />
        </Route>
        <Route exact path="/order-feed">
          <OrderFeedPage />
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
          {location.state?.modal ? <ConstructorPage /> : <IngredientPage />}
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
