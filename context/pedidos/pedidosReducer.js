
// Import the types
import { SELECCIONAR_PRODUCTO, CONFIRMAR_AGREGAR_PLATILLO, CALCULAR_TOTAL, ELIMINAR_PLATILLO, GUARDAR_ID_ORDEN, RESETEAR_ESTADO } from '../../types';

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
        case ELIMINAR_PLATILLO:
            return{
                ...state,
                pedido: state.pedido.filter( (articulo) => articulo.id !== action.payload )
            }
        case GUARDAR_ID_ORDEN:
            return{
                ...state,
                idOrden: action.payload
            }
        case RESETEAR_ESTADO:
            return{
                ...state,
                pedido: [],
                platillo: null,
                totalPagar: 0,
                idOrden: null
            }
        default:
            return state;
    }
}