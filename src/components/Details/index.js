import React, { Component } from 'react';
import { View, Text, Image, Pressable , StyleSheet } from 'react-native';

import ImagemUberX from '../../assets/imgs/uberx.png'

export default class Details extends Component {
    render() {
        return(
        <View style={styles.container}>
            <Text style={styles.popupar}>Popular</Text>
            <Text>Viagens baratas para o dia a dia</Text>    
            <Image style={styles.imagem} source={ImagemUberX}/>
            <Text style={styles.uber}>UberX</Text>  
            <Text style={styles.valor}>R$ 6,00</Text>  
            <Pressable  
                style={styles.botaoSolicitar}
                onPress={() => {}} 
            >
                <Text style={styles.textoBotaoSolicitar}>SOLICITAR UBERX</Text>    
            </Pressable>
        </View>)
        
    }
}


const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        backgroundColor: "#ffffff",
        height: 270,
        padding: 15,
        flex: 1,
        position: 'absolute',
        bottom: 0,
        alignItems: "center",
        
    },  
    popupar:{
        fontSize: 18,
        color:"#000",
    },
    uber:{
        fontSize: 18,
        color:"#000",
    },
    valor:{
        fontSize: 15,
        color:"#222",
    },
    imagem:{
        marginTop: 10,
        marginBottom: 10  
    },
    botaoSolicitar: {
        width: "100%",
        padding: 12,
        borderRadius: 4,
        backgroundColor: "#222",
        marginTop: 10,
    },
    textoBotaoSolicitar:{
        color: "#fff",
        width:"100%",
        textAlign: 'center'
    }
   
  });