import async from "async";
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, addDoc, query, where, getDoc, doc, updateDoc} from 'firebase/firestore/lite';
import {getAuth, signInWithEmailAndPassword, signInAnonymously} from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZdbEN8esO7iiglTELNFtW7vLW4Q2WUxw",
    authDomain: "labs-2e307.firebaseapp.com",
    projectId: "labs-2e307",
    storageBucket: "labs-2e307.appspot.com",
    messagingSenderId: "677107451711",
    appId: "1:677107451711:web:e65bb9b9d5b22f55fb758a"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const usersCollection = collection(database, 'user');
const resultsCollection = collection(database, 'tasksResults');
const queryStudents = query(usersCollection, where('role', '==', "STUDENT"))

const getData = data => data.forEach((doc) => ({id: doc.id, ...doc.data()}))
export const getAllStudents = async () => {
    const students = await getDocs(queryStudents);

    return students.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}

export const getStudentsByName = async (name) => {
    const queryStudents = query(usersCollection, where('name', '<=', name), where('role', '==', "STUDENT"))
    const students = await getDocs(queryStudents);

    return students.forEach((doc) => ({id: doc.id, ...doc.data()}));
}

export const getStudentById = async (id) => {
    const student = await getDoc(doc(database, 'user', id));

    return student.data();
}

export const addStudent = async ({name, group}) => {
    const docRef = await addDoc(usersCollection, {name, group, role: "STUDENT"});
    return docRef.id;
};

export const getAllResults = async (labName = "matrix") => {
    const queryResults = query(resultsCollection, where('labName', '==', labName))
    const results = await getDocs(queryResults);

    return results.docs.map((doc) => ({id: doc.id, ...doc.data()}));
};


const auth = getAuth();
export const signInTeacher = async (email, password) => {

    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            return userCredential.user;
            // ...
        })
        .catch((error) => {
            return error.message;
        });
}

export const getTeacher = async (data) => {
    const queryTeacher = query(usersCollection, where('email', '==', data.email))
    const teacher = await getDocs(queryTeacher);

    return teacher.forEach((doc) => ({id: doc.id, ...doc.data()}));

}

export const signInStudent = () => {
    return signInAnonymously(auth)
        .then(() => {
            return true
        })
        .catch((error) => {
            return error.message;
        });
}

export const changeRange = async (range, labName) => {
    const data = {
        ...range, labName
    }
    const docRef = doc(database, "range", labName);
    await updateDoc(docRef, data)
}

export const getBDRange = async (labName) => {
    const range = await getDoc(doc(database, 'range', labName));
    return range.data();
}

export const postResult = async (data, labName) => {
    const docRef = await addDoc(resultsCollection, {...data, labName});
    return docRef.id;
}
