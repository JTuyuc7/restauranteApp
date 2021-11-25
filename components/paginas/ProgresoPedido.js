import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PedidoContext from '../../context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';
import Countdown from 'react-countdown';

// Importart Firebase
import firebase from '../../firebase';

const ProgresoPedido = () => {

    const navigation = useNavigation();

    const { idOrden, resetarEstado } = useContext(PedidoContext);

    const [ entrega, guardarEntrega ] = useState(0);
    const [ completado, guardarCompletado ] = useState(false)

    useEffect(() => {
        obtenerTiempoEntrega()
    }, [])

    // Funcion para obtener el tiempo de la entrega
    const obtenerTiempoEntrega = () => {
        firebase.db.collection('ordenes').doc(idOrden).onSnapshot(function (doc) {
            guardarEntrega(doc.data().tiempoEntrega);
            guardarCompletado(doc.data().completado);
        });
    }

    const renderTime = ({minutes, seconds}) => {
        //console.log(minutes, 'Tiempo')
        return(
            <View>
                <Text style={styles.counterDown}>{minutes} : {seconds}</Text>
            </View>
        )
    }

    return (  
        <>
            <SafeAreaView
                style={styles.mainContainer}
            >
                <View
                    style={ styles.contentContainer}
                >
                    { entrega === 0 && (
                        <View>
                            <Text style={styles.textoRecibido}>Tu pedido se ha recibido !!!</Text>
                            <Text style={[styles.textoRecibido, { fontSize: 17, marginTop: 10}]}>Estamos calculando el tiempo de entrega</Text>
                        </View>
                    )}

                    { !completado && entrega > 0 && (
                        <View>
                            <Text style={styles.textoRecibido}>Se entregará en</Text>

                            <View>
                                <Text>
                                    <Countdown
                                        date={ Date.now() + entrega * 60000 }
                                        renderer={ renderTime }
                                    />
                                </Text>
                            </View>
                        </View>
                    )}

                    { completado && (
                        <View>
                            <Text style={styles.textoRecibido}>Listo !!!</Text>

                            <Text style={[styles.textoRecibido, {fontSize: 18, marginTop: 20}]}>Su Orden esta lista </Text>
                        </View>
                    )}
                </View>

                { completado && (
                    <View
                        style={{
                            paddingHorizontal: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={ () => {navigation.navigate('NuevaOrden'); resetarEstado() } }
                            style={{
                                backgroundColor: '#FFDA00',
                                height: 45,
                                borderRadius: 15,
                                marginBottom: 10,
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    textTransform: 'uppercase',
                                    color: "#000",
                                    fontWeight: '900'
                                }}
                            >Nueva Orden</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        //backgroundColor: 'cornflowerblue',
        flex: 1
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginTop: 30,
        flex: 1
    },
    textoRecibido: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    counterDown: {
        fontSize: 60,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        //color: 'red',
        marginLeft: 110
    }
})
export default ProgresoPedido;