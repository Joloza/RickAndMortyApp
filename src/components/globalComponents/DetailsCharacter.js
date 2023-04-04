import React, {useState} from "react";
import { 
    Modal, 
    Pressable, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions
} from "react-native";
import colorApp from "../../res/colorApp";

const DetailsCharacter=({imageCharacter,name,status,species,gender,origin})=>{

    const [isPressDetails, setIsPressDetails] = useState(false);
    const [isPressModalExitButton, setIsPressModalExitButton] = useState(false);
    const [isModalVisible,setIsModalVisible] = useState(false);

    return(

        <View style={styles.container}>

            <View style={styles.containerLink}>
                <Pressable
                    style={{alignSelf: "center"}}
                    onPress={()=>{
                        setIsModalVisible(true);
                        setIsPressModalExitButton(false);
                    }}                
                    onPressIn={()=>setIsPressDetails(true)}
                    onPressOut={()=>setIsPressDetails(false)}
                        
                >                
                    <Text 
                        style={[styles.textLink,{color: isPressDetails? colorApp.white : colorApp.apricot}]}>Ver más detalles</Text>
                </Pressable>             
                
            </View>

            <View style={styles.containerModal}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={isModalVisible}
                >
                                    
                    <View style={styles.containerTextModal}>
                        <ScrollView>     
                            <Image
                                source = {imageCharacter ? {uri: imageCharacter} : null}
                                style={styles.imageStyle}
                            />  
                            <Text>{name}</Text>
                            <Text>{status}</Text>
                            <Text>{species}</Text>
                            <Text>{gender}</Text>
                            <Text>{origin}</Text>
                        </ScrollView> 
                        <Pressable
                            style={[styles.buttonCloseModal,{backgroundColor: isPressModalExitButton? colorApp.orange : colorApp.apricot}]}
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
    imageStyle:{
        //width: Dimensions.get('window').width-20,
        height: Dimensions.get('window').height-400,
        padding: 15,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        margin: 3,
        alignSelf:"center",
        borderRadius: 5
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 15,
    },
    containerLink: { 
        flexDirection: 'row', 
        alignSelf: "center", 
        justifyContent: "center",
        width: 150
    },    
    btnLogInText: {
        justifyContent: "center",
        color: colorApp.white,
        textAlign: 'center',
        fontSize: 16,
        width: 25,
        height: 25,
        alignSelf: 'center',
        margin: 5,        
    },
    radioButtonImage: {
        width: 20,
        height: 20,
        opacity: 0.8,
        alignSelf: "center"
    },
    radioButtonTextAccept: {
        color: colorApp.white,
        marginTop: 5,
        marginBottom: 5,     
        alignSelf: "center"
    },
    textLink: {
        marginTop: 5,
        marginBottom: 5,     
        textAlign: "center"
    },
    containerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    containerTextModal: {
        height: "90%",
        backgroundColor: "white",
        borderRadius:20,
        alignItems: "center",
        marginTop:22,
    },      
    modalText: {
        margin: 15,
        textAlign: 'left',
    }, 
    buttonCloseModal: {
        alignSelf: "flex-end",
        margin: 10,
        borderRadius:20,
        padding: 10,
        elevation: 2,
        height: 40,
        width: 40,
    },
    buttonCloseText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },   
});

export default DetailsCharacter;