import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Redux actions
import { editarProductoAction } from '../actions/productoActions';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions'

const EditarProducto = () => {
  //Producto a editar
  const productoeditar = useSelector((state) => state.productos.productoeditar);
  const alerta = useSelector((state) => state.alerta.alerta);

  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
  });

  //Llenar el state, automaticamente
  useEffect(() => {
    //Nuevo state de producto
    if (productoeditar) {
    guardarProducto(productoeditar);
    }
  }, [productoeditar]);

  //Extraccion del producto a editar
  const { nombre, precio } = producto;

  //Leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  //Dispatch
  const dispatch = useDispatch();

  //Redireccion
  const navigate = useNavigate();

  //Cuando se envienlos datos a editar
  const submitEditarProducto = (e) => {
    e.preventDefault();

    //Validar 
    if (nombre.trim() === '' || precio.trim() === '') {
      const alerta = {
        msg: "Los campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3"
      };
      dispatch(mostrarAlertaAction(alerta));
      return;
    }
    dispatch(ocultarAlertaAction());
    dispatch(editarProductoAction(producto));
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar producto
            </h2>

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p>: null}
            
            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto "
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
                <div className="form-group">
                  <label>Precio Producto</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Precio Producto "
                    name="precio"
                    value={precio}
                    onChange={onChangeFormulario}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
