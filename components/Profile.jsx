import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const updatedProfileImage = route.params?.updatedProfileImage; // Safe access to route params
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = '1';
                const userDoc = await getDoc(doc(db, 'users', userId)); // Adjusted to 'users' collection
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log('User Data:', userData); // Log the user data
                    setUserData(userData);
                    setProfileImage(userData.profileImage); // Set the initial profile image
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // If there is an updated profile image, set it in the state
        if (updatedProfileImage) {
            setProfileImage(updatedProfileImage);
        }
    }, [updatedProfileImage]);

    if (loading) {
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
                <Image source={{ uri: 'https://64.media.tumblr.com/515bfedfa408cfe6e84ad4e35945f0bd/tumblr_mmgb7h5NXD1qg6rkio1_500.gifv' }} style={{ width: '100%', height: '100%', resizeMode: 'contain', zIndex: 999 }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.banner}>
                <LinearGradient colors={['#894D25', '#DCC3B9']} start={[0, 0]} end={[0, 1]} style={styles.gradient1}>
                    <LinearGradient colors={['#DCC3B9', '#894D25']} start={[0, 0]} end={[0, 1]} style={styles.profile}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profilePicPicked} />
                        ) : (
                            <Image source={require('../assets/ef.png')} style={styles.profilePic} />
                        )}
                    </LinearGradient>
                    <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate('EditProfile', { userData })}>
                        <Image source={require('../assets/edit.png')} style={styles.editIcon} />
                    </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.yourname}>{userData ? `${userData.name} ${userData.surname}` : 'Your Name'}</Text>
                <Text style={styles.cafePoints}>Cafe Points</Text>
                <Image source={require('../assets/coin.png')} style={styles.coin} />
                <Text style={styles.coinsText}>{userData ? userData.points : '300'}</Text>
                <Text style={styles.YourGoTo}>Your Go-To</Text>
                {/* Add your menu items here */}
            </View>
            <Sidebar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCC3B9'
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 40,
        fontWeight: 'bold',
        color: '#72401E',
    },
    banner: {
        position: 'absolute',
        top: 0,
        height: 270,
        width: 380
    },
    gradient1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        position: 'absolute',
        height: 123,
        width: 123,
        borderRadius: 61.5,
        left: 30,
        top: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    edit: {
        position: 'absolute',
        height: 25,
        width: 25,
        right: 10,
        top: 30,
        opacity: 0.5,
    },
    editIcon: {
        height: 25,
        width: 25,
    },
    yourname: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#593116',
        top: 10,
        left: 60,
        zIndex: 999
    },
    profilePicPicked: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    profilePic: {
        height: 80,
        width: 60
    },
    cafePoints: {
        position: 'absolute',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#593116',
        top: 320,
        left: 30
    },
    coin: {
        position: 'absolute',
        height: 30,
        width: 30,
        top: 325,
        left: 220
    },
    coinsText: {
        position: 'absolute',
        left: 260,
        top: 325,
        fontSize: 30,
        color: '#593116',
    },
    YourGoTo: {
        position: 'absolute',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#593116',
        top: 380,
        left: 30
    },
    menuContainer: {
        position: 'absolute',
        flexDirection: 'row', // Ensures items are displayed horizontally
        marginTop: 430,
        marginLeft: 20 // Adjust this value according to your layout
    },
    item: {
        zIndex: 999,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        width: 150,
        height: 150,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center', // Align content vertically
        justifyContent: 'center', // Align content horizontally
    },
    name: {
        fontSize: 14, // Adjust font size as needed
        fontWeight: 'bold',
    },
    price: {
        fontSize: 12, // Adjust font size as needed
        color: '#666', // Adjust color as needed
    },
    maro: {
        backgroundColor: '#593116',
        height: 90,
        width: 120,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagine: {
        height: 80,
        width: 80,
    },
});

export default Profile;
