import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config'; // Import your Firestore configuration

const LoginScreen = ({ navigation }) => { // Receive navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Query Firestore to find a user with the provided email and password
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      // Check if any user matches the provided credentials
      if (querySnapshot.empty) {
        setError('Invalid email or password');
      } else {
        // Navigate to another screen upon successful login
        console.log('good');
        navigation.navigate('Welcome_page'); // Replace 'MainScreen' with your desired screen
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5DBD7',
    paddingHorizontal: 20,
    width: '100%', 
    height: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#72401E',
    alignSelf: 'flex-start',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#72401E',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    backgroundColor: '#72401E',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
