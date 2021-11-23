import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Image, Button, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import PedidoContext from '../../context/pedidos/pedidosContext';

const { height, width} = Dimensions.get('screen');

const ResumenPedido = () => {

    // Navigacion si se quiere agregar mas platillos
    const navigation = useNavigation();

    //Extraer el menu seleccionado
    const { pedido, totalPagar, calcularTotalPedido } = useContext(PedidoContext);

    
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

    // Render Items
    const Item = ({data}) => {
        const { imagen, precio, cantidad, nombre, } = data;

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
                        onPress={ () => navigation.navigate('progreso')}
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
        paddingLeft: 10
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