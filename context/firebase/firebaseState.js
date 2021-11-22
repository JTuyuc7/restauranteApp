import React, { useReducer } from 'react'

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

//Import lodas to group the data
import _ from 'lodash';

// Import Types 
import { OBTENER_PLATILLOS_EXITO } from '../../types';

// Importar firebase
import firebase from '../../firebase';

const FirebaseState = props => {

    const initialState = {
        menu: []
    }

    // useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer( FirebaseReducer, initialState );

    //Methods that will execute to bring the data
    const obtenerPlatillos = () => {
        // Get the info by making the query to the DD
        //let platillos = await firebase.db.collection('productos').where('existencia', '==', true).get()
        //firebase.db.settings({ experimentalForceLongPolling: true });
        firebase.db.collection('productos').where('existencia', '==', true).onSnapshot(manejarSnapshot);

        function manejarSnapshot (snapshot) {
            let platillos = snapshot.docs.map( (doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            // Ordenar los platillos
            platillos = _.sortBy(platillos, 'categoria')
            //console.log(platillos, 'Agrupados?')

            dispatch({
                type: OBTENER_PLATILLOS_EXITO,
                payload: platillos
            });
        }
    }

    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                
                // Methods
                obtenerPlatillos
            }}
        >
            { props.children }
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;