import React, { useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import Client from './views/Clients/';
import Inventario from './views/Inventario/';
import Ventas from './views/Ventas/';
import {
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  SignUp as SignUpView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  const { state } = useContext(StoreContext);

  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to={state.login ? '/inventory' : '/sign-in'}
      />
      <RouteWithLayout
        component={Client}
        exact
        layout={MainLayout}
        path="/clients"
      />
      <RouteWithLayout
        component={Ventas}
        exact
        layout={MainLayout}
        path={state.login ? "/ventas" : "/"}
      />
      <RouteWithLayout
        component={state.login ? Inventario : NotFoundView}
        exact
        layout={state.login && MainLayout}
        path={state.login ? '/inventory' : '/not-found'}
      />
      <RouteWithLayout
        component={state.login ? UserListView : NotFoundView}
        exact
        layout={state.login && MainLayout}
        path={state.login ? '/users' : '/not-found'}
      />
      <RouteWithLayout
        component={state.login ? ProductListView : NotFoundView}
        exact
        layout={state.login && MainLayout}
        path={state.login ? '/products' : '/not-found'}
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={
          state.login && state.user.displayName === 'admin'
            ? SignUpView
            : NotFoundView
        }
        exact
        layout={MainLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={state.login ? Inventario : SignInView}
        exact
        path={state.login ? '/inventory' : '/sign-in'}
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
