// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmlyw9TMKl-ign_hYLhAsaPmdsXlzPs4w",
  authDomain: "projektlotteriet.firebaseapp.com",
  projectId: "projektlotteriet",
  storageBucket: "projektlotteriet.appspot.com",
  messagingSenderId: "556554582591",
  appId: "1:556554582591:web:80c6dd7ee6e2b80bf4d68a",
  measurementId: "G-J8D1FB7W3N"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase)

import express, { request, response } from 'express'
const app = express()
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('assets'))


// Firebase funktioner

let medlemmerCollection = collection(db, 'Medlemmer')

async function getMedlemmer() {
  let medlemmerQueryDocs = await getDocs(medlemmerCollection)
  let medlemmer = medlemmerQueryDocs.docs.map(doc => {
      let data = doc.data()
      data.docID = doc.id
      return data
  })
  return medlemmer
}

async function getMedlem(id) {
  const docRef = doc(db, "Medlemmer", id)
  const medlemQueryDocument = await getDoc(docRef)
  let medlem = medlemQueryDocument.data()
  medlem.docID = medlemQueryDocument.id
  return medlem
}

async function addMedlem(medlem) {
  // Medlem = {medlemsID: 1, Fornavn: 'Hans', Efternavn: 'Hansen'}
  const docRef = await addDoc(collection(db, "Medlemmer"), medlem)//, medlem.medlemsID
  console.log("Document witten with ID: ", docRef.id);
  return docRef.id
}

// Express Endpoint

app.get('/medlemmer', async (request, response)=>{
  const medlemmer = await getMedlemmer()
  response.render('medlemmer', {medlemmer: medlemmer})
})

app.get('/medlem/:id', async (request, response)=>{
  const mID = request.params.id
  const medlem = await getMedlem(mID)
  response.render('medlem', {medlem: medlem})
})

app.get('/addMedlem', (request, response)=>{
  response.render('addMedlem', {})
  })
  
  app.post('/addMedlem', async (request, response)=>{
    const medlemsID = request.body.medlemsID
    const Fornavn = request.body.Fornavn
    const Efternavn = request.body.Efternavn
    // ALT hvad der kommer fra brugeren er en string
    // I skal lave en fandens masse check
    // STOL ALDRIG PÅ BRUGERDATA
    let id = await addMedlem({medlemsID: medlemsID, Fornavn: Fornavn, Efternavn: Efternavn})
    response.redirect('/medlemmer')
  })

app.listen(8000, ()=>{
  console.log("lytter på port 8000");
})



