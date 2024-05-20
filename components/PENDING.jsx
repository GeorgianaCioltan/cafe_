import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeSearchBar } from 'react-native-screens';

const PENDING = () => {
    const navigation = useNavigation();
    return(
        <View >
            <StatusBar style="auto" />
            <Text style={styles.text1}>Your order is being prepared!</Text>
            <Text style={styles.text2}>Time Passed</Text>
            <Text style={styles.time}>1m30s</Text>
            <Image source={require('../assets/cartoon-barista-pouring-milk-or-cream-into-a-huge-cup-of-coffee-man-making-cappuccino-or-latte-isolated-flat-illustration-vector.png')} style={styles.img} />
            <TouchableOpacity style={styles.but} onPress={()=>navigation.navigate('Menu')}>
                <LinearGradient colors={['#C06A30', '#593116']} start={[0, 0]} end={[0, 1]} style={styles.butGradient}>
                    <Text style={styles.but_txt} >Go Back To Menu</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.but2} onPress={()=>navigation.navigate('Stats2')}>
                <LinearGradient colors={['#C06A30', '#593116']} start={[0, 0]} end={[0, 1]} style={styles.butGradient}>
                    <Text style={styles.but_txt} >See Your Items</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    text1: {
        position:'relative',
      top:140,
      textAlign: 'center',
      fontSize: 50,
      lineHeight: 48,
      fontWeight: 'bold',
      color: '#72401E',
    },
    time: {
        position:'relative',
        top:160,
        textAlign:'center',
        fontSize:20,
        color: '#72401E'
    },
    text2: {
        position:'relative',
        top: 150,
        textAlign: 'center',
        fontSize: 40,
        lineHeight: 45,
        fontWeight: 'bold',
        color: '#72401E',
      },
    img: {
        position:'relative',
        width: 200, // Set the width to the desired value
        height: 300, // Set the height to the desired value
        resizeMode: 'center',
        alignSelf:'center',
        top:130
    },
    but:{
        borderRadius: 20,
        position:'relative',
        width:330,
        height:70,
        top:260,
        left:20,
        alignItems:'center',
        justifyContent:'center'

    },
    but2: {
        borderRadius: 20,
        position:'relative',
        width:330,
        height:70,
        top:100,
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
export default PENDING;