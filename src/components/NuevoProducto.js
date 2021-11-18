import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = ({ navigation }) => {
  const navigate = useNavigate();
  

  //State del componente
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);


  //Utilizar useDispatch y te crea una función
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);


  //Mandar a llamar el action de productoAction mediante el useDispatch
  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

  //Cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //Validar formulario
    if (nombre.trim() === '' || precio <= 0) {
      return;
    }

    //Si no hay errores

    //Crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    //Redireccionamiento 
    navigate('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>

            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto "
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
                <div className="form-group">
                  <label>Precio Producto</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Precio Producto "
                    name="precio"
                    value={precio}
                    onChange={(e) => guardarPrecio(Number(e.target.value))}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  Agregar
                </button>
              </div>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? <p className="alert alert-danger p2 mt-2 text-center">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
