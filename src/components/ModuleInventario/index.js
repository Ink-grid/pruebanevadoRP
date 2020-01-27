import React, { useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import AddEntradas from '../AddEntradas/';
import useService from '../../services/useService';
import Historial from '../Historial/';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Alert(props) {
  return <MuiAlert
    elevation={6}
    variant="filled"
    {...props}
         />;
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ModuleInventario = props => {
  const [data, setRefresh, setData] = useService(
    `http://localhost:3001/api/products/${props.codigo}`
  );
  const classes = useStyles();

  useEffect(() => {
    setRefresh(props.codigo);
  }, [props.codigo]);

  if (data === null) {
    return <div>cargando</div>;
  }
  if (data.cantidad === 0) {
    return (
      <div className={classes.root}>
        <Alert severity="info">
          No se registro ninguna compra para el producto {props.codigo} !.
        </Alert>
      </div>
    );
  }

  if (data.cantidad <= 100) {
    return (
      <div className={classes.root}>
        <Alert severity="error">
          stock agotado!, por favor realice una nueva compra el producto{' '}
          {props.codigo}
        </Alert>
      </div>
    );
  }

  if (data.cantidad > 100 && data.cantidad <= 400) {
    return (
      <div className={classes.root}>
        <Alert severity="warning">
          el stock se esta agotando!, por favor realice un nueva compra para el
          producto {props.codigo}
        </Alert>
      </div>
    );
  }

  if (data.cantidad > 400) {
    return (
      <div className={classes.root}>
        <Alert severity="success">stock full!</Alert>
      </div>
    );
  }
};

// export default ModuleInventario;

function FloatingActionButtons(props) {
  const classes = useStyles();
  const [entradas, setEntradas] = React.useState(false);
  const [kardex, setKardex] = React.useState(false)

  const showEntradas = () => {
    setEntradas(!entradas);
  };

  const showKardex = () => {
    setKardex(!kardex)
  }

  return (
    <div
      className={classes.root}
      style={{ textAlign: 'center' }}
    >
      <Fab
        onClick={() => showEntradas()}
        variant="extended"
      >
        <AddIcon className={classes.extendedIcon} />
        Registrar compra
      </Fab>
      <Fab variant="extended">
        <AddIcon className={classes.extendedIcon} />
        Registrar deveolución
      </Fab>
      <Fab variant="extended" onClick={showKardex}>
        <AddIcon className={classes.extendedIcon} />
        Mostrar cardex
      </Fab>
      <AddEntradas
        codigo={props.codigo}
        handleClose={showEntradas}
        open={entradas}
      />
      {kardex && 
      <Historial  codigo={props.codigo}/>
      }
    </div>
  );
}

export { ModuleInventario, FloatingActionButtons };
