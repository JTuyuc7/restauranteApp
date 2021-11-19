import React, { useReducer } from 'react'

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

// Importar firebase
import firebase from '../../firebase'

const FirebaseState = props => {

    const initialState = {
        menu: []
    }

    // useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer( FirebaseReducer, initialState )

    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase
                
            }}
        >
            { props.children }
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;