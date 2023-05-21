import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, where, getDoc, doc} from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";


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
const queryStudents = query(usersCollection, where('role', '==', "STUDENT"))

const getData = data => data.forEach((doc) => ({id: doc.id, ...doc.data()}))
export const getAllStudents = async () =>  {
    const students = await getDocs(queryStudents);

    return students.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}

export const getStudentsByName = async (name) =>  {
    const queryStudents = query(usersCollection, where('name', '<=', name), where('role', '==', "STUDENT"))
    const students = await getDocs(queryStudents);

    return students.forEach((doc) => ({id: doc.id, ...doc.data()}));
}

export const getStudentById = async (id) =>  {
    const student = await getDoc(doc(database, 'user', id));

    return student.data();
}

export const addStudent = async ({name, group}) => {
    const docRef = await addDoc(usersCollection, {name, group, role: "STUDENT"});
    return docRef.id;
};


export const getAllResults = async (result) => {
    const tasksCollection = collection(database, 'results');
    const docRef = await addDoc(tasksCollection, result);
    return docRef.id;
};


const auth = getAuth();
export const signInTeacher = async (email, password) => {

    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            return  userCredential.user;
            // ...
        })
        .catch((error) => {
            return error.message;
        });
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
