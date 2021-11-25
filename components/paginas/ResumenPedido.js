import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Image, Button, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PedidoContext from '../../context/pedidos/pedidosContext';
import firebase from '../../firebase';

const { height, width} = Dimensions.get('screen');

const ResumenPedido = () => {

    //console.log(firebase, 'Opciones')

    // Navigacion si se quiere agregar mas platillos
    const navigation = useNavigation();

    //Extraer el menu seleccionado
    const { pedido, totalPagar, calcularTotalPedido, eliminarPlatilloState, agregarId } = useContext(PedidoContext);

    
    useEffect(() => {
        calcularTotal()
    }, [pedido])

    const calcularTotal = () => {
        let nuevoTotal = 0;

        pedido.map( (item) => {
            nuevoTotal += item.total
        }) 
        calcularTotalPedido(nuevoTotal)
    }

    const progresoPedido = () => {
        Alert.alert(
            'Confirmar',
            'Deseas confirmar tu pedido',
            [
                { text: 'Confirmar', onPress: async () => {
                    // escribir el pedido en firebase 
                    const pedidoObj = {
                        tiempoEntrega: 0,
                        completado: false,
                        total: Number(totalPagar),
                        orden: pedido,
                        creado: Date.now()
                    }

                    //Mandar la data a firebase
                    //console.log(pedidoObj)
                    try {
                        const crearOrden = await firebase.db.collection('ordenes').add( pedidoObj )
                        console.log(crearOrden.id, 'Orden agregada')
                        agregarId(crearOrden.id)
                    } catch (error) {
                        console.log(error, 'Unable to save data')
                    }

                    navigation.navigate('progreso')
                }},
                { text: 'Revisar', style: 'cancel'}
            ]
        )
    }

    const eliminarProducto = (id) => {
        // Alerta para eliminar el platillo
        Alert.alert(
            'Alerta',
            'Deseas eliminar el platillo?',
            [
                {text: 'Cancelar', style: 'cancel'},
                { text: 'Si, eliminar', onPress: () => {
                    eliminarPlatilloState(id)
                }}
            ]
        )
    }

    // Render Items
    const Item = ({data}) => {
        const { imagen, precio, cantidad, nombre, id } = data;

        return (
            <>
                <View style={ styles.listView }>
                    <View>
                        <Image
                            size="md"
                            source={ { uri: imagen }}
                            alt="Imagen Platillo"
                        />
                    </View>
                    <View style={ styles.dataContainer }>
                        <Text style={ styles.textoDetalles}>{cantidad} {nombre}</Text>
                        <Text style={ styles.textoDetalles}>Por {precio.toFixed(2)} la unidad </Text>
                    </View>

                    <View style={{ marginLeft: 10}}>
                        <TouchableOpacity
                            onPress={ () => eliminarProducto(id) }
                        >
                            <Icon
                                size={35}
                                color="black"
                                name="cancel"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }

    return (  
        <>
            <NativeBaseProvider>
                <SafeAreaView
                    style={styles.mainContainer}
                >
                    <View style={ styles.contentContainer }>
                        <Text style={ styles.titulo }> El Resumen de tu Pedido</Text>

                        <View
                            style={{ height: height * 0.70,}}
                        >
                            <FlatList
                                data={pedido}
                                //style={{ height: height * 0.66, backgroundColor: 'green'}}
                                renderItem={ ({ item , index }) => {
                                    
                                    return(
                                        <Item
                                            data={item}
                                        />
                                    )
                                }}
                                keyExtractor={ (item, index) => index }
                            />

                            <View style={{ marginTop: 15, paddingBottom: 15}}>
                                <Text style={[styles.textoDetalles,  {textAlign: 'center',fontWeight: 'bold'}]}>Total a pagar $ {totalPagar}</Text>

                                <TouchableOpacity
                                    onPress={ () => navigation.navigate('menu')}
                                    style={
                                        [styles.buttonConfirm, {backgroundColor: "#000"}]
                                    }
                                >
                                    <Text style={[ styles.textButton, { color: "#FFF"}]}>Agrega algo mas</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>
                    
                </SafeAreaView>
                <View 
                    style={[ styles.contentContainer, { marginBottom: 5}]}
                >
                    <TouchableOpacity
                        style={ styles.buttonConfirm}
                        onPress={ () => progresoPedido() }
                    >
                        <Text style={styles.textButton}>Ordenar Pedido</Text>
                    </TouchableOpacity>
                </View>
            </NativeBaseProvider>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'blue'
    },
    contentContainer:{
        paddingHorizontal: 20,

    },
    titulo:{
        textAlign: 'center',
        fontSize: 22,
        marginTop: 20,
        fontWeight: 'bold'
    },
    listView: {
        //backgroundColor: 'green',
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 15,
        //alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dataContainer: {
        paddingLeft: 10,
        //backgroundColor: 'green',
        width: width * 0.55
    },
    textoDetalles: {
        fontSize: 18,
    },
    buttonConfirm:{
        backgroundColor: '#FFDA00', 
        marginTop: 10, 
        height: 45, 
        justifyContent: 'center', 
        borderRadius: 20
    },
    textButton: { 
        textAlign: 'center', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        fontSize: 18
    }
})
export default ResumenPedido;