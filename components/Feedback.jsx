import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, {useState} from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

const Feedback = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View style={styles.background}>
            <StatusBar style="auto" />
            <Text style={styles.text1}>We would love your feedback!</Text>
            <Text style={styles.text2}>Anonimity</Text>
            <Switch
                style={styles.swc}
                trackColor={{ false: "#FFFFFF", true: "#00830D" }}
                thumbColor={isEnabled ? "#FFFFFF" : "#593116"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled} />
            <View style={styles.coffee}>
                <Image source={require('../assets/Coffee-clip-art-free-clipart-images.png')} style={styles.img}/>
                <Rating
                    onFinishRating={this.ratingCompleted}
                    style={styles.rating} />
                <Image source={require('../assets/4735061.png')} style={styles.img}/>
                <Rating
                    onFinishRating={this.ratingCompleted}
                    style={styles.rating} />
            </View>
            <TouchableOpacity style={styles.but} onPress={()=>navigation.navigate('Menu')} >
                <LinearGradient colors={['#C06A30', '#593116']} start={[0, 0]} end={[0, 1]} style={styles.butGradient}>
                    <Text style={styles.but_txt} >Go Back To Menu</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        position:'relative',
        backgroundColor:'#ffffff',
        height:400,
        top:200,
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3

    },
    text1: {
        position:'relative',
      bottom:130,
      textAlign: 'center',
      fontSize: 50,
      lineHeight: 50,
      fontWeight: 'bold',
      color: '#72401E',
    },
    text2: {
        position:'relative',
        bottom: 130,
        right:40,
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 45,
        fontWeight: 'bold',
        color: '#72401E',
      },
    swc: {
        position:'relative',
        bottom:165,
        left:220,
    },
    coffee: {
        position:'relative',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        gap:10
    },
    img: {
        bottom:140,
        width: 200, // Set the width to the desired value
        height: 100, // Set the height to the desired value
        resizeMode: 'contain',
        alignSelf:'center'
    },
    rating: {
        backfaceVisibility:'hidden',
        maxHeight:'auto',
        maxWidth:'auto',
        bottom:140,
        backgroundColor:'#DCC3B9'
    },
    but:{
        borderRadius: 20,
        position:'relative',
        width:330,
        height:70,
        bottom:40,
        left:20,
        alignItems:'center',
        justifyContent:'center'

    },
    butGradient: {
        flex: 1,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    but_txt: {
        textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      color: '#FFFFFF',
    }

});
export default Feedback;