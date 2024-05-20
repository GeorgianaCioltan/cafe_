import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config'; // Assuming you have a db configuration file
import Sidebar from './Sidebar';
import { coffees, drinks, pastry } from './data';
import { StatusBar } from 'expo-status-bar';

const Stats2 = () => {
  const [order, setOrder] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        // Fetch the user's cart data from Firestore
        const userDocRef = doc(db, 'users', '1'); // Replace '1' with the actual user ID
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Set cart items to the order state
          setOrder(userData.cart || []);
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart(); // Call the function to fetch user cart data
  }, []);

  // Check if all items are delivered
  const allDelivered = order.length > 0 && order.every(item => item.delivered);


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.time}>Estimated Time: {item.time}</Text>
        {item.delivered && <Text style={styles.delivered}>Delivered</Text>}
      </View>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    const updatedOrder = order.map(orderItem => {
      if (orderItem.id === item.id) {
        return { ...orderItem, delivered: true };
      }
      return orderItem;
    });
    setOrder(updatedOrder);
  };
  if (allDelivered===true) {
    navigation.navigate('DELIVERED');
  }
  
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.statusContainer}>
        <View style={[styles.status, { backgroundColor: allDelivered ? '#19B60B' : '#EEE73F' }]} />
        <Text style={styles.statusText}>{allDelivered ? 'DELIVERED' : 'PENDING'}</Text>
      </View>
      <Text style={styles.text}>Statistics</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={order}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Sidebar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCC3B9',
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 40,
    fontWeight: 'bold',
    color: '#593116',
    marginTop: 45,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 130,
    left: 30,
  },
  status: {
    height: 24,
    width: 24,
    borderRadius: 5,
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#593116',
  },
  listContainer: {
    flex: 1,
    marginTop: 70, // Adjust this value as needed
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 330,
  },
  imageContainer: {
    backgroundColor: '#593116',
    borderRadius: 8,
    padding: 5,
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    color: '#888',
  },
  delivered: {
    fontSize: 14,
    color: '#19B60B',
  },
});

export default Stats2;
