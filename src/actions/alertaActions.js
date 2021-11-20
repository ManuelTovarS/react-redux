import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../components/types";

//Muestra una alerta
export function mostrarAlertaAction(alerta) {
    return (dispatch) => {
        dispatch(crearAlertaError(alerta));

    } 
}
const crearAlertaError = (alerta) => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});

//Oculta la alerta 
export function ocultarAlertaAction() {
    return (dispatch) => {
        dispatch(ocultarAlerta());
    }
}

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
});