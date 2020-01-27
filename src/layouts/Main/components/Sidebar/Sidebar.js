import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import { StoreContext } from '../../../../context/StoreContext';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { state } = useContext(StoreContext);
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const admin = [
    {
      title: 'Inventario',
      href: '/inventory',
      icon: <AssignmentIcon />
    },
    {
      title: 'ventas',
      href: '/ventas',
      icon: <AddShoppingCartIcon />
    },
    { title: 'pedidos', href: '/pedidos', icon: <LocalMallIcon /> },
    {
      title: 'Clientes',
      href: '/clients',
      icon: <PeopleIcon />
    },
    {
      title: 'Compras',
      href: '/compras',
      icon: <ShoppingCartIcon />
    },
    {
      title: 'Entregas',
      href: '/pedidos',
      icon: <MotorcycleIcon />
    },
    {
      title: 'Usuarios',
      href: '/sign-up',
      icon: <AddCircleIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  const tiendas = [
    {
      title: 'Inventario',
      href: '/inventory',
      icon: <AssignmentIcon />
    },
    {
      title: 'ventas',
      href: '/ventas',
      icon: <AddShoppingCartIcon />
    },
    { title: 'pedidos', href: '/pedidos', icon: <LocalMallIcon /> },
    {
      title: 'Clientes',
      href: '/clients',
      icon: <PeopleIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={
            state.user !== null &&
            state.user.displayName === 'admin'
              ? admin
              : state.user.displayName === 'tienda01' ||
                state.user.displayName === 'tienda02'
                ? tiendas
                : []
          }
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
