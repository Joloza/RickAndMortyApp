import React, {useState} from 'react';
import colorApp from '../../res/colorApp';
import noImage from '../../assets/noImage.png';
import { 
    Modal, 
    Pressable, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions
} from 'react-native';

const DetailsCharacter=({imageCharacter,name,status,species,gender,origin})=>{

    const [isPressDetails, setIsPressDetails] = useState(false);
    const [isPressModalExitButton, setIsPressModalExitButton] = useState(false);
    const [isModalVisible,setIsModalVisible] = useState(false);

    return(

        <View style={styles.container}>
            <View style={styles.containerButtonModal}>
                <Pressable
                    style={styles.detailsButton}
                    onPress={()=>{
                        setIsModalVisible(true);
                        setIsPressModalExitButton(false);
                    }}                
                    onPressIn={()=>setIsPressDetails(true)}
                    onPressOut={()=>setIsPressDetails(false)}
                        
                >                
                    <Text 
                        style={[styles.textButtonModal,{color: isPressDetails? colorApp.blackPearl : colorApp.white}]}>Ver detalles</Text>
                </Pressable>             
                
            </View>

            <View style={styles.containerModal}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={isModalVisible}
                >
                                    
                    <View style={styles.containerItemsModal}>
                        <ScrollView> 
                            <View style={styles.containerInformation}>
                                <Image
                                    source = {imageCharacter ? {uri: imageCharacter} : noImage}
                                    style={styles.imageStyle}
                                />  
                                <Text style={styles.textInformationTitle}>Nombre:</Text>
                                <Text style={styles.textInformation}>{name}</Text>
                                <Text style={styles.textInformationTitle}>Estado:</Text>
                                <Text style={styles.textInformation}>{status}</Text>
                                <Text style={styles.textInformationTitle}>Especie</Text>
                                <Text style={styles.textInformation}>{species}</Text>
                                <Text style={styles.textInformationTitle}>Género</Text>
                                <Text style={styles.textInformation}>{gender}</Text>
                                <Text style={styles.textInformationTitle}>Origen</Text>
                                <Text style={styles.textInformation}>{origin}</Text>
                            </View>    
                            
                        </ScrollView> 
                        <Pressable
                            style={[styles.buttonCloseModal,{opacity: isPressModalExitButton? 0.5 : 1}]}
                            onPress={()=>setIsModalVisible(false)}   
                            onPressIn={()=>setIsPressModalExitButton(true)}
                            onPressOut={()=>setIsPressModalExitButton(false)} 

                        >
                            <Text style={styles.buttonCloseText}>X</Text>
                        </Pressable>  
                                                
                    </View>            
                        
                </Modal>        
            </View>  

        </View>

        
    );

}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    containerButtonModal: { 
        alignSelf: 'center',
        flexDirection: 'column', 
    },    
    detailsButton:{
        height: 40,
        width: 120,
        justifyContent: 'center',
        backgroundColor: colorApp.RickAndMortyGreen,
        borderRadius: 25,
        padding: 10,
        shadowColor: colorApp.blackPearl,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textButtonModal: {
        textAlign: 'center',
        alignSelf: 'center',
        color: colorApp.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    containerItemsModal: {
        height: '90%',
        backgroundColor: 'white',
        borderRadius:20,
        alignItems: 'center',
        marginTop:22,
    }, 
    imageStyle:{
        width: Dimensions.get('window').width-40,
        padding: 15,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        margin: 3,
        alignSelf:'center',
        borderRadius: 5
    }, 
    containerInformation: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    textInformationTitle: {
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: colorApp.blackPearl,
        fontSize: 18
    },
    textInformation: {
        width: '80%',
        textAlign: 'center',
        color: colorApp.ligthGray,
        fontSize: 16,
        margin: 3
    },
    buttonCloseModal: {
        backgroundColor: colorApp.RickAndMortyGreen,
        alignSelf: 'center',
        margin: 10,
        borderRadius:20,
        padding: 10,
        elevation: 2,
        height: 40,
        width: 40,
    },
    buttonCloseText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },   
});

export default DetailsCharacter;