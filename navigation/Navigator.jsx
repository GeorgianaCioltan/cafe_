// navigation/Navigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../components/Menu';
import LongEspresso from '../components/LongEspresso';
import Welcome_page from '../components/Welcome_page';
import Americano from '../components/Americano';
import Bolo from '../components/Bolo';
import CafeLatte from '../components/CafeLatte';
import Cappuccino from '../components/Cappuccino';
import FlatWhite from '../components/FlatWhite';
import HotChoco from '../components/HotChoco';
import Macchiato from '../components/Macchiato';
import Milkshake from '../components/Milkshake';
import Mocha from '../components/Mocha';
import NaturalJuice from '../components/NaturalJuice';
import Pao from '../components/Pao';
import Pastel from '../components/Pastel';
import Queque from '../components/Queque';
import LoginScreen from '../ComponentesInitialScreen/LoginScreen';
import CartEmpty from '../components/CartEmpty';
import Cart from '../components/Cart';
import Stats1 from '../components/Stats1';
import Stats2 from '../components/Stats2';
import CreateProfile from '../components/CreateProfile';
import Profile from '../components/Profile';
import Tea from '../components/Tea'
import Soda from '../components/Soda';
import OrderPaid from '../components/OrderPaid';
import PENDING from '../components/PENDING';
import DELIVERED from '../components/DELIVERED';
import Feedback from '../components/Feedback';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="Welcome_page" 
          component={Welcome_page} 
          options={{ headerShown: false }} // Hide header for Menu screen
        />
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ headerShown: false }} // Hide header for Menu screen
        />
        <Stack.Screen 
          name="LongEspresso" 
          component={LongEspresso} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="Americano" 
          component={Americano} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen
            name='Bolo'
            component={Bolo}
            options={{headerShown: false}}
            />
        <Stack.Screen 
          name="CafeLatte" 
          component={CafeLatte} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        /> 
        <Stack.Screen 
          name="Cappuccino" 
          component={Cappuccino} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />    
        <Stack.Screen 
          name="FlatWhite" 
          component={FlatWhite} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        /> 
        <Stack.Screen 
          name="HotChoco" 
          component={HotChoco} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        /> 
        <Stack.Screen 
          name="Macchiato" 
          component={Macchiato} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        /> 
        <Stack.Screen 
          name="Milkshake" 
          component={Milkshake} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="Mocha" 
          component={Mocha} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />  
        <Stack.Screen 
          name="NaturalJuice" 
          component={NaturalJuice} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        /> 
        <Stack.Screen 
          name="Pao" 
          component={Pao} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        /> 
        <Stack.Screen 
          name="Pastel" 
          component={Pastel} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="Queque" 
          component={Queque} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="Tea" 
          component={Tea} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="Soda" 
          component={Soda} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false, animationEnabled: false }} // Disable animation for LoginScreen
        />
        <Stack.Screen 
        name="CartEmpty" 
        component={CartEmpty} 
        options={{ headerShown: false, animationEnabled: false }} // Disable animation for CartEmpty
        />
        <Stack.Screen 
        name="Cart" 
        component={Cart} 
        options={{ headerShown: false, animationEnabled: false }} // Disable animation for Cart
        />
        <Stack.Screen 
        name="Stats1" 
        component={Stats1} 
        options={{ headerShown: false, animationEnabled: false }} // Disable animation for Stats1
        />
        <Stack.Screen 
        name="Stats2" 
        component={Stats2} 
        options={{ headerShown: false, animationEnabled: false }} // Disable animation for Stats2
        />
        <Stack.Screen 
        name="CreateProfile" 
        component={CreateProfile} 
        options={{ headerShown: false, animationEnabled: false }} // Disable animation for CreateProfile
        />
        <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false, animationEnabled: false }} // Disable animation for Profile
        />
        <Stack.Screen 
          name="OrderPaid" 
          component={OrderPaid} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="PENDING" 
          component={PENDING} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="DELIVERED" 
          component={DELIVERED} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />
        <Stack.Screen 
          name="Feedback" 
          component={Feedback} 
          options={{ headerShown: false }} // Hide header for LongEspresso screen
        />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
