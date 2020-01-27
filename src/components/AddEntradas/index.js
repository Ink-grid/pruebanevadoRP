import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearIndeterminate } from '../UtilsModel/';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2)
    }
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  padding: {
    padding: theme.spacing(2, 4, 3)
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      isNumericString
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      prefix="S/. "
      thousandSeparator
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  };
}

const AddEntradas = props => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [progress, setProgress] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format('L')
  );  

  const replaceString = str => {
    let res = str.replace(/S\/\./g, '');
    let nuevo = res.replace(/,/g, '').replace(/ /g, '');
    return nuevo;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
    />;
  }

  const onchange = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const Data = {
      cod_producto: props.codigo,
      fecha: form.get('data'),
      descripcion: form.get('Descripcion'),
      valor_uni: parseInt(replaceString(form.get('valor_uni'))),
      cantidad: parseInt(form.get('cantidad'))
    };
    setProgress(true);
    try {
      const response = await fetch('http://localhost:3001/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      });
      const data = await response.json();
      console.log(data);
      if (data.status) {
        setProgress(false);
        setSeverity('success');
        setOpen(true);
        props.handleClose()
      } else {
        setProgress(false);
        setSeverity('error');
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [values, setValues] = React.useState(0);

  const handleChange = name => event => {
    setValues(event.target.value);
  };

  return (
    <div>
      <Modal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        onClose={props.handleClose}
        open={props.open}
      >
        <div
          className={classes.paper}
          style={modalStyle}
        >
          {progress && <LinearIndeterminate />}
          <Alert severity="info">REGISTRO DE COMPRA — {props.codigo}</Alert>
          <div className={classes.padding}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <form
                autoComplete="off"
                className={classes.root}
                noValidate
                onSubmit={onchange}
              >
                <KeyboardDatePicker
                  disableToolbar
                  format="dd/MM/yyyy"
                  id="date-picker-inline"
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  label="Fecha:"
                  margin="normal"
                  name="data"
                  onChange={handleDateChange}
                  style={{ width: '90%' }}
                  value={selectedDate}
                  variant="inline"
                />

                <TextField
                  id="outlined-basic"
                  label="Descripción"
                  name="Descripcion"
                  required
                  style={{ width: '90%' }}
                />
                <TextField
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                  label="valor unitario"
                  name="valor_uni"
                  onChange={handleChange('numberformat')}
                  required
                  style={{ width: '90%' }}
                  value={values}
                />

                <TextField
                  id="standard-number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  label="Cantidad"
                  name="cantidad"
                  required
                  style={{ width: '90%' }}
                  type="number"
                />
                <div style={{display:"flex", justifyContent: "space-between"}}>
                <Button
                  color="secondary"
                  onClick={props.handleClose}
                  variant="contained"
                >
                  Cancelar
                </Button>
                <button 
                    style={{
                        padding: "1.3em",
                        borderRadius: "0.5em",
                        background: "blue",
                        color: "#ffffff"
                        }}>
                    REGISTRAR
                </button>
                </div>
              </form>
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </Modal>
      <Snackbar
        autoHideDuration={4000}
        onClose={handleClose}
        open={open}
      >
        {severity === 'success' ? (
          <Alert
            onClose={handleClose}
            severity="success"
          >
            se ingreso con exito la compra
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
          >
            ocurrio un error al ingresar la compra
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default AddEntradas;
