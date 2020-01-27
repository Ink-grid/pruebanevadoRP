import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 156
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

function Cart(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image="https://ae01.alicdn.com/kf/HTB1tzVYaODxK1RjSsphq6zHrpXaP/Hombre-invierno-alpinismo-al-aire-libre-esqu-senderismo-caza-termal-zapatos-para-campo-nevado-pesca-caliente.jpg_q50.jpg"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component="h5"
            variant="h5"
          >
            Codido: {props.name}
          </Typography>
          <Typography
            component="h5"
            variant="h5"
          >
            Precio: S/. {props.total}
          </Typography>
          <Typography
            component="h5"
            variant="h5"
          >
            Cantidad: {props.order}
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle1"
          >
            $ {props.total} ({props.order} productos)
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

export default Cart;
