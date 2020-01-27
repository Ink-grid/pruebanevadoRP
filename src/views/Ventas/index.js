import React, { useState } from 'react';
import MaterialTable from 'material-table';
import useService from '../../services/useService';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Backdrop from '@material-ui/core/Backdrop';
import CartList from '../../components/ProductList/index';
import CircularProgress from '@material-ui/core/CircularProgress';
const Ventas = props => {
  const [data, setRefresh, setData] = useService(
    'http://localhost:3001/api/products/ventas/list'
  );

  console.log(data);
  const [state] = useState({
    columns: [
      {
        title: 'Codigo Producto',
        field: 'cod_producto',
        editable: 'never'
      },
      {
        title: 'Tipo de producto',
        field: 'tipo_producto',
        editable: 'never'
      },
      { title: 'Categoria', field: 'categoria', editable: 'never' },
      { title: 'Modelo', field: 'modelo', editable: 'never' },
      { title: 'Color', field: 'color', editable: 'never' },

      { title: 'Talla', field: 'talla', type: 'numeric', editable: 'never' },
      { title: 'stock', field: 'stock', type: 'numeric', editable: 'never' },
      {
        title: 'Cantidad',
        field: 'cantidad',
        type: 'numeric'
      },
      {
        title: 'Precio',
        field: 'precio_uni',
        render: rowData => `S/. ${rowData.precio_uni}`
      }
    ]
  });

  // handlerClearCart() {
  // 	this.setState({
  // 		cart: [],
  // 		sum: 0,
  // 		total: 0
  // 	});
  // }

  const handlerClearCart = () => {
    setData(prevState => ({
      ...prevState,
      cart: [],
      suma: 0,
      total: 0
    }));
  };

  const sumProducts = array => {
    let total = 0;
    array.forEach(product => (total += product.order));
    setData(prevState => ({ ...prevState, total: total }));
  };

  const sumTotal = array => {
    var sum = 0;
    array.forEach(product => (sum += product.total));
    setData(prevState => ({ ...prevState, suma: sum }));
  };

  const handlerAddProduct = (indexCart, indexProduct) => {
    var statusCopy = Object.assign({}, data);
    let stock_status =
      statusCopy.data[indexProduct].stock -
      parseInt(statusCopy.data[indexProduct].cantidad);
    if (parseInt(stock_status) < 0) {
      alert('producto agotado o stock insuficiente');
      return;
    }

    statusCopy.cart[indexCart].total += statusCopy.cart[indexCart].price;
    statusCopy.cart[indexCart].order += parseInt(
      statusCopy.data[indexProduct].cantidad
    );
    statusCopy.data[indexProduct].stock -= parseInt(
      statusCopy.data[indexProduct].cantidad
    );
    setData(statusCopy);
    sumProducts(statusCopy.cart);
    sumTotal(statusCopy.cart);
  };

  const handleSaveProduct = productId => {
    let product = data.data.find(p => p.cod_producto === productId);

    let indexProduct = data.data.findIndex(
      x => x.cod_producto === product.cod_producto
    );

    var productCart = {
      id: product.cod_producto,
      name: product.cod_producto,
      img: product.picture,
      price: product.precio_uni,
      order: parseInt(product.cantidad),
      total: product.precio_uni
    };

    var exist = data.cart.find(p => p.id === productId);

    if (undefined !== exist && exist !== null) {
      let indexCart = data.cart.findIndex(x => x.id === exist.id);
      //console.log(indexCart)
      handlerAddProduct(indexCart, indexProduct);
    } else {
      var statusCopy = Object.assign({}, data);
      statusCopy.data[indexProduct].stock -= parseInt(
        statusCopy.data[indexProduct].cantidad
      );

      sumProducts(statusCopy.cart);
      sumTotal(statusCopy.cart);
      setData(prevState => ({
        ...prevState,
        total: parseInt(statusCopy.data[indexProduct].cantidad),
        cart: statusCopy.cart.concat([productCart])
      }));
    }
  };

  const handlerOpenOrder = event => {
    event.preventDefault();
    setData(prevState => ({ ...prevState, openOrder: true }));
    //this.setState({ openOrder: true });
  };

  if (data === null) {
    return (
      <div style={{ height: '100%' }}>
        <Backdrop
          open
          style={{ color: '#fff', textAlign: 'center' }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <div>
      <MaterialTable
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => setRefresh(Math.random())
          },
          {
            icon: () => <AddShoppingCartIcon />,
            tooltip: 'agregar producto',
            onClick: (event, rowData) => {
              handleSaveProduct(rowData.cod_producto);
            }
          }
        ]}
        columns={state.columns}
        data={data.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  if (oldData) {
                    if (newData.cantidad > oldData.stock) {
                      alert('excede el limite del stock');
                    } else {
                      setData(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }
                }
                resolve();
              }, 1000);
            })
        }}
        options={{
          exportButton: true
        }}
        title="Listado de productos"
      />
      <CartList
        items={data.cart}
        onOpenOrder={handlerOpenOrder}
        total={data.total}
      />
      <div>
        <div>cantidad a pagar</div>
        <div>total: {data.suma} </div>
        <button>pagar</button>
      </div>
    </div>
  );
};

export default Ventas;
