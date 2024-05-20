import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config'; // Assuming you have a db configuration file

const Sidebar = ({ activePage }) => {
  const navigation = useNavigation();
  const [isCartEmpty, setIsCartEmpty] = useState(true); // State to track if the user's cart is empty

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        // Fetch the user's cart data from Firestore
        const userDocRef = doc(db, 'users', '1'); // Replace '1' with the actual user ID
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Check if the user's cart is empty
          if (userData.cart && userData.cart.length > 0) {
            setIsCartEmpty(false);
          } else {
            setIsCartEmpty(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart(); // Call the function to fetch user cart data
  }, []);

  const navigateToCart = (screenName) => {
    if (screenName === 'Cart' && isCartEmpty) {
      navigation.navigate('CartEmpty');
    }
    else{
        navigation.navigate('Cart')
    }
  };
  const navigateToStats = (screenName) => {
    if (screenName === 'Stats2' && isCartEmpty ) {
        navigation.navigate('Stats1')
    }
    else {
        navigation.navigate('Stats2')
    }
  };
  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  }


  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={() => navigateTo('Menu')}>
        <Image style={[styles.menu, activePage === 'Menu' && styles.hidden]} source={require('../assets/Menu.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Profile')}>
        <Image style={[styles.profile, (activePage === 'CreateProfile' || activePage === 'Profile') && styles.hidden]} source={require('../assets/ef.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToStats('Stats2')}>
        <Image style={[styles.statistics, (activePage === 'Stats2' || activePage === 'Stats1') && styles.hidden]} source={require('../assets/statistics.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToCart('Cart')}>
        <Image style={[styles.cart, (activePage === 'Cart' || activePage === 'CartEmpty') && styles.hidden]} source={require('../assets/cart.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: 380,
    height: 90,
    backgroundColor: '#fff',
    bottom: 5,
  },
  menu: {
    position: 'absolute',
    left: 40,
    height: 45,
    width: 45,
    top: 18,
    opacity: 0.5,
  },
  profile: {
    position: 'absolute',
    right: 40,
    height: 45,
    width: 35,
    top: 18,
    opacity: 0.5,
  },
  statistics: {
    position: 'absolute',
    right: 113,
    height: 65,
    width: 65,
    top: 10,
    opacity: 0.5,
  },
  cart: {
    position: 'absolute',
    left: 113,
    height: 65,
    width: 65,
    top: 10,
    opacity: 0.5,
  },
  hidden: {
    opacity: 0, // Hides the element
  },
});

export default Sidebar;
