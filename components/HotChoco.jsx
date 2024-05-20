import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, Modal, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config'; // Assuming you have configured Firebase in firebase.config
import ModalHotChoco from '../components/ModalHotChoco'
import { useNavigation } from '@react-navigation/native';
const HotChoco = () => {
    const [isLiked, setIsLiked] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const [text, setText] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMilk, setSelectedMilk] = useState(null);
    const [drinkData, setDrinkData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const docRef = doc(db, 'drinks', '4');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDrinkData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchDrinkData();
    }, []);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };
    const handleSelectMilk = (milk) => {
        setSelectedMilk(milk);
    };

    const toggleSwitch = async () => {
        try {
            setIsEnabled(previousState => {
                if (previousState === undefined) {
                    return false;
                }
                return !previousState;
            });

            const docRef = doc(db, 'drinks', '4');
            await updateDoc(docRef, {
                takeaway: !isEnabled
            });
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    const addToCart = async () => {
        try {
            console.log("drink Data:", drinkData);
            // Check if drinkData is properly initialized
            if (!drinkData) {
                console.log("drink data is not yet loaded");
                return; // Exit early if drinkData is not initialized
            }
    
            const userDocRef = doc(db, 'users', '1');
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                let cart = userData.cart;
                if (!Array.isArray(cart)) {
                    cart = []; // Initialize cart to an empty array if it's not already an array
                }
                console.log("Current Cart:", cart);
    
                // Construct new item to add to cart
                const newItem = {
                    name: drinkData.name,
                    price: drinkData.price,
                    drinkId: '4',
                    quantity: quantity,
                    observations: text,
                    type: selectedMilk,
                    takeaway: isEnabled ? true : false,
                };
    
                // Add new item to cart
                const newCart = [...cart, newItem];
                console.log("New Cart:", newCart);
    
                // Update the user document with the new cart data
                await updateDoc(userDocRef, { cart: newCart });
    
                console.log('Item added to cart successfully');
                navigation.navigate('Menu');
            } else {
                console.log('User document does not exist');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    if (!drinkData) {
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
        <Image source={{ uri: 'https://64.media.tumblr.com/515bfedfa408cfe6e84ad4e35945f0bd/tumblr_mmgb7h5NXD1qg6rkio1_500.gifv' }} style={{ width: '100%',height: '100%',resizeMode: 'contain',zIndex: 999 }} />
      </View>
        );
    } 

    return (
        <View style={styles.container}>
            <Image style={styles.bgImg} source={require('../assets/mocha2.png')} />
            <TouchableOpacity style={styles.GoBack} onPress={()=>navigation.goBack()}>
                <Image source={require('../assets/chevron.backward.circle.fill.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.love} onPress={toggleLike}>
                <Image source={isLiked ? require('../assets/heart.circle.fill.png') : require('../assets/heart.circle.png')} />
            </TouchableOpacity>
            <View style={styles.menu}>
                <Text style={styles.es_txt}>{drinkData.name}</Text>
                <Text style={styles.price}>{drinkData.price}$</Text>
                <View style={styles.milkBg}>
                    <Text style={styles.milk}>Takeaway</Text>
                    <Switch
                        style={styles.swc}
                        trackColor={{ false: "#FFFFFF", true: "#00830D" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#593116"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.typeBg}>
                    <Text style={styles.type}>Choose type of Choco</Text>
                    <ModalHotChoco onSelect={handleSelectMilk}/>
                </View>
                <View style={styles.obsBg}>
                    <TextInput onChangeText={setText} value={text} placeholder="Add Observations" style={styles.obs} />
                </View>
                <Image source={require('../assets/takeaway.png')} style={styles.cof} />
                <Text style={styles.number}>{quantity}</Text>
                <TouchableOpacity style={styles.btMinus} onPress={decrementQuantity}>
                    <Text style={styles.minus}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btPlus} onPress={incrementQuantity}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.but} onPress={() => addToCart(selectedMilk)}>
                    <LinearGradient colors={['#C06A30', '#593116']} start={[0, 0]} end={[0, 1]} style={styles.butGradient}>
                        <Text style={styles.but_txt}>Add to Order</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImg: {
        resizeMode: 'cover',
        width: 400, // Sample width
        height: 390, // Sample height
        bottom: 210,
        left: 10
    },
    menu: {
        position: "absolute",
        width: 375, // Sample width
        height: 470, // Sample height
        top: 350,
        backgroundColor: '#DCC3B9',
        borderRadius: 30,
        zIndex: 999,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

    },
    GoBack: {
        position: 'absolute',
        width: 30,
        height: 30,
        top: 45,
        left: 30
    },
    love: {
        position: 'absolute',
        top: 45,
        right: 30
    },
    es_txt: {
        position:'absolute',
        fontSize: 30,
        fontWeight: 'bold',
        left: 30,
        top: 20,
        color: '#593116'
    },
    price: {
        position:'absolute',
        fontSize: 30,
        right: 40,
        top: 20,
        color: '#593116'
    },
    milkBg: {
        position: 'absolute',
        width: 320,
        height: 46,
        backgroundColor: 'rgba(255, 255, 255, 1)', // Semi-transparent white background
        top: 70,
        left: 27,
        zIndex: 999,
        borderRadius: 12,
    },
    milk: {
        fontSize: 18,
        left: 20,
        top: 14
    },
    swc: {
        left: 250,
        bottom: 12,
    },
    typeBg: {
        position: 'absolute',
        width: 320,
        height: 46,
        backgroundColor: 'rgba(255, 255, 255, 1)', // Semi-transparent white background
        top: 130,
        left: 27,
        zIndex: 999,
        borderRadius: 12,
    },
    type: {
        fontSize: 18,
        left: 20,
        top: 14
    },
    obsBg: {
        position: 'absolute',
        width: 320,
        height: 46,
        backgroundColor: 'rgba(255, 255, 255, 1)', // Semi-transparent white background
        top: 190,
        left: 27,
        zIndex: 999,
        borderRadius: 12,
    },
    obs: {
        fontSize: 18,
        left: 20,
        top: 12,
        color: '#3C3C43'
    },
    cof: {
        position: 'absolute',
        height: 140,
        width: 140,
        resizeMode: 'contain',
        bottom: 100
    },
    btMinus: {
        position: 'absolute',
        backgroundColor: '#593116',
        width: 50,
        height: 50,
        borderRadius: 25,
        left: 80,
        bottom: 140,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    minus: {
        position: 'absolute',
        fontSize: 60,
        fontWeight: 'bold',
        color: "#fff",
        top: -10
    },
    btPlus: {
        position: 'absolute',
        backgroundColor: '#593116',
        width: 50,
        height: 50,
        borderRadius: 25,
        right: 80,
        bottom: 140,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus: {
        position: 'absolute',
        fontSize: 50,
        fontWeight: 'bold',
        color: "#fff",
        top: -4
    },
    but: {
        position: 'absolute',
        borderRadius: 20,
        position: 'relative',
        width: 330,
        height: 60,
        top: 140,
        alignItems: 'center',
        justifyContent: 'center',

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
    },
    number: {
        position: 'relative',
        fontSize: 30,
        color: '#fff',
        top: 100,
        fontWeight: 'bold',
    }
});

export default HotChoco;
