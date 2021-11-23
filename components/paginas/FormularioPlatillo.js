import React, { useContext, useState, useEffect} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { FormControl, Input, SimpleGrid, VStack, NativeBaseProvider, HStack, Button  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import PedidoContext from '../../context/pedidos/pedidosContext';

const { width, height } = Dimensions.get('screen');

const FormularioPlatillo = () => {

    // Navegar despues de agregar el pedido
    const navigation = useNavigation();

    // State para cantidad
    const [ cantidad, setCantidad ] = useState(1);
    const [ total, setTotal ] = useState(0)

    const { platillo, platillosSeleccionados } = useContext(PedidoContext);
    const { id, categoria, nombre, imagen, descripcion, existencia, precio } = platillo;
    //console.log(parseInt(precio), 'desde formulario')

    useEffect(() => {
        calcularTotal()
    }, [cantidad])

    const calcularTotal = () => {
        let total = parseInt(precio) * cantidad;
        setTotal(total);
    }

    const confirmarOrden = () => {
        Alert.alert(
            'Confirmacion',
            `Deseas Agregar ${cantidad} ${nombre} por ${total}`,
            [
                { 
                    text: 'Confirmar',
                    onPress: () => {
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }
                        // Agregar el pedido al state
                        platillosSeleccionados(pedido)

                        // Navegar al resumen
                        navigation.navigate('resumenPlatillo')
                    }
                },
                { 
                    text: 'Cancelar', 
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <>
            <NativeBaseProvider>
                <SafeAreaView
                    style={ styles.mainContainer}
                >
                    <View style={ styles.contentContainer }>
                        <FormControl>
                            <Text style={ styles.tiulo }>Cantidad</Text>

                            <VStack flexDirection="row" justifyContent="space-between">
                                <HStack>
                                    <View>
                                        <Button
                                            backgroundColor='black'
                                            width={100}
                                            borderRadius={10}
                                            onPress={ () => setCantidad(cantidad - 1 )}
                                            isDisabled={ cantidad <= 1 ? true : false}
                                        >
                                            <Icon
                                                name="minus"
                                                size={30}
                                                color="white"
                                            />
                                        </Button>
                                    </View>
                                </HStack>
                                <HStack>
                                    <View style={ styles.cantidadSeleccionada }>
                                        <Input
                                            style={ styles.cantidadSeleccionada}
                                            value={cantidad.toString()}
                                            keyboardType="numeric"
                                            onChangeText={ (cantidad) => setCantidad(cantidad)}
                                        />
                                    </View>
                                </HStack>
                                <HStack>
                                    <View>
                                        <Button
                                            backgroundColor='black'
                                            width={100}
                                            borderRadius={10}
                                            onPress={ () => setCantidad( cantidad + 1)}
                                        >
                                            <Icon
                                                name="plus"
                                                size={30}
                                                color="white"
                                            />
                                        </Button>
                                    </View>
                                </HStack>
                            </VStack>
                        </FormControl>

                        <View style={ styles.contenedorCantidad}>
                            <Text style={styles.textoCantidad}>Total a Pagar</Text>
                            <Text style={styles.textoTotal}>$ {total}</Text>
                        </View>
                    </View>

                    <View style={ styles.footer}>
                        <TouchableOpacity 
                            style={styles.bottonFooter}
                            onPress={ () => confirmarOrden() }
                        >
                            <Text style={styles.textoButton}>Agregar al Pedido</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </NativeBaseProvider>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'yellow'
    },
    contentContainer: {
        paddingHorizontal: 20,
        marginTop: 30
    },
    tiulo: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30
    },
    cantidadSeleccionada: {
        //backgroundColor: 'green',
        width: width * 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    textoCantidad: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 23,
    },
    contenedorCantidad: {
        //backgroundColor: 'yellow',
        marginTop: 50
    },
    textoTotal: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    footer: {
        position: 'absolute',
        //backgroundColor: 'green',
        bottom: 1,
        width: '100%',
        height: height * 0.06,
        paddingHorizontal: 20,
    },
    bottonFooter: {
        backgroundColor: '#FFDA00',
        height: '100%',
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    textoButton: {
        color: "#000",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        textTransform: 'uppercase'
    }
})

export default FormularioPlatillo;