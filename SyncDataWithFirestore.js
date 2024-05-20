// SyncData.js

import { useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase.config';
import { coffees, drinks, pastry, users } from './components/data';

const synchronizeFirestoreWithData = async () => {
  try {
    // Synchronize coffees
    await synchronizeCollectionWithData(coffees, 'coffees');

    // Synchronize drinks
    await synchronizeCollectionWithData(drinks, 'drinks');

    // Synchronize pastry
    await synchronizeCollectionWithData(pastry, 'pastry');

    await synchronizeCollectionWithData(users, 'users');

    console.log('Firestore data synchronized with local data successfully!');
  } catch (error) {
    console.error('Error synchronizing Firestore data:', error);
  }
};

const synchronizeCollectionWithData = async (data, collectionName) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  const existingData = querySnapshot.docs.map(doc => doc.data());

  // Find documents to add
  const documentsToAdd = data.filter(item => !existingData.find(doc => doc.name === item.name));

  // Add missing documents to Firestore
  await Promise.all(documentsToAdd.map(async (item) => {
    await addDoc(collectionRef, item);
  }));
};

const SyncData = () => {
  useEffect(() => {
    synchronizeFirestoreWithData();
  }, []);

  return null; // Or you can return a loading indicator if needed
};

export default SyncData;
