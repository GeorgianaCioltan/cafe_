import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config'; // Assuming you have a db configuration file
import { LinearGradient } from 'expo-linear-gradient';
import Sidebar from './Sidebar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        // Fetch the user's cart data from Firestore
        const userDocRef = doc(db, 'users', '1'); // Replace '1' with the actual user ID
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Set cart items
          setCartItems(userData.cart || []);
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart(); // Call the function to fetch user cart data
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CartItemDetails', { itemId: item.id })}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.other}>{item.other}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.quantity}>{`x${item.quantity}`}</Text>
      <TouchableOpacity style={styles.delete}>
        <Image source={require('../assets/delete.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.ord}>Your Order</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        style={styles.flatList}
      />
      <View style={styles.payment}>
        <Text style={styles.methodOfPayment}>Method of Payment:</Text>
        <Image source={require('../assets/down.png')} style={styles.right} />
        <Image source={require('../assets/images.png')} style={styles.card} />
      </View>
      <View style={styles.subt}>
        <Text style={styles.sub1}>Subtotal:</Text>
        <Text style={styles.sub2}>€{calculateSubtotal()}</Text>
      </View>
      <TouchableOpacity style={styles.but} onPress={() => navigation.navigate('OrderPaid')}>
        <LinearGradient colors={['#C06A30', '#593116']} start={[0, 0]} end={[0, 1]} style={styles.butGradient}>
          <Text style={styles.but_txt}>Finish Order</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Sidebar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCC3B9',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  ord: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#72401E',
    textAlign: 'center',
    top: 40,
    marginBottom: 50,
  },
  flatList: {
    flexGrow: 1,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#72401E',
  },
  other: {
    fontSize: 16,
    color: '#72401E',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#72401E',
    left: 230,
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#72401E',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  editIcon: {
    width: 30,
    height: 30,
  },
  delete: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  deleteIcon: {
    width: 30,
    height: 30,
  },
  but: {
    borderRadius: 20,
    width: '100%',
    height: 60,
    bottom: 90,
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    bottom: 70,
    left: 40,
  },
  methodOfPayment: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  right: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  card: {
    width: 40,
    height: 40,
  },
  subt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    bottom: 80,
  },
  sub1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sub2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Cart;
