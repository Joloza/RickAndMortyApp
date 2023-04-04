import React from "react";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import colorApp from "../../res/colorApp";
import DetailsCharacter from "./DetailsCharacter";

const CharacterItem =({item,imageSource,showDetails})=> {

    return(
        <View style={styles.itemContainer}>
            <Image
                source = {imageSource ? {uri: imageSource} : null}
                style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>{item.name}</Text>
            <Text style={[styles.textStyle,{fontSize: 18}]}>{item.species}</Text>
            <Pressable
                style={styles.detailsButton}
                onPress={showDetails}
            >
                <DetailsCharacter
                    imageCharacter={imageSource}
                    name={item.name}
                    status={item.status}
                    species={item.species}
                    gender={item.gender}
                    origin={item.origin["name"]}
                />
            </Pressable>
            
        </View>
    );
}

const styles= StyleSheet.create({
    itemContainer:{
        width: Dimensions.get('window').width-40,
        borderColor: colorApp.VeryDarkDesaBlueOne,
        borderWidth: 1,
        justifyContent: "flex-start"
    },
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
    textStyle:{
        borderColor: "red",
        borderWidth: 1,
        textAlign: "center",
        fontSize: 24
    },
    detailsButton: {
        alignSelf: "center",
        borderColor: "red",
        borderWidth: 2
    }
});

export default CharacterItem;