// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where, updateDoc } from "firebase/firestore";
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
let lotterierCollection = collection(db,'Lotterier')
let deltagereCollection = collection(db, 'GameParticipants')
///medlemmer start///////////////////////////////////
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
///medlemmer slut////////////////////////////////////

///lotterier start///////////////////////////////////
async function getLotterier() { // henter lotterier fra db Lotterier i firebase
  let lotterierQueryDocs = await getDocs(lotterierCollection)
  let lotterier = lotterierQueryDocs.docs.map(doc => {
      let data = doc.data()
      data.docID = doc.id
      return data
  })
  return lotterier
}
app.get('/lotteri/:id', async (request, response)=>{ // viser indhold af hvert enkelte lotteri
  const lID = request.params.id
  const lotteri = await getLotteri(lID)
  response.render('lotteri', {lotteri: lotteri})
})
async function getLotteri(id) { // henter lotteri med bestemt id fra db Lotterier i firebase
  const docRef = doc(db, "Lotterier", id)
  const lotteriQueryDocument = await getDoc(docRef)
  let lotteri = lotteriQueryDocument.data()
  lotteri.docID = lotteriQueryDocument.id
  return lotteri
}

async function addLotteri(lotteri) {
  // lotteri = {date: dato}
  const docRef = await addDoc(collection(db, "Lotterier"), lotteri)//,
  console.log("Document witten with ID: ", docRef.id);
  return docRef.id
}
///lotterier slut///////////////////////////////////

///deltagere start//////////////////////////////////
async function getDeltagere() { // henter lotterier fra db Lotterier i firebase
  let lotterierQueryDocs = await getDocs(deltagereCollection)
  let deltagere = lotterierQueryDocs.docs.map(doc => {
      let data = doc.data()
      data.docID = doc.id
      return data
  })
  return deltagere
}

async function getDeltager(id) { //henter deltager med bestemt id
  const docRef = doc(db, "GameParticipants", id)
  const deltagerQueryDocument = await getDoc(docRef)
  let deltager = deltagerQueryDocument.data()
  deltager.docID = deltagerQueryDocument.id
  return deltager
}

async function addDeltager(lID,mID){
  let lot = await getLotteri(lID)
  let delt = await getMedlem(mID)
  const docRef = await addDoc(collection(db,"GameParticipants"),delt) // man skal ikke glemme "collection"!
  const docRefNy = doc(db, "GameParticipants", docRef.id)
  const updt = await updateDoc(docRefNy,{game:`/Lotterier/${lot.docID}`,member:`/Medlemmer/${delt.docID}`,rows:[{1:"",2:"",3:"",4:"",5:""}]})
  console.log(125);
  return await getDeltager(docRef.id)
}

async function addTR(lid, did){
  let lot = await getLotteri(lID)
  
  return lot
}

///deltagere slut///////////////////////////////////

//--------------VINDERTAL_START---------------------
async function addVinderTal(lid,a,b,c){
  const docRef = doc(db, "Lotterier", lid)
  const opdatere = await updateDoc(docRef,{Vindertal:[a,b,c]})
  console.log("opdateret");
}
//--------------VINDERTAL_SLUT----------------------


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

app.get('/addLotteri', (request, response)=>{
  response.render('addLotteri', {})
})

app.post('/addLotteri', async (request, response)=>{
  const date = request.body.date
  console.log(date);
  // ALT hvad der kommer fra brugeren er en string
  // I skal lave en fandens masse check
  // STOL ALDRIG PÅ BRUGERDATA
  let id = await addLotteri({date:date, deltagere:[{reference: "Medlemmer/8dzauo83ZTy5QwsT75CY"}], talraekker:[{1: 1,2:13,3:12,4:19,5:24}], Vindertal: ""})
  response.redirect('/lotterier')
})

app.get('/lotteri/:id/addDeltagere', async (request, response)=>{ //ok
  const medlemmer = await getMedlemmer()
  const lotteri = await getLotteri(request.params.id)
  response.render('addDeltagere', {medlemmer: medlemmer,lotteri:lotteri})
})

app.post('/addDeltagere', async (request, response)=>{
  //const date = request.body.date
  //console.log(date);
  // ALT hvad der kommer fra brugeren er en string
  // I skal lave en fandens masse check
  // STOL ALDRIG PÅ BRUGERDATA
  //let id = await addLotteri({date:date, Deltagere: null, Talrække: null, Vindertal: null})
  response.redirect('/deltagere')
})

app.get('/sortering',(req,res)=>{
  res.render('sortering')
})

app.get('/deltagere', async (req,res)=>{
  const deltagere = await getDeltagere()
  res.render('deltagere',{deltagere:deltagere})
})

app.get('/deltager/:id', async (request, response)=>{
  const mID = request.params.id
  const deltager = await addDeltager(mID)
  response.render('deltager', {deltager: deltager})
})


app.get('/lotterier', async (req,res)=>{
  //TODO getLotterier funktion
  //done_TODO opret lotterier.pug
  const alleLotterier = await getLotterier();
  res.render('lotterier',{lotterier:alleLotterier})
})
app.get('/lotteri/:id', async (request, response)=>{
  const lID = request.params.id
  const lotteri = await getLotteri(lID)
  response.render('lotteri', {lotteri: lotteri})
})

app.get('/:lid/:mid', async (request, response)=>{ //ok
  const lID = request.params.lid
  const mID = request.params.mid
  const deltager = await addDeltager(lID,mID)
  response.render('deltager', {deltager: deltager})
})

////talraekke
app.get('/lotteri/:lotteriId/addTR', async (request, response)=>{ //ok
  let inputId = request.params.lotteriId
  const docRef = doc(db, "Lotterier", `${inputId}`);
  const docSnap = await getDoc(docRef);
  let data = docSnap.data()
  console.log(data);
  response.render('opretTR', {data:data})
})

app.post('/lotteri/:lotId/:tal1/:tal2/:tal3',async(req,res)=>{
  let a = req.params.tal1
  let b = req.params.tal2
  let c = req.params.tal3
  let id = req.params.lotId
  let vt = await addVinderTal(id,a,b,c)
  res.redirect(`/lotteri/${id}`)
})

app.get('/',(req,res)=>{
  res.render('start')
})

app.delete('/deleteVT/:id',async(req,res)=>{//test
  console.log(11111);
  const docRef = doc(db,"Lotterier",req.params.id)
  let go =await deleteDoc(docRef,{
    Vindertal: []
  })

})

app.listen(8000, ()=>{
  console.log("lytter på port 8000");
})



///tilføje deltagere til lotteri
// TODO tilføje talrækker til lotteri

/*
const cityRef = db.collection('cities').doc('DC');

// Set the 'capital' field of the city
const res = await cityRef.update({capital: true});
*/






