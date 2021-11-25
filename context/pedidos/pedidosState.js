import React, { useReducer } from 'react';
import PedidoContext from './pedidosContext';
import PedidoReducer from './pedidosReducer';

// Importar Types para los pedidos
import { SELECCIONAR_PRODUCTO, CONFIRMAR_AGREGAR_PLATILLO, CALCULAR_TOTAL, ELIMINAR_PLATILLO, GUARDAR_ID_ORDEN, RESETEAR_ESTADO } from '../../types';

const PedidoState = ( props ) => {

    const initialState = {
        pedido: [],
        platillo: null,
        totalPagar: 0,
        idOrden: null,
    }

    const [ state, dispatch ] = useReducer( PedidoReducer, initialState );

    // Funcion que agrega el pedido al state
    const agregarPedido = (platillo) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    const platillosSeleccionados = ( platillo ) => {
        dispatch({
            type: CONFIRMAR_AGREGAR_PLATILLO,
            payload: platillo
        })
    }

    const calcularTotalPedido = (subtotal) => {
        dispatch({
            type: CALCULAR_TOTAL,
            payload: subtotal
        })
    }

    const eliminarPlatilloState = (id) => {
        dispatch({
            type: ELIMINAR_PLATILLO,
            payload: id
        })
    }

    // Agregar el Id al context
    const agregarId = (id) => {
        dispatch({
            type: GUARDAR_ID_ORDEN,
            payload: id
        })
    }

    const resetarEstado = () => {
        dispatch({
            type: RESETEAR_ESTADO
        })
    }

    return (  
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,

                platillo: state.platillo,

                totalPagar: state.totalPagar,
                idOrden: state.idOrden,

                // Pass the method to add the product to the state
                agregarPedido,

                platillosSeleccionados,

                calcularTotalPedido,

                eliminarPlatilloState,
                agregarId,
                resetarEstado,
            }}
        >
            { props.children }
        </PedidoContext.Provider>
    );
}
 
export default PedidoState;