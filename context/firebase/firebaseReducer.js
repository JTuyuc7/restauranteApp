
// Importar los types
import { OBTENER_PLATILLOS_EXITO } from '../../types';

export default (state, action) => {
    switch (action.type) {

        case OBTENER_PLATILLOS_EXITO:
            return {
                menu: action.payload
            }

        default:
            return state;
    }
}