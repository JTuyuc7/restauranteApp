import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import FirebaseContext from '../../context/firebase/firebaseContext';

// Importat el context de Pedidos
import PedidoContext from '../../context/pedidos/pedidosContext';

// Importar el hook
import { useNavigation } from '@react-navigation/native';

// Import styles
import { Center, Image, NativeBaseProvider, } from 'native-base';

const { height, width } = Dimensions.get('screen');

const Menu = () => {

    // Variable para la navegacion
    const navigation = useNavigation();

    // Context de Firebase
    const { menu, obtenerPlatillos } = useContext(FirebaseContext);

    // Context de Pedidos
    const { agregarPedido } = useContext(PedidoContext);

    useEffect(() => {
        obtenerPlatillos();
    },[])

    // Component to show the Items
    const Item = ({item}) => {
        return (
            <>  
                <View style={ styles.contenidoCard}>

                    <View>
                        <Image
                            source={{ uri: item.imagen }}
                            //style={{ height: height * 0.1, width: width * 0.2}}
                            alt="Imagen Pltillo"
                            size="md"
                        />
                    </View>

                    <View style={ styles.cardContainer }>
                        <Text 
                            style={styles.titulo}
                        >{item.nombre}</Text>

                        <Text
                            numberOfLines={2}
                        >{item.descripcion}</Text>

                        <Text
                            style={{ fontWeight: 'bold', marginTop: 5}}
                        >Precio: $
                            <Text>{item.precio.toFixed(2)}</Text>
                        </Text>
                    </View>
                </View>
            </>
        )
    }

    return (  
        <>
            <NativeBaseProvider>
            <SafeAreaView
                style={ styles.container}
            >
                <View
                    style={ styles.contentContainer }
                >
                    <FlatList
                        style={{ marginTop: 20}}
                        data={menu}
                        renderItem={ ({item, index }) => (
                            <TouchableOpacity
                                onPress={ () => {agregarPedido(item); navigation.navigate('detallePlatillo')}}
                            >
                                <Item
                                    item={item}
                                    index={index}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={ item => item.id }
                    />
                </View>
            </SafeAreaView>
            </NativeBaseProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'cornflowerblue'
    },
    contentContainer: {
        paddingHorizontal: 15,
        marginTop: 10
    },
    contenidoCard: {
        //height: height * 0.15,
        //backgroundColor:'yellow',
        marginVertical: 5,
        flexDirection: 'row',
        marginVertical: 15
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    cardContainer: {
        paddingHorizontal: 10
    }
})

export default Menu;