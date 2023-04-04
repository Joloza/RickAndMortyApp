import React,{useEffect,useState,useRef} from 'react';
import { getAllCharacters, getCharacterByName } from '../../res/ApiServices';
import colorApp from '../../res/colorApp';
import backImage from '../../assets/backImage.jpg';
import search from '../../assets/search.png';
import titleImage from '../../assets/Rick-and-Morty.png';
import { 
    View, 
    StyleSheet,
    Dimensions, 
    FlatList,  
    TextInput, 
    ImageBackground, 
    Image,
    ToastAndroid,
    Alert,
    BackHandler
} from 'react-native';
import CharacterItem from '../globalComponents/CharacterItem';
import ButtonExplorer from '../globalComponents/ButtonExplorer';


const HomeScreen = () => {

    const [characters,setCharacters]=useState([]);
    const [isRefreshFlatList,setIsRefreshFlatlist]=useState(false);
    const [nameSearch,setNameSearch] =useState('');

    const numberPage = useRef(1);
    const flatListLocation = useRef(null);

    function toastAndroidMessage(message,xPosition,yPosition) {
        return ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            xPosition,
            yPosition,
        );
    };

    const loadDataApi=async()=>{
        let response=await getAllCharacters(numberPage.current);
        if(response!='ERR_BAD_REQUEST'){
            setCharacters(response);
            locationX();
        }else{
            toastAndroidMessage('No hay mas páginas para ver',50,50);
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

    const filterCharacterByName=async(name,)=>{
        setNameSearch(name);
        let response=await getCharacterByName(name);
        if(response!='ERR_BAD_REQUEST'){
            setCharacters(response);
            numberPage.current=1;
            locationX();
        }
    }

    const refreshFlatList=async()=>{

        setIsRefreshFlatlist(true);
        await loadDataApi();
        setIsRefreshFlatlist(false);
    }

    useEffect(() => {  
        
        refreshFlatList();

        const backAction = () => {
            
            Alert.alert("Salir", "¿Desea salir de la aplicación?", [
                {
                  text: "Cancelar",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "Si", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
            
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        
        return()=>{
            backHandler.remove();
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
        <ImageBackground
            source={backImage}
            style={styles.backImage}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={titleImage}
                        style={styles.titleImage}
                    />
                    <View style={styles.containerSearch}>
                        <Image
                            source={search}
                        />
                        <TextInput
                            style={{color:'red'}}            
                            keyboardType={'default'}
                            textContentType={'name'}
                            autoCapitalize='words'
                            placeholder={'Nombre del personaje'} 
                            placeholderTextColor={colorApp.ligthGray}
                            onChangeText={(value)=>filterCharacterByName(value)}
                            value={nameSearch}
                        />
                    </View>
                    
                </View>
                
                <View style={styles.containerFlatList}>
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
                        scrollEventThrottle={33}
                    />                    
                </View>
            </View>
            <ButtonExplorer
                onPressNext={nextPage}
                onPressPrev={prevPage}
                numberPage={numberPage.current}                
                isLoading={isRefreshFlatList}
            />
                       
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,        
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    header: {
        backgroundColor: colorApp.opaqueBlack,
        flexDirection: 'column',
        borderBottomWidth: 2, 
        borderBottomColor: colorApp.RickAndMortyGreenBlue, 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5
    },
    containerFlatList: {
        flexDirection: 'row', 
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-212,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backImage:{
        flex:1, 
        width: '100%',
        height: '100%',        
        resizeMode: 'cover',
    },
    titleImage:{
        height: 50,
        padding: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        
    },
    containerSearch: {
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }

});

export default HomeScreen;