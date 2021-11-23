import React, { useReducer } from 'react';
import PedidoContext from './pedidosContext';
import PedidoReducer from './pedidosReducer';

// Importar Types para los pedidos
import { SELECCIONAR_PRODUCTO, CONFIRMAR_AGREGAR_PLATILLO, CALCULAR_TOTAL } from '../../types';

const PedidoState = ( props ) => {

    const initialState = {
        pedido: [],
        platillo: null,
        totalPagar: 0
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

    return (  
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,

                platillo: state.platillo,

                totalPagar: state.totalPagar,
                // Pass the method to add the product to the state
                agregarPedido,

                platillosSeleccionados,

                calcularTotalPedido,
            }}
        >
            { props.children }
        </PedidoContext.Provider>
    );
}
 
export default PedidoState;