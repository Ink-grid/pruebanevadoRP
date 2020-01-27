import React, { useState, useEffect } from 'react';
import useService from '../../services/useService';
import MaterialTable from 'material-table';

const Historial = props => {
  const [data, setRefresh, setData] = useService(
    `http://localhost:3001/api/products/historial/${props.codigo}`
  );

  const entrada = {
    cellStyle: {
      backgroundColor: '#1173CA',
      color: '#FFF'
    },
    headerStyle: {
      backgroundColor: '#1173CA',
      color: '#FFF'
    }
  };

  const saldo = {
    cellStyle: {
      backgroundColor: '#6BCA11',
      color: '#FFF'
    },
    headerStyle: {
      backgroundColor: '#6BCA11',
      color: '#FFF'
    }
  };
  const limpiarstrin = str => {
    let newstring = str.replace(/\(/gi, ' ').replace(/\)/, ' ');
    let newss = newstring.replace(/\)/gi, ' ');
    return newss;
  };

  const [state] = useState({
    columns: [
      { title: 'Fecha', field: 'fecha' },
      {
        title: 'Descripcion',
        field: 'descripcion',
        render: rowData => limpiarstrin(rowData.descripcion)
      },
      { title: 'Valor unitario', field: 'valor_uni' },
      {
        title: 'Entradas (cant.)',
        field: 'entradas.cantidad',
        headerStyle: entrada.headerStyle
      },
      {
        title: 'Entradas (valor)',
        field: 'entradas.valor',
        headerStyle: entrada.headerStyle
      },
      {
        title: 'Salidas (cant.)',
        field: 'salidas.cantidad'
      },
      { title: 'Salidas (valor)', field: 'salidas.valor' },
      {
        title: 'Saldo (cant.)',
        field: 'saldo.cantidad',
        cellStyle: saldo.cellStyle,
        headerStyle: saldo.headerStyle
      },
      {
        title: 'Saldo (valor)',
        field: 'saldo.valor',
        cellStyle: saldo.cellStyle,
        headerStyle: saldo.headerStyle
      },
      { title: 'Almacen', field: 'Almacen' }
    ]
  });

  useEffect(() => {
    setRefresh(props.codigo);
  }, [props.codigo]);

  if (data === null) {
    return <div>cargando ...</div>;
  }

  return (
    <MaterialTable
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => setRefresh(Math.random())
        }
      ]}
      columns={state.columns}
      data={data.data}
      options={{
        exportButton: true
      }}
      title={`Registro del Producto ${props.codigo}`}
    />
  );
};

export default Historial;
