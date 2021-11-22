import React, { useReducer } from 'react';
import PedidoContext from './pedidosContext';
import PedidoReducer from './pedidosReducer';

// Importar Types para los pedidos
import { SELECCIONAR_PRODUCTO } from '../../types';

const PedidoState = ( props ) => {

    const initialState = {
        pedido: [],
        platillo: null
    }

    const [ state, dispatch ] = useReducer( PedidoReducer, initialState );

    // Funcion que agrega el pedido al state
    const agregarPedido = (platillo) => {

        console.log(platillo, 'Platillo seleccionado')

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    return (  
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,

                platillo: state.platillo,
                // Pass the method to add the product to the state
                agregarPedido,

            }}
        >
            { props.children }
        </PedidoContext.Provider>
    );
}
 
export default PedidoState;