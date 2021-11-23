import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './components/paginas/Menu';
import DetallePlatillo from './components/paginas/DetallePlatillo';
import FormularioPlatillo from './components/paginas/FormularioPlatillo';
import NuevaOrden from './components/paginas/NuevaOrden';
import ProgresoPedido from './components/paginas/ProgresoPedido';
import ResumenPedido from './components/paginas/ResumenPedido';
import BotonResumen from './components/UI/BotonResumen';

// Importar state de firebase
import FirebaseState from './context/firebase/firebaseState';

// Importar el State de pedidos
import PedidoState from './context/pedidos/pedidosState';

const Stack = createStackNavigator();

const App = () => {
  return (  
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00'
                },
                headerTitleStyle:{
                  fontWeight: 'bold'
                },
                headerTitleAlign: 'center'
              }}
            >
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{ title: "Nueva Orden"}}
              />

              <Stack.Screen 
                name="menu"
                component={Menu}
                options={{ title: 'Nuestro Menu ',
                  
                  headerRight: (props) => (
                    <BotonResumen props={props} />
                  )
                }}
              />

              <Stack.Screen
                name="detallePlatillo"
                component={ DetallePlatillo }
                options={{ title: "Detalles"}}
              />

              <Stack.Screen
                name="formularioPlatillo"
                component={FormularioPlatillo}
                options={{ title: "Ordenar Platillo"}}
              />

              <Stack.Screen
                name="resumenPlatillo"
                component={ResumenPedido}
                options={{ title: 'Resumen Pedido'}}
              />

              <Stack.Screen
                name="progreso"
                component={ProgresoPedido}
                options={{ title: 'Progreso del Pedido'}}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
}
 
export default App;