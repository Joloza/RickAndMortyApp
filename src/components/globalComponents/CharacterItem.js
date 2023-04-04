import React from 'react';
import colorApp from '../../res/colorApp';
import noImage from '../../assets/noImage.png';
import {
    Dimensions, 
    Image, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View
} from 'react-native';
import DetailsCharacter from './DetailsCharacter';

const CharacterItem =({item,imageSource})=> {

    return(
        <ScrollView>
            <View style={styles.itemContainer}>
                <Image
                    source = {imageSource ? {uri: imageSource} : noImage}
                    style={styles.imageStyle}
                />
                <View style={styles.containerText}>
                    <Text style={styles.textStyle}>{item.name}</Text>
                    <Text style={[styles.textStyle,{fontSize: 18}]}>{item.species}</Text>
                </View>             
                <DetailsCharacter
                    imageCharacter={imageSource}
                    name={item.name}
                    status={item.status}
                    species={item.species}
                    gender={item.gender}
                    origin={item.origin['name']}
                />     
                
            </View>
        </ScrollView>
        
    );
}

const styles= StyleSheet.create({
    itemContainer:{
        width: Dimensions.get('window').width/1.5,
        height: Dimensions.get('window').height-222,
        borderColor: colorApp.white,
        borderWidth: 3,
        borderRadius:10,
        margin: 5,
        alignSelf: 'center',
        backgroundColor: colorApp.RickAndMortyGreenBlueOpaque,
    },
    imageStyle:{        
        height: Dimensions.get('window').height/4,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        margin: 3,
        alignSelf:'center',
        borderRadius: 5
    },
    textStyle:{
        color: colorApp.white,
        textAlign: 'center',
        fontSize: 24,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderBottomColor: colorApp.white, 
        fontWeight: 'bold'
    },
    containerText: {
        justifyContent: 'center',
        height: 160
    },
    
});

export default CharacterItem;