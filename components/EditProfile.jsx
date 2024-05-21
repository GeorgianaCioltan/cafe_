import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase.config';
import { useNavigation } from '@react-navigation/native';

const EditProfile = ({ route }) => {
    const { userData } = route.params;
    const [name, setName] = useState(userData.name || '');
    const [surname, setSurname] = useState(userData.surname || '');
    const [selectedImage, setSelectedImage] = useState(userData.profileImage || null);
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation();

    const handleAddPhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            console.log("Picker result:", pickerResult); // Debugging log
            setSelectedImage(pickerResult.assets[0].uri);
        }
    };

    const uploadImageAsync = async (uri) => {
        setUploading(true);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const fileRef = ref(storage, 'profileImages/' + Date.now());
            await uploadBytes(fileRef, blob);
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            const userId = '1';
            const userDocRef = doc(db, 'users', userId);
            let profileImageUrl = selectedImage;

            // If a new image was selected and it is not already a URL, upload it to Firebase Storage
            if (selectedImage && !selectedImage.startsWith('http')) {
                profileImageUrl = await uploadImageAsync(selectedImage);
                console.log("Uploaded image URL:", profileImageUrl); // Debugging log
            }

            // Build the update data object dynamically
            const updateData = {
                name,
                surname,
            };

            // Add profileImage field only if a new image was selected
            if (profileImageUrl) {
                updateData.profileImage = profileImageUrl;
            }

            await updateDoc(userDocRef, updateData);
            navigation.navigate('Profile', { updatedProfileImage: profileImageUrl }); // Corrected to use profileImageUrl
            
        } catch (error) {
            console.error("Error updating user data: ", error);
        }
    };

    const userText = name + ' ' + surname;

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.banner}>
                <LinearGradient colors={['#894D25', '#DCC3B9']} start={[0, 0]} end={[0, 1]} style={styles.gradient1}>
                    <View style={styles.profile}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
                        ) : (
                            <TouchableOpacity onPress={handleAddPhoto}>
                                <Text style={styles.add}>Add Photo</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </LinearGradient>
            </View>
            <TouchableOpacity onPress={handleAddPhoto}>
                                <Text style={styles.add2}>Change photo</Text>
                            </TouchableOpacity>
            <Text style={styles.userName}>{userText || 'Your Name'}</Text>
            <TextInput onChangeText={setName} value={name} placeholder="Change Your Name" style={styles.setName} />
            <TextInput onChangeText={setSurname} value={surname} placeholder="Change Your Surname" style={styles.setSurname} />
            <TextInput placeholder="Change Your Phone Number" style={styles.setPhone} />
            <TextInput placeholder="Change Your Email" style={styles.setEmail} />
            <TouchableOpacity style={styles.but2} onPress={handleSave}>
                <LinearGradient colors={['#C06A30', '#593116']} start={[0, 0]} end={[0, 1]} style={styles.butGradient}>
                    <Text style={styles.but_txt}>Save</Text>
                </LinearGradient>
            </TouchableOpacity>
            {uploading && <ActivityIndicator size="large" color="#0000ff" />}
            <TouchableOpacity style={styles.GoBack} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/left.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCC3B9'
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
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 61.5,
    },
    GoBack: {
        position: 'absolute',
        width: 30,
        height: 30,
        top: 45,
        left: 15
    },
    userName: {
        position: 'absolute',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#593116',
        top: 260
    },
    add: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#593116',
    },
    add2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#593116',
        bottom:90,
        zIndex:999
    },
    setName: {
        position: 'absolute',
        height: 50,
        width: 320,
        backgroundColor: '#D7B8AB',
        top: 340,
        borderBottomWidth: 2,
        borderColor: '#593116'
    },
    setSurname: {
        position: 'absolute',
        height: 50,
        width: 320,
        backgroundColor: '#D7B8AB',
        top: 430,
        borderBottomWidth: 2,
        borderColor: '#593116'
    },
    setPhone: {
        position: 'absolute',
        height: 50,
        width: 320,
        backgroundColor: '#D7B8AB',
        top: 520,
        borderBottomWidth: 2,
        borderColor: '#593116'
    },
    setEmail: {
        position: 'absolute',
        height: 50,
        width: 320,
        backgroundColor: '#D7B8AB',
        top: 610,
        borderBottomWidth: 2,
        borderColor: '#593116'
    },
    but2: {
        borderRadius: 20,
        position: 'absolute',
        width: 330,
        height: 70,
        bottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
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

export default EditProfile;
