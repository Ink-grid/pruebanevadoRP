import React, { useState } from 'react';
import MaterialTable from 'material-table';
import useServices from '../../services/useService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Clients = () => {
  const [data, config, setData] = useServices(
    'http://localhost:3001/api/clients'
  );

  const [state] = useState({
    columns: [
      { title: 'RUC / DNI', field: 'document' },
      { title: 'Nombre', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Direccion', field: 'direccion' },
      { title: 'Celular', field: 'celular' },
      {
        title: 'Fecha de registro',
        field: 'registro',
        type: 'datetime'
      }
    ]
  });

  const addClient = async client => {
    try {
      const data = await fetch('http://localhost:3001/api/clients', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(client), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (data.ok) {
        const resul = await data.json();
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
          open
          style={{ color: '#fff' }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <MaterialTable
      columns={state.columns}
      data={data.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(async () => {
              resolve();
              //   data.data.push(newData);
              const result = await addClient(newData);
              if (result) {
                setData(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              } else {
                alert('error');
              }
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setData(prevState => {
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
              setData(prevState => {
                console.log(oldData.tableData.id);
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
      title="Listado de Clientes"
    />
  );
};

export default Clients;
