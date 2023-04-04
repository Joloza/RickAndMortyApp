import React,{useEffect,useState,useRef} from "react";
import { Text, View, StyleSheet, Dimensions, FlatList, Pressable, TextInput } from "react-native"
import { getAllCharacters, getCharacterByName } from "../../res/ApiServices";
import colorApp from "../../res/colorApp";
import CharacterItem from "../globalComponents/CharacterItem";

const HomeScreen = () => {

    const [characters,setCharacters]=useState([]);
    const [isRefreshFlatList,setIsRefreshFlatlist]=useState(false);
    const [nameSearch,setNameSearch] =useState("");

    const numberPage = useRef(1);
    const flatListLocation = useRef(null);

    const loadDataApi=async()=>{
        let response=await getAllCharacters(numberPage.current);
        if(response!='ERR_BAD_REQUEST'){
            setCharacters(response);
            locationX();
        }else{
            numberPage.current=numberPage.current-1;
        }
    }

    const locationX=()=>{
        flatListLocation.current.scrollToIndex({ index: 0, animated: true });
    }

    const nextPage=()=> {
        numberPage.current=numberPage.current+1
        refreshFlatList();
    }

    const prevPage=()=> {
        if(numberPage.current>1){
            
            numberPage.current=numberPage.current-1
            refreshFlatList();
        }        
    }

    const filterCharacterByName=async(name)=>{
        setNameSearch(name);
        let response=await getCharacterByName(name);
        if(response!='ERR_BAD_REQUEST'){
            setCharacters(response);
            locationX();
        }
    }

    //---refresh flat lists---
    const refreshFlatList=async()=>{

        setIsRefreshFlatlist(true);
        await loadDataApi();
        setIsRefreshFlatlist(false);
    }

    useEffect(() => {  
        refreshFlatList();
        return()=>{
            setCharacters([]);
            setIsRefreshFlatlist(false);
            numberPage.current=1;
        };
    }, []);

    const renderItem=({item})=> <CharacterItem 
        item={item} 
        imageSource={item.image}
    />;
    const keyExtractor=(item) => item.id;

    return(
        <View>
            <Text>Rick And Morty</Text>
            <TextInput
                style={{color:"red"}}            
                keyboardType={"default"}
                textContentType={"name"}
                autoCapitalize="words"
                placeholder={'Nombre del personaje'} //quotes are added to prevent the cursor from going to the right
                placeholderTextColor={colorApp.ligthGray}
                onChangeText={(value)=>filterCharacterByName(value)}
                value={nameSearch}
            />
            <View style={styles.containerFlatList}>
                <View style={styles.separator}></View>
                    <FlatList
                        style={{
                            flex: 1,
                        }}
                        ref={flatListLocation}
                        horizontal={true}
                        data={characters}
                        initialNumToRender={5}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        refreshing={isRefreshFlatList}
                        onRefresh={()=>refreshFlatList()}  
                        contentContainerStyle={{ paddingLeft: 0 }}
                    />
                    
                <View style={styles.separator}></View>
            </View>

            <View style={{flexDirection: "row",justifyContent:"space-around"}}>
                <Pressable 
                    style={styles.nextPrevButton}
                    onPress={prevPage}
                >
                    <Text>Anterior</Text>
                </Pressable>
                <Pressable
                    style={styles.nextPrevButton}
                    onPress={nextPage}
                >
                    <Text>Siguiente</Text>
                </Pressable>
            </View>           
        </View>
    );
}

const styles = StyleSheet.create({

    containerFlatList: {
        flexDirection: 'column', 
        width: Dimensions.get('window').width,
        height: "80%", 
        alignSelf: 'center',
        justifyContent: 'center', 
        borderTopColor: colorApp.apricot, 
        borderWidth: 3, 
        borderBottomColor: colorApp.transparent, 
        borderLeftColor: colorApp.transparent, 
        borderRightColor: colorApp.transparent,
    },
    separator: {
        height: 20, 
        margin: 5,
    }, 
    nextPrevButton: {
        width: 120,
        height: 40,
        borderColor: colorApp.apricot,
        borderWidth: 2
    }

});

export default HomeScreen;