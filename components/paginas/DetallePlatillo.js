import React, { useState, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Extraer el platillo de context
import PedidoContext from '../../context/pedidos/pedidosContext';

const { width, height } = Dimensions.get('screen');

const DetallePlatillo = () => {

    // Hook de navegacion
    const navigation = useNavigation();

    // Crear y extraer el context
    const { platillo } = useContext(PedidoContext);
    const { imagen, nombre, precio, descripcion } = platillo;

    return (  
        <>
            <SafeAreaView
                style={ styles.mainContenedor}
            >
                <ScrollView>
                    <View
                        style={ styles.content}
                    >
                        <Text style={ styles.titulo }>{nombre}</Text>

                        <View>
                            <View>
                                <Image
                                    style={ styles.imageStyle }
                                    source={{ uri: imagen }}
                                />
                            </View>

                            <Text style={ styles.textDescripcion }>{descripcion}</Text>

                            <Text style={ styles.textPrecio}>Precio: $ {precio.toFixed(2)}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={ styles.containerButtonStyles }>
                    <TouchableOpacity
                        onPress={ () => { navigation.navigate('formularioPlatillo')}}
                        style={{ width: "100%", height: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}
                    >
                        <Text style={ styles.buttonStyles}>Ordenar Platillo</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    mainContenedor: {
        flex: 1,
        //paddingHorizontal: 20,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 30
    },
    titulo:{
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    imageStyle: {
        height: 300,
        width: '100%'
    },
    textDescripcion: {
        fontSize: 18,
        marginTop: 15,
    },
    textPrecio: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    containerButtonStyles: {
        backgroundColor: 'yellow',
        bottom: 0,
        position: 'absolute',
        width: width * 1,
        height: height * 0.055,
    },
    buttonStyles: {
        textAlign: 'center',
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold'
    },

});

export default DetallePlatillo;