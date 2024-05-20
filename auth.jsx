import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    // Store user email in AsyncStorage upon successful registration
    await storeUserData('userEmail', email);
    return true; // Indicate successful registration
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return auth().currentUser;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await auth().signOut();
    // Clear user data from AsyncStorage upon logout
    await AsyncStorage.removeItem('userEmail');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const storeUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

export const getUserData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};
