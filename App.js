import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Welcome_page from './components/Welcome_page';
import MethodPayment from './components/MethodPayment';
import DELIVERED from './components/DELIVERED';
import OrderPaid from './components/OrderPaid';
import PENDING from './components/PENDING';
import Feedback from './components/Feedback';
import Modaltest from './components/Modaltest'
import CreateProfile from './components/CreateProfile';
import Cart from './components/Cart';
import Menu from './components/Menu';
import Stats1 from './components/Stats1';
import Stats2 from './components/Stats2';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Sidebar from './components/Sidebar';
import CartEmpty from './components/CartEmpty';
import ChoosePerfil from './ComponentesInitialScreen/ChoosePerfil'
import LoginScreen from './ComponentesInitialScreen/LoginScreen';
import SyncData from './SyncDataWithFirestore';
import Navigator from './navigation/Navigator';
import RegisterScreen from './ComponentesInitialScreen/RegisterScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <Navigator/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});