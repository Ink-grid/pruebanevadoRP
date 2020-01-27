import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  ModuleInventario,
  FloatingActionButtons
} from '../../components/ModuleInventario/';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useService from '../../services/useService';



const Inventario = () => {
 
  const [data, setRefresh, setData] = useService(
    'http://localhost:3001/api/products'
  );

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [cod_prodcu, setCodigo] = useState(null);
  const [entrada, setEntrada] = useState(false);
  const [state, setState] = useState({
    columns: [
      {
        title: 'Codigo Producto',
        field: 'cod_producto',
        initialEditValue: 'codigo'
      },
      { title: 'Marca', field: 'marca', initialEditValue: 'NEVADO' },
      {
        title: 'Tipo de producto',
        field: 'tipo_producto',
        initialEditValue: 'ZAPATO CUERO'
      },
      { title: 'Categoria', field: 'categoria', initialEditValue: 'BOTIN' },
      { title: 'Modelo', field: 'modelo', initialEditValue: 'VARON_ADULTO' },
      { title: 'Color', field: 'color' },
      { title: 'Planta', field: 'planta', initialEditValue: 'CAT' },
      { title: 'Talla', field: 'talla', type: 'numeric' },
      { title: 'Procedencia', field: 'procedencia', initialEditValue: 'LIMA' },
      { title: 'Fabricante', field: 'fabricante', initialEditValue: 'VICTOR' },
      {
        title: 'RUC proveedor',
        field: 'RUC_proveedor',
        initialEditValue: '20601646391'
      },
      { title: 'Min', field: 'min', type: 'numeric', initialEditValue: 100 },
      { title: 'Max', field: 'max', type: 'numeric', initialEditValue: 500 }
    ]
  });

  const activeEntrada = cod => {
    setCodigo(cod);
    setEntrada(true);
  };

  function Alert(props) {
    return <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
    />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const addProducto = async product => {
    try {
      const data = await fetch('http://localhost:3001/api/products', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(product), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (data.ok) {
        const resul = await data.json();
        console.log(resul);
        if (resul.status === true) {
          return true;
        }
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data === null) {
    return (
      <div style={{ height: '100%' }}>
        <Backdrop
          style={{color: "#fff", justifyContent: "center" }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <div>
      {entrada && (
        <div>
          <ModuleInventario codigo={cod_prodcu} />
          <FloatingActionButtons codigo={cod_prodcu} />
        </div>
      )}
      <MaterialTable
        columns={state.columns}
        data={data.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              // console.log(newData);
              setTimeout(async () => {
                resolve();
                const result = await addProducto(newData);
                if (result) {
                  setOpen(true);
                  setData(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                } else {
                  setSeverity('error');
                  setOpen(true);
                  // alert('error');
                }
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  console.log(oldData.tableData.id);
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
        localization={{
          pagination: {
            labelRowsSelect: 'filas'
          }
        }}
        onRowClick={(e, rowData) => {
          console.log(rowData.cod_producto);
          activeEntrada(rowData.cod_producto);
        }}
        options={{
          exportButton: true
        }}
        title="Listado de productos"
      />
      <Snackbar
        autoHideDuration={6000}
        onClose={handleClose}
        open={open}
      >
        {severity === 'success' ? (
          <Alert
            onClose={handleClose}
            severity="success"
          >
            se ingreso con exito el producto
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
          >
            ocurrio un error al ingresar el producto
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default Inventario;
