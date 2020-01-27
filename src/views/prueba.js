import React, { useEffect } from 'react';

const Prueba = () => {
  let baseDeDatos = [
    {
      id: 1,
      nombre: 'Patata',
      precio: 1,
      imagen: 'patata.jpg'
    },
    {
      id: 2,
      nombre: 'Cebolla',
      precio: 1.2,
      imagen: 'cebolla.jpg'
    },
    {
      id: 3,
      nombre: 'Calabacin',
      precio: 2.1,
      imagen: 'calabacin.jpg'
    },
    {
      id: 4,
      nombre: 'Fresas',
      precio: 0.6,
      imagen: 'fresas.jpg'
    }
  ];

  let carrito = [];
  let total = 0;

  useEffect(() => {
    let $items = document.querySelector('#items');
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    for (let info of baseDeDatos) {
      // Estructura
      let miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-sm-4');
      // Body
      let miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
      // Titulo
      let miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info['nombre'];
      // Imagen
      let miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', info['imagen']);
      // Precio
      let miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-text');
      miNodoPrecio.textContent = info['precio'] + '€';
      // Boton
      let miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-primary');
      miNodoBoton.textContent = '+';
      miNodoBoton.setAttribute('marcador', info['id']);
      miNodoBoton.addEventListener('click', anyadirCarrito);
      // Insertamos
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      $items.appendChild(miNodo);
    }

    function anyadirCarrito(codProducto) {
      // Anyadimos el Nodo a nuestro carrito
      carrito.push(codProducto);
      // Calculo el total
      calcularTotal();
      // Renderizamos el carrito
      renderizarCarrito();
    }

    function renderizarCarrito() {
      // Vaciamos todo el html
      //$carrito.textContent = '';
      // Quitamos los duplicados
      let carritoSinDuplicados = [...new Set(carrito)];
      // Generamos los Nodos a partir de carrito
      carritoSinDuplicados.forEach(function(item, indice) {
        // Obtenemos el item que necesitamos de la variable base de datos
        let miItem = data.data.filter(function(itemBaseDatos) {
          return itemBaseDatos['cod_producto'] == item;
        });
        // Cuenta el número de veces que se repite el producto
        let numeroUnidadesItem = carrito.reduce(function(total, itemId) {
          return itemId === item ? (total += 1) : total;
        }, 0);
        // Creamos el nodo del item del carrito
        let miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}€`;
        // Boton de borrar
        let miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.setAttribute('item', item);
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        let $carrito = document.querySelector('#carrito');
        $carrito.appendChild(miNodo);
      });
    }

    function borrarItemCarrito() {
      console.log();
      // Obtenemos el producto ID que hay en el boton pulsado
      let id = this.getAttribute('item');
      // Borramos todos los productos
      carrito = carrito.filter(function(carritoId) {
        return carritoId !== id;
      });
      // volvemos a renderizar
      renderizarCarrito();
      // Calculamos de nuevo el precio
      calcularTotal();
    }

    function calcularTotal() {
      // Limpiamos precio anterior
      total = 0;
      // Recorremos el array del carrito
      for (let item of carrito) {
        // De cada elemento obtenemos su precio
        let miItem = data.data.filter(function(itemBaseDatos) {
          return itemBaseDatos['cod_producto'] == item;
        });
        total = total + miItem[0]['precio_uni'];
      }
      // Renderizamos el precio en el HTML
      let $total = document.querySelector('#total');
      $total.textContent = total;
    }
    // renderItems();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <main
          className="col-sm-8 row"
          id="items"
        />

        <aside className="col-sm-4">
          <h2>Carrito</h2>

          <ul
            className="list-group"
            id="carrito"
          />
          <hr />

          <p className="text-right">
            Total: <span id="total" />
            &euro;
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Prueba;
