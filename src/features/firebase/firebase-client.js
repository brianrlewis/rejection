import firebase from 'firebase';
import 'firebase/firestore';

let db;

const provider = new firebase.auth.GithubAuthProvider();

export const signInWithGitHub = () => firebase.auth().signInWithPopup(provider);
export const signInAnonymously = () => firebase.auth().signInAnonymously();
export const signOutWithFirebase = () => firebase.auth().signOut();

export const initDb = config => {
    try {
        firebase.initializeApp(config);
    } catch (err) {
        // Ignore the 'already exists' message.
        // This is normal during hot reloading.
        if (/already exists/.test(err.message)) return;
        else throw err; 
    }
      
    db = firebase.firestore();    
};

export const userExistsInFirebase = uid =>
    db
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => doc.exists);

export const userNotInFirebase = uid => 
    userExistsInFirebase(uid).then(x => !x);

export const saveUserToFirebase = user => db
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => !doc.exists
        ? db
            .collection('users')
            .doc(user.uid)
            .set(user)
        :  db
            .collection('users')
            .doc(user.uid)
            .update(user))
    .catch(error => {
        console.error('Error saving user: ', error);
    });

export const saveQuestionsToFirebase = (uid, questions) => db
    .collection('users')
    .doc(uid)
    .update({
        questions
    })
    .catch(error => {
        console.error('Error saving questions: ', error);
    });

export const getQuestionsFromFirebase = uid => db
    .collection('users')
    .doc(uid)
    .get()    
    .then(doc => doc.exists && doc.data().questions != null
        ? doc.data().questions
        : [])
    .catch(error => {
        console.error('Error getting questions: ', error);
        return [];
    });
