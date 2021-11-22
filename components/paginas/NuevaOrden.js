import React from 'react'
import {  View, Dimensions } from 'react-native';
import { Container, Button, Text, NativeBaseProvider,  } from 'native-base';

//Importar globlal styles
import globalStyles from '../../styles/global';

// importar el hook de navigation
import { useNavigation } from '@react-navigation/native';

const NuevaOrden = () => {

    const navigation = useNavigation();

    return (  
        <NativeBaseProvider
            
        >
            <View
                style={ globalStyles.contenedor }
            >
                <View>
                        <Button
                            style={ globalStyles.boton }
                            borderRadius={15}
                            size={250}
                            height={45}
                            color="yellow.800"
                            marginTop={5}
                            onPress={ () => navigation.navigate('menu') }
                        >
                            <Text
                                style={ globalStyles.botonText}
                                color="#FFF"
                                fontWeight="bold"
                                fontSize={18}
                            >Crea Una Nueva Orden</Text>
                        </Button>
                </View>
            </View>
        </NativeBaseProvider>
    );
}

export default NuevaOrden;

// npm i native-base@2.13.14
// npm install native-base react-native-svg react-native-safe-area-context