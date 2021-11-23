
// Import the types
import { SELECCIONAR_PRODUCTO, CONFIRMAR_AGREGAR_PLATILLO, CALCULAR_TOTAL } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO:
            return{
                ...state,
                platillo: action.payload
            }
        case CONFIRMAR_AGREGAR_PLATILLO:
            return{
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        case CALCULAR_TOTAL:
            return {
                ...state,
                totalPagar: action.payload
            }
        default:
            return state;
    }
}