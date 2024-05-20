import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const DELIVERED = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.background}>
            <StatusBar style="auto" />
            <Text style={styles.text1}>Your order has been delivered!</Text>
            <Text style={styles.text2}>Thank you!</Text>
            <Image source={require('../assets/Coffee-Table-and-Books-580x386.png')} style={styles.img} />
            <TouchableOpacity style={styles.but} onPress={()=>navigation.navigate('Feedback')}>
                <LinearGradient colors={['#C06A30', '#593116']} start={[0, 0]} end={[0, 1]} style={styles.butGradient}>
                    <Text style={styles.but_txt} >Give us a feedback</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor:'#ffffff'
    },
    text1: {
        position:'relative',
      top:170,
      textAlign: 'center',
      fontSize: 48,
      lineHeight: 45,
      fontWeight: 'bold',
      color: '#72401E',
    },
    text2: {
        position:'relative',
        top: 190,
        textAlign: 'center',
        fontSize: 48,
        lineHeight: 45,
        fontWeight: 'bold',
        color: '#72401E',
      },
    img: {
        position:'relative',
        width: 300, // Set the width to the desired value
        height: 300, // Set the height to the desired value
        alignSelf: 'center',
        resizeMode: 'center',
        top:200,
        justifyContent:'center'
    },
    but:{
        borderRadius: 20,
        position:'relative',
        width:330,
        height:70,
        top:230,
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
export default DELIVERED;