import React, { useState } from 'react';
import colorApp from '../../res/colorApp';
import { 
    Pressable, 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator 
} from 'react-native';

const ButtonExplorer = ({onPressNext,onPressPrev,numberPage,isLoading}) => {
    const [isPressNext,setIsPressNext] = useState(false);
    const [isPressPrev,setIsPressPrev] = useState(false);

    return(
        <View style={styles.container}>
            <Pressable 
                style={[styles.nextPrevButton,{opacity: isPressPrev? 0.5 : 1}]}
                onPress={onPressPrev}
                onPressIn={()=>setIsPressPrev(true)}
                onPressOut={()=>setIsPressPrev(false)}
            >
                <Text style={styles.textStyle}>Anterior</Text>
            </Pressable>
            
            { isLoading ?
                <ActivityIndicator
                    color={colorApp.RickAndMortyGreen}
                    size='large'
                />
            : <Text style={[styles.textStyle,{fontSize: 20,width:40}]}>{numberPage}</Text>}

            <Pressable
                style={[styles.nextPrevButton,{opacity: isPressNext? 0.5 : 1}]}
                onPress={onPressNext}
                onPressIn={()=>setIsPressNext(true)}
                onPressOut={()=>setIsPressNext(false)}
            >
                <Text style={styles.textStyle}>Siguiente</Text>
            </Pressable>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor: colorApp.opaqueBlack,
        height: 60,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0, 
        width: '100%',
    },
    textStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        color: colorApp.white,
        fontWeight: 'bold',
        
    },
    nextPrevButton: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        backgroundColor: colorApp.RickAndMortyGreenBlue,
        borderRadius: 25,
        padding: 10,
    },
});

export default ButtonExplorer;