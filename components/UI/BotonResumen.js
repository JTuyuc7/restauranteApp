import React, { useContext } from 'react'
import { Button, Text, NativeBaseProvider} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import PedidoContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () => {
    const navigation = useNavigation();

    const { pedido } = useContext(PedidoContext);
    return (  
        <NativeBaseProvider>
            { pedido.length === 0 ? null : (
                <Button 
                    marginTop={3}
                    onPress={ () => navigation.navigate('resumenPlatillo')}
                >
                    <Text color="#FFF">Resumen</Text>
                </Button>
            )}
        </NativeBaseProvider>
    );
}

export default BotonResumen;